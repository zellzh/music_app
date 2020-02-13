<template>
  <section class="normal-player">
    <PlayerHeader/>
    <PlayerMiddle/>
    <PlayerFooter/>
    <div class="bg">
      <div class="bg-prev" ref="prevBg"/>
      <transition>
        <img v-if="showDisc" :src="curSong.picUrl" alt="">
      </transition>
      <div class="bg-mask"/>
    </div>
  </section>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerFooter from './PlayerFooter'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerFooter
  },
  computed: {
    ...mapState(['showDisc']),
    ...mapGetters(['curSong'])
  },
  watch: {
    curSong (newVal, oldVal) {
      this.$refs.prevBg.style.backgroundImage = `url("${oldVal.picUrl}")`
    }
  }
}
</script>

<style scoped lang="scss">
.normal-player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    @include z-index(bg);

    // disc 过渡
    .v-enter, .v-leave-to{
      opacity: 0;
    }
    .v-enter-active, .v-leave-active{
      transition: opacity 1s linear;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(60px);
      transform: scale(1.2); // 去除白边
    }
    .bg-prev{
      width: 100%;
      height: 100%;
      background: no-repeat center center;
      background-size: cover;
      filter: blur(60px);
      transform: scale(1.2); // 去除白边
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .bg-mask{
      width: 100%;
      height: 100%;
      background: rgba(50, 50, 0, .4);
      position: fixed;
      top: 0;
      left: 0;
    }
  }
}
</style>
