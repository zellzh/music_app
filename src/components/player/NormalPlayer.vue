<template>
  <section class="normal-player">
    <PlayerHeader/>
    <PlayerMiddle/>
    <PlayerFooter/>
    <div class="bg">
      <img src="http://p1.music.126.net/NhEWxfUZrrd4oMMqbKKIOA==/109951164466565583.jpg" alt="">
      <div class="bg-mask"/>
    </div>
  </section>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerFooter from './PlayerFooter'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerFooter
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
      filter: blur(20px);
      transform: scale(1.2); // 去除白边
    }
    .bg-mask{
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
      position: fixed;
      top: 0;
      left: 0;
    }
  }
}
</style>
