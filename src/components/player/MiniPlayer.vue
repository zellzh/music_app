<template>
  <section class="mini-player">
    <div class="cover">
      <img src="http://p1.music.126.net/iNZkyfe5KQ3vgb7nKY_d6w==/109951164428470125.jpg" alt="">
    </div>
    <div class="info" ref="infoView">
      <div class="info-wrapper" ref="infoWrapper">
        <p class="info-text" ref="infoText">赛赛-懂得积分段看官等奖怪防晒粉的</p>
        <p class="info-text" v-if="isScroll">赛赛-懂得</p>
      </div>
    </div>
    <div class="play" @click="switchPlay">
      <svg-icon :icon-name="isPlay" ref="icon"/>
    </div>
    <div class="list">
      <svg-icon icon-name="play_list"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MiniPlayer',
  data () {
    return {
      isScroll: false,
      isPlay: 'play'
    }
  },
  computed: {
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
    infoScroll () {
      if (this.textWidth > this.viewWidth) {
        this.isScroll = true
        this.$refs.infoText.style.paddingRight = this.viewWidth + 'px'
        this.$refs.infoWrapper.style.left = -this.textWidth - this.viewWidth + 'px'
      }
    },
    switchPlay () {
      this.isPlay = this.isPlay === 'play' ? 'pause' : 'play'
    }
  }
}
</script>

<style scoped lang="scss">
.mini-player{
  width: 100%;
  height: 120px;
  padding: 0 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include bgc-type($bgc-main);
  .cover{
    width: 140px;
    height: 120px;
    padding-right: 20px;
    margin-bottom: 20px;
    position: relative;
    @include z-index(front);
    &>img{
      width: 100%;
      border-radius: 50%;
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
      @include bgc-type($bgc-main);
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
      transition: left 10s linear 1.5s;
      .info-text{
        display: inline-block;
        padding-left: 10px; // 边界模糊优化
        color: #f3f3f3;
        @include font-size($font-xl);
      }
    }
  }
  .play, .list{
    width: 70px;
    line-height: 70px;
    margin-left: 20px;
    text-align: center;
    font-size: 70px;
    color: #f3f3f3
  }
  .list{
    font-size: 56px;
  }
}
</style>
