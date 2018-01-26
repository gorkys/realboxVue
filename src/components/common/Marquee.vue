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
    <p ref="target" v-if="direction==1" :style="{right: this.right + 'px',marginTop: -(this.height / 2) + 'px'}" class="box">{{content}}</p>
    <p ref="target" v-if="direction==0" :style="{right: this.right + 'px',marginTop: -(this.height / 2) + 'px'}" class="box">{{content}}</p>
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
        default: '1',
        type: String
      }
    },
    mounted: function () {
      this.marquee();
    },
    methods: {
      marquee() {
        this.$nextTick(() => {
            if (this.open) {
              let speed;
              if (this.speed == 0) speed = 80;
              if (this.speed == 1) speed = 40;
              if (this.speed == 2) speed = 5;
              this.int = setInterval(() => {
                let parentWidth = this.$refs.parent.clientWidth;           //父容器的宽度
                let parentLeft = this.$refs.parent.offsetLeft;             //父容器的边界
                let parent = parentWidth + parentLeft;

                let targetLeft = this.$refs.target.offsetLeft;
                let targetWidth = this.$refs.target.clientWidth;           //需要移动文字的宽度
                this.height = this.$refs.target.clientHeight;
                let target = targetWidth + targetLeft;
                this.target = targetWidth;
                if (this.direction == 1) {
                  if (parentLeft <= target) {
                    this.right++
                  } else {
                    this.right = -targetWidth
                  }
                } else {
                  if (target <= parent) {
                    this.left++
                  } else {
                    this.left = -targetWidth
                  }
                }
              }, speed);
            } else {
              clearInterval(this.int);
              this.direction == 1 ? this.right = -this.target : this.left = -this.target
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
