<template>
  <section class="player-footer">
    <section class="player-progress">
      <div class="progress">
        <div class="progress-bar">
          <div class="progress-line">
            <span class="progress-dot"/>
          </div>
        </div>
      </div>
      <div class="time">
        <span class="time-left">00:00</span>
        <span class="time-right">00:00</span>
      </div>
    </section>
    <section class="player-handle">
      <div class="mode" @click.stop="switchMode">
        <svg-icon :icon-name="modeType"/>
      </div>
      <div class="prev">
        <svg-icon icon-name="prev"/>
      </div>
      <div class="play" @click.stop="switchPlay">
        <svg-icon :icon-name="isPlay" ref="icon"/>
      </div>
      <div class="next">
        <svg-icon icon-name="next"/>
      </div>
      <div class="list">
        <svg-icon icon-name="play_list"/>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modeType from '../../store/modeType'

export default {
  name: 'PlayerFooter',
  data () {
    return {
      isPlay: 'play',
      modeType: ''
    }
  },
  computed: {
    ...mapState(['isPlaying', 'playMode'])
  },
  methods: {
    ...mapActions(['setPlaying', 'setPlayMode']),
    switchPlay () {
      this.setPlaying(!this.isPlaying)
      this.isPlay = this.isPlaying ? 'pause' : 'play'
    },
    switchMode () {
      switch (this.playMode) {
        case modeType.loop:
          this.setPlayMode(modeType.single)
          this.modeType = 'single'
          break
        case modeType.single:
          this.setPlayMode(modeType.shuffle)
          this.modeType = 'shuffle'
          break
        case modeType.shuffle:
          this.setPlayMode(modeType.loop)
          this.modeType = 'loop'
          break
      }
    }
  },
  mounted () {
    this.isPlay = this.isPlaying ? 'pause' : 'play'
    switch (this.playMode) {
      case modeType.loop:
        this.modeType = 'loop'
        break
      case modeType.single:
        this.modeType = 'single'
        break
      case modeType.shuffle:
        this.modeType = 'shuffle'
        break
    }
  }
}
</script>

<style scoped lang="scss">
.player-footer{
  width: 100%;
  padding: 0 25px;
  position: fixed;
  left: 0;
  bottom: 0;
  .player-progress{
    width: 100%;
    .progress{
      width: 100%;
      height: 26px;
      padding: 10px 0;
      .progress-bar{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: #777;
        .progress-line{

          // 控制圆点不超出进度条
          min-width: 10px;
          max-width: calc(100% - 10px);

          width: 50%;
          height: 100%;
          border-radius: 10px;
          background: #ddd;
          position: relative;
          .progress-dot{
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: calc(100% - 10px); // 圆点跟随进度条移动, 并控制圆点不超出进度条
            border-radius: 50%;
            background: #fff;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .time{
      display: flex;
      justify-content: space-between;
      color: #999;
    }
  }
  .player-handle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 130px;
    font-size: 65px;
    color: #ddd;
    .play{
      font-size: 100px;
    }
    .play, .prev, .next{
      @include ftc-type($ftc-active)
    }
  }
}
</style>
