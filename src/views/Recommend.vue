<!--
注意点:
  + 必须在得到banners数据后, 再去渲染组件, 才能正常触发滚动
    - 因为组件中的插件注册一般在 mounted 阶段, 而获取数据是异步的
    - 没获取数据就创建插件, 会有bug
-->
<template>
  <section class="recommend">
    <ScrollView>
      <div class="scroll-content" ref="content">
        <Banner :banners="banners" v-if="banners.length > 0"/>
        <Personalized :personalized="personalized" :title="'推荐歌单'" :type="'personalized'"/>
        <Personalized :personalized="album" :title="'最新专辑'" :type="'album'"/>
        <NewSong :songs="songs"/>
      </div>
    </ScrollView>
    <transition>
      <router-view/>
    </transition>
  </section>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api'
import ScrollView from '../components/common/ScrollView(BScroll)'
// import ScrollView from '../components/common/ScrollView(IScroll)'
// import Banner from '../components/common/Banner(BScroll)'
import Banner from '../components/common/Banner(Swiper)'
import Personalized from '../components/home/Personalized'
import NewSong from '../components/home/NewSong'

export default {
  name: 'Recommend',
  components: {
    ScrollView,
    Banner,
    Personalized,
    NewSong
  },
  data () {
    return {
      banners: [],
      personalized: [],
      album: [],
      songs: []
    }
  },
  created () {
    getBanner().then(data => { if (data) this.banners = data.banners })
    getPersonalized().then(data => { if (data) this.personalized = data.result })
    getNewAlbum().then(data => { if (data) this.album = data.albums.slice(0, 6) })
    getNewSong().then(data => { if (data) this.songs = data.result })
  }
}
</script>

<style scoped lang="scss">
  .recommend{
    @include bgc-type($bgc-sub);
    position: fixed;
    top: 180px;
    bottom: 0;
    left: 0;
    right: 0;
    .scroll-content{
      padding-bottom: 120px;
    }
    .v-enter, .v-leave-to{
      transform: translateX(100%);
    }
    .v-enter-active, .v-leave-active{
      transition: transform 800ms ease;
    }
  }
</style>
