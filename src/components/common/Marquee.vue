<style scoped>
  #Marquee {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .box {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    z-index: 99;
    top: 50%;
  }

  .BG {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
  }
</style>

<template>
  <div id="Marquee" ref="parent">
    <div class="BG" :style="{backgroundColor:BGColor,opacity:BGOpacity}"></div>
    <p ref="target" v-if="direction==1" :style="{right: this.right + 'px',marginTop: -(this.height / 2) + 'px'}"
       class="box">{{content}}</p>
    <p ref="target" v-if="direction==0" :style="{left: this.left + 'px',marginTop: -(this.height / 2) + 'px'}"
       class="box">{{content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'VueMarquee',
    data() {
      return {
        run: false,
        right: 0,
        height: 0,
        left: 0,
        int: '',
        target: ''
      }
    },
    props: {
      open: {
        default: false,
        type: Boolean
      },
      content: {
        default: "暂无内容",
        type: String
      },
      speed: {
        default: 1,
        type: Number
      },
      direction: {
        default: 1,
        type: Number
      },
      fontOpacity: {
        default: 1,
        type: Number
      },
      BGColor: {
        default: '#000000',
        type: String
      },
      BGOpacity: {
        default: 1,
        type: Number
      },
      Duration: {
        default: 1,
        type: Number
      }
    },
    mounted: function () {
      this.marquee();
    },
    methods: {
      marquee() {
        let _this = this;
        _this.$nextTick(() => {
            if (_this.open) {
              let speed;
              if (_this.speed === 0) speed = 80;
              if (_this.speed === 1) speed = 40;
              if (_this.speed === 2) speed = 5;
              let duration = _this.Duration * 1000 / speed;               //由时间计算出需要滚动的次数
              let i=0;
              _this.int = setInterval(() => {
                i++;                                                      //记录滚动次数
                if(duration===i) {                                        //当滚动次数与所需滚动次数相等时停止滚动
                  clearInterval(_this.int);
                  return false
                }
                let parentWidth = _this.$refs.parent.clientWidth;           //父容器的宽度
                let parentLeft = _this.$refs.parent.offsetLeft;             //父容器的边界
                let parent = parentWidth + parentLeft;

                let targetLeft = _this.$refs.target.offsetLeft;
                let targetWidth = _this.$refs.target.clientWidth;           //需要移动文字的宽度
                _this.height = _this.$refs.target.clientHeight;
                let target = targetWidth + targetLeft;
                _this.target = targetWidth;
                if (_this.direction === 1) {
                  if (parentLeft <= target) {
                    _this.right++
                  } else {
                    _this.right = -targetWidth
                  }
                } else {
                  if (targetLeft <= parent) {
                    _this.left++
                  } else {
                    _this.left = -targetWidth
                  }
                }
              }, speed);
            } else {
              clearInterval(_this.int);
              _this.direction === 1 ? _this.right = -_this.target : _this.left = -_this.target
            }
          }
        )
      }
    },
    watch: {
      open: function () {
        this.marquee();
      }
    }
  }
</script>
