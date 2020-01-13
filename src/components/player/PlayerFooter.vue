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
      <div class="mode">
        <svg-icon icon-name="loop_list"/>
      </div>
      <div class="prev">
        <svg-icon icon-name="prev"/>
      </div>
      <div class="play" @click="switchPlay">
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
export default {
  name: 'PlayerFooter',
  data () {
    return {
      isPlay: 'play'
    }
  },
  methods: {
    switchPlay () {
      this.isPlay = this.isPlay === 'play' ? 'pause' : 'play'
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
        background: #737373;
        .progress-line{
          min-width: 10px; // 控制圆点不超出进度条
          max-width: calc(100% - 10px);
          width: 50%;
          height: 100%;
          border-radius: 10px;
          background: #fff;
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
      color: #737373;
    }
  }
  .player-handle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 130px;
    font-size: 60px;
    color: #f3f3f3;
    .play{
      font-size: 100px;
    }
    .play, .prev, .next{
      @include ftc-type($ftc-active)
    }
  }
}
</style>
