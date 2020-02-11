<template>
  <section class="normal-player">
    <PlayerHeader/>
    <PlayerMiddle/>
    <PlayerFooter/>
    <div class="bg">
      <img :src="curSong.picUrl" alt="">
      <div class="bg-mask"/>
    </div>
  </section>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerFooter from './PlayerFooter'
import { mapGetters } from 'vuex'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerFooter
  },
  computed: {
    ...mapGetters(['curSong'])
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
  //@include bgc-type($bgc-sub);
  .bg{
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    @include z-index(bg);
    img{
      margin: 0 -100%;
      height: 100%;
      filter: blur(60px);
      transform: scale(1.2); // 去除白边
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
