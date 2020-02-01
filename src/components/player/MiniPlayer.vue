<template>
  <section class="mini-player" ref="miniPlayer">
      <div class="mini-left" @click="showNormalPlayer">
        <div class="cover">
          <img ref="disc" src="http://p1.music.126.net/iNZkyfe5KQ3vgb7nKY_d6w==/109951164428470125.jpg" alt="">
        </div>
        <div class="info" ref="infoView">
          <div class="info-wrapper" ref="infoWrapper">
            <p class="info-text" ref="infoText">赛赛-懂得积分段看官等奖怪防晒粉的</p>
            <p class="info-text" v-if="isDual">赛赛-懂得</p>
          </div>
        </div>
      </div>
      <div class="mini-right">
        <div class="play" @click="switchPlay">
          <svg-icon :icon-name="isPlay" ref="icon"/>
        </div>
        <div class="list" @click="showListPlayer">
          <svg-icon icon-name="play_list"/>
        </div>
      </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MiniPlayer',
  data () {
    return {
      isDual: false, // 滚动处理
      isPlay: ''
    }
  },
  computed: {
    ...mapState(['isPlaying']),
    viewWidth () {
      return this.$refs.infoView.offsetWidth
    },
    textWidth () {
      return this.$refs.infoText.offsetWidth
    }
  },
  mounted () {
    this.infoScroll()

    this.isPlay = this.isPlaying ? 'pause_s' : 'play_s'
    let discClass = this.$refs.disc.classList
    this.isPlaying ? discClass.add('active') : discClass.remove('active')
  },
  methods: {
    ...mapActions(['setPlayerType', 'setPlaying']),
    // 超出宽度滚动
    infoScroll () {
      if (this.textWidth > this.viewWidth) {
        this.isDual = true
        this.$refs.infoText.style.paddingRight = this.viewWidth + 'px'
        this.$refs.infoWrapper.style.left = -this.textWidth - this.viewWidth + 'px'
      }
    },

    switchPlay () {
      this.setPlaying(!this.isPlaying)
      this.isPlay = this.isPlaying ? 'pause_s' : 'play_s'
    },
    showNormalPlayer () {
      this.setPlayerType('NormalPlayer')
    },
    showListPlayer () {
      this.setPlayerType('ListPlayer')
    }
  },
  watch: {
    isPlaying (newVal) {
      let discClass = this.$refs.disc.classList
      newVal ? discClass.add('active') : discClass.remove('active')
    }
  }
}
</script>

<style scoped lang="scss">
.mini-player{
  width: 100%;
  height: 120px;
  box-shadow: 10px 10px 16px;
  padding: 0 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  @include bgc-type($bgc-sub);
  .mini-left{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cover{
      width: 140px;
      height: 120px;
      padding-right: 20px;
      margin-bottom: 20px;
      position: relative;
      @include z-index(front);
      &>img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: spin 15s linear 600ms infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      // 边界模糊效果
      &:after{
        content: '';
        width: 30px;
        height: 100%;
        filter: blur(6px);
        position: absolute;
        right: -10px;
        top: 20px;
        @include bgc-type($bgc-sub);
      }
    }
    .info{
      flex: 1;
      height: 70px;
      line-height: 70px;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      .info-wrapper{
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transition: left 15s linear 600ms;
        .info-text{
          display: inline-block;
          padding-left: 10px; // 边界模糊优化
          @include ftc-type($ftc-main);
          @include font-size($font-xl);
        }
      }
    }
  }
  .mini-right{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .play, .list{
      width: 70px;
      line-height: 70px;
      margin-left: 20px;
      text-align: center;
      font-size: 65px;
      @include ftc-type($ftc-active)
    }
    .play{
      font-size: 70px;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
