<template>
  <div class="vdr" :class="{ draggable: draggable, resizable: resizable, active: active }" @mousedown="elmDown"
       @dblclick="fillParent" :style="style">
    <div
      class="handle"
      v-if="resizable"
      v-for="handle in handles"
      :class="'handle-' + handle"
      :style="{ display: active ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown(handle, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    replace: true,
    name: 'vue-draggable-resizable',
    props: {
      draggable: {
        type: Boolean, default: true
      },
      resizable: {
        type: Boolean, default: true
      },
      w: {
        type: Number,
        default: 200,
        validator: function (val) {
          return val > 0
        }
      },
      h: {
        type: Number,
        default: 200,
        validator: function (val) {
          return val > 0
        }
      },
      minw: {
        type: Number,
        default: 50,
        validator: function (val) {
          return val > 0
        }
      },
      minh: {
        type: Number,
        default: 50,
        validator: function (val) {
          return val > 0
        }
      },
      x: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val >= 0
        }
      },
      y: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val >= 0
        }
      },
      handles: {
        type: Array,
        default: function () {
          return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
        }
      },
      axis: {
        type: String,
        default: 'both',
        validator: function (val) {
          return ['x', 'y', 'both'].indexOf(val) !== -1
        }
      },
      grid: {
        type: Array,
        default: function () {
          return [1, 1]
        }
      },
      parent: {
        type: Boolean, default: false
      },
      maximize: {
        type: Boolean, default: false
      },
      conflictCheck: {
        type: Boolean, default: true
      },
      zIndex:{
        type:Number, default:100
      }
    },
    created: function () {
      this.parentX = 0
      this.parentW = 9999
      this.parentY = 0
      this.parentH = 9999

      this.mouseX = 0
      this.mouseY = 0

      this.lastMouseX = 0
      this.lastMouseY = 0

      this.mouseOffX = 0
      this.mouseOffY = 0

      this.elmX = 0
      this.elmY = 0

      this.elmW = 0
      this.elmH = 0
    },
    mounted: function () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)
      document.documentElement.addEventListener('mousedown', this.deselect, true)
      document.documentElement.addEventListener('mouseup', this.handleUp, true)

      if (this.minw > this.w) this.width = this.minw
      if (this.minh > this.h) this.height = this.minh

      if (this.parent) {
        const parentW = parseInt(this.$el.parentNode.clientWidth, 10)
        const parentH = parseInt(this.$el.parentNode.clientHeight, 10)

        this.parentW = parentW
        this.parentH = parentH

        if (this.w > this.parentW) this.width = parentW

        if (this.h > this.parentH) this.height = parentH

        if ((this.x + this.w) > this.parentW) this.width = parentW - this.x

        if ((this.y + this.h) > this.parentH) this.height = parentH - this.y
      }

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mousedown', this.deselect, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },
    data: function () {
      return {
        top: this.y,
        left: this.x,
        width: this.w,
        height: this.h,
        resizing: false,
        dragging: false,
        active: false,
        opacity: 1,
        handle: null,
        restoreY: 0,
        restoreX: 0,
        restoreW: 0,
        restoreH: 0
      }
    },
    methods: {
      elmDown: function (e) {   //鼠标按下时激活当前选择的块
        const target = e.target || e.srcElement

        if (this.$el.contains(target)) {

          if (!this.active) {
            this.zIndex += 1
            this.active = true

            this.$emit('activated', this.left, this.top, this.width, this.height)
          }
          //激活区域块时获取当前区域块的X,Y,W,H
          this.elmX = parseInt(this.$el.style.left)
          this.elmY = parseInt(this.$el.style.top)
          this.elmW = this.$el.offsetWidth || this.$el.clientWidth
          this.elmH = this.$el.offsetHeight || this.$el.clientHeight

          if (this.draggable) {

            this.restoreY = this.top           //将移动前的位置存储
            this.restoreX = this.left
            this.restoreW = this.width
            this.restoreH = this.height

            this.opacity = 0.6
            this.dragging = true
          }
        }
      },
      deselect: function (e) {
        const target = e.target || e.srcElement
        const regex = new RegExp('handle-([trmbl]{2})', '')

        if (!this.$el.contains(target) && !regex.test(target.className)) {
          if (this.active) {

            this.active = false
            this.$emit('deactivated')
          }
        }
      },
      handleDown: function (handle, e) {
        this.handle = handle

        if (e.stopPropagation) e.stopPropagation()
        if (e.preventDefault) e.preventDefault()
        console.log('操作点被点击', this.resizing)

        //当区域块处于被激活状态时，手柄被点击时获取当前区域块的X,Y,W,H（如果不加进来，会出现区域块会跳动到回退前的位置）
        this.elmX = parseInt(this.$el.style.left)
        this.elmY = parseInt(this.$el.style.top)
        this.elmW = this.$el.offsetWidth || this.$el.clientWidth
        this.elmH = this.$el.offsetHeight || this.$el.clientHeight

        this.restoreY = this.top           //将移动前的位置存储
        this.restoreX = this.left
        this.restoreW = this.width
        this.restoreH = this.height

        console.log('top.a:' + this.top + "height.a:" + this.height)

        this.resizing = true
        console.log('记录了移动前的位置，改变大小', this.resizing)
      },
      fillParent: function (e) {
        if (!this.parent || !this.resizable || !this.maximize) return

        let done = false

        const animate = () => {
          if (!done) {
            window.requestAnimationFrame(animate)
          }

          if (this.axis === 'x') {
            if (
              this.width === this.parentW && this.left === this.parentX
            ) done = true
          } else if (this.axis === 'y') {
            if (
              this.height === this.parentH && this.top === this.parentY
            ) done = true
          } else if (this.axis === 'both') {
            if (
              this.width === this.parentW &&
              this.height === this.parentH &&
              this.top === this.parentY &&
              this.left === this.parentX
            ) done = true
          }

          if (this.axis === 'x' || this.axis === 'both') {
            if (this.width < this.parentW) {
              this.width++
              this.elmW++
            }

            if (this.left > this.parentX) {
              this.left--
              this.elmX--
            }
          }

          if (this.axis === 'y' || this.axis === 'both') {
            if (this.height < this.parentH) {
              this.height++
              this.elmH++
            }

            if (this.top > this.parentY) {
              this.top--
              this.elmY--
            }
          }

          this.$emit('resizing', this.left, this.top, this.width, this.height)
        }

        window.requestAnimationFrame(animate)
      },
      handleMove: function (e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft    //获取鼠标的X,Y坐标
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

        let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
        let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

        this.mouseOffX = this.mouseOffY = 0

        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY

        let dX = diffX
        let dY = diffY

        if (this.resizing) {
          if (this.handle.indexOf('t') >= 0) {
            if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
            else if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))

            this.elmY += diffY
            this.elmH -= diffY

          }

          if (this.handle.indexOf('b') >= 0) {
            if (this.elmH + dY < this.minh) this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
            else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
            this.elmH += diffY
          }

          if (this.handle.indexOf('l') >= 0) {
            if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
            else if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
            this.elmX += diffX
            this.elmW -= diffX

          }

          if (this.handle.indexOf('r') >= 0) {
            if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
            else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
            this.elmW += diffX
          }

          console.log('elm.Y:' + this.elmY + "elm.H:" + this.elmH)

          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

          this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
          this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])

          console.log('top.b:' + this.top + "height.b:" + this.height)

          this.$emit('resizing', this.left, this.top, this.width, this.height)
        } else if (this.dragging) {
          //如果当前移动块的left+鼠标移动的距离小于父容器的left,就用鼠标移动的距离-
          if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))

          if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))

          this.elmX += diffX
          this.elmY += diffY

          if (this.axis === 'x' || this.axis === 'both') {
            this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
          }
          if (this.axis === 'y' || this.axis === 'both') {
            this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
          }

          this.$emit('dragging', this.left, this.top)
        }
      },
      handleUp: function (e) {
        this.$emit('active')                //松开鼠标回调事件
        this.handle = null
        if (this.resizing) {
          //停止改变大小后进行冲突检测
          this.resizing = false
          if (this.conflictCheck) {
            let p = this.$el.parentNode.childNodes;
            //判断是否存在兄弟元素
            if (p.length > 1) {
              for (let i = 0; i <= p.length; i++) {
                if (p[i] !== this.$el && p[i].id !== 'Uncheck') {     //过滤掉自身，剩下的就是兄弟元素
                  let tw = p[i].offsetWidth;
                  let th = p[i].offsetHeight;
                  let tl = p[i].offsetLeft;
                  let tt = p[i].offsetTop;

                  if (this.top >= tt && this.left >= tl && tt + th >= this.top && tl + tw >= this.left ||
                    this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl) { /*左上角与右下角重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH


                  } else if (this.left <= tl && this.top >= tt && this.left + this.width >= tl && this.top <= tt + th ||
                    this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw) { /*右上角与左下角重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl ||
                    this.top >= tt && this.left >= tl && this.top <= tt + th && this.left <= tl + tw) { /*下边与上边重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                    this.top >= tt && this.left <= tl && this.top <= tt + th && this.left >= tl + tw) { /*上边与下边重叠（宽度不一样）*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH
                  } else if (this.left >= tl && this.top >= tt && this.left <= tl + tw && this.top <= tt + th ||
                    this.top >= tt && this.left <= tl && this.left + this.width >= tl && this.top <= tt + th) { /*左边与右边重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                    this.top >= tt && this.left <= tl && this.top <= tt + th && this.left + this.width >= tl) { /*左边与右边重叠（高度不一样）*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  }
                }
              }
            }
          }
          this.$emit('resizestop', this.left, this.top, this.width, this.height)
        }
        if (this.dragging) {
          this.dragging = false
          if (this.conflictCheck) {
            let p = this.$el.parentNode.childNodes;
            if (p.length > 1) {
              for (let i = 0; i <= p.length; i++) {
                if (p[i] !== this.$el && p[i].id !== 'Uncheck') {
                  let tw = p[i].offsetWidth;
                  let th = p[i].offsetHeight;
                  let tl = p[i].offsetLeft;
                  let tt = p[i].offsetTop;

                  if (this.top >= tt && this.left >= tl && tt + th >= this.top && tl + tw >= this.left ||
                    this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl) { /*左上角与右下角重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.left <= tl && this.top >= tt && this.left + this.width >= tl && this.top <= tt + th ||
                    this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw) { /*右上角与左下角重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl ||
                    this.top >= tt && this.left >= tl && this.top <= tt + th && this.left <= tl + tw) { /*下边与上边重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                    this.top >= tt && this.left <= tl && this.top <= tt + th && this.left >= tl + tw) { /*上边与下边重叠（宽度不一样）*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.left >= tl && this.top >= tt && this.left <= tl + tw && this.top <= tt + th ||
                    this.top >= tt && this.left <= tl && this.left + this.width >= tl && this.top <= tt + th) { /*左边与右边重叠*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                    this.top >= tt && this.left <= tl && this.top <= tt + th && this.left + this.width >= tl) { /*左边与右边重叠（高度不一样）*/

                    this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                    this.left = this.restoreX
                    this.width = this.restoreW
                    this.height = this.restoreH

                  }
                }
              }
            }
          }
          this.$emit('dragstop', this.left, this.top)
        }
        this.opacity = 1
        //将X,Y,W,H赋给当前区域块
        this.elmX = this.left
        this.elmY = this.top
        this.elmW = this.width
        this.elmH = this.height
      }
    },
    computed: {
      style: function () {
        return {
          top: this.top + 'px',
          left: this.left + 'px',
          width: this.width + 'px',
          height: this.height + 'px',
          zIndex: this.zIndex,
          opacity: this.opacity
        }
      }
    },
    watch: {
      x: function (val) {
        if ((this.elmX + val >= this.parentX) && (val + this.elmW <= this.parentW)) {
          this.left = (Math.round(val / this.grid[0]) * this.grid[0])
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      },
      y: function (val) {
        if ((this.elmY + val >= this.parentY) && (val + this.elmH <= this.parentH)) {
          this.top = (Math.round(val / this.grid[1]) * this.grid[1])
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      },
      w: function (val) {
        if (val > 0 && this.elmX + val <= this.parentW) {
          this.width = (Math.round(val / this.grid[0]) * this.grid[0])
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      },
      h: function (val) {
        if (val > 0 && this.elmY + val <= this.parentH) {
          this.height = (Math.round(val / this.grid[1]) * this.grid[1])
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      }
    }
  }
</script>

<style scoped>
  .vdr {
    position: absolute;
    box-sizing: border-box;
  }

  .draggable:hover {
    cursor: move;
  }

  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
    font-size: 1px;
    background: #EEE;
    border: 1px solid #333;
  }

  .handle-tl {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }

  .handle-tm {
    top: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }

  .handle-tr {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }

  .handle-ml {
    top: 50%;
    margin-top: -5px;
    left: -10px;
    cursor: w-resize;
  }

  .handle-mr {
    top: 50%;
    margin-top: -5px;
    right: -10px;
    cursor: e-resize;
  }

  .handle-bl {
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }

  .handle-bm {
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }

  .handle-br {
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }
</style>
