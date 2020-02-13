<template>
  <section class="mini-player">
      <div class="mini-left" @click="switchPlayer(playerType.normal)">
        <div class="cover">
          <img :class="{active: isPlaying}" :src="curSong.picUrl" alt="">
        </div>
        <div class="info" ref="infoView">
          <div class="info-wrapper" ref="infoWrapper">
            <p class="info-text" ref="infoText">{{curSong.name}} - {{curSong.artist}}</p>
            <p class="info-text" v-if="isDual">{{curSong.name}} - {{curSong.artist}}</p>
          </div>
        </div>
      </div>
      <div class="mini-right">
        <div class="play" @click="switchPlaying">
          <svg-icon :icon-name="isPlaying ? 'pause_s' : 'play_s'"/>
        </div>
        <div class="list" @click="switchPlayer(playerType.list)">
          <svg-icon icon-name="play_list"/>
        </div>
      </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import playerType from '../../store/playerType'

export default {
  name: 'MiniPlayer',
  data () {
    return {
      isDual: false, // 滚动处理
      playerType: playerType
    }
  },
  computed: {
    ...mapState(['isPlaying']),
    ...mapGetters(['curSong']),
    viewWidth () {
      return this.$refs.infoView.offsetWidth
    },
    textWidth () {
      return this.$refs.infoText.offsetWidth
    }
  },
  mounted () {
    this.infoScroll()
  },
  methods: {
    ...mapActions(['setPlayerType', 'setPlaying']),
    // 文字滚动
    infoScroll () {
      if (this.textWidth > this.viewWidth) {
        this.isDual = true
        let scrollX = this.textWidth + this.viewWidth
        this.$refs.infoText.style.paddingRight = this.viewWidth + 'px'
        this.$refs.infoWrapper.style.left = -scrollX + 'px'
        // 匀速效果
        this.$refs.infoWrapper.style.transitionDuration = scrollX / 80 + 's'
      }
    },
    switchPlaying () {
      this.setPlaying(!this.isPlaying)
    },
    switchPlayer (type) {
      this.setPlayerType(type)
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
        animation: spin 15s linear 700ms infinite;
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
        transition: left 0s linear 600ms;
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
