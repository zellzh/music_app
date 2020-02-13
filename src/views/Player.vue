<template>
  <section class="player">
    <!--
    <NormalPlayer v-show="showNormalPlayer"/>
    <MiniPlayer v-if="showMiniPlayer"/>
    <ListPlayer v-show="showListPlayer"/>
    -->
    <transition
      :css="false"
      @enter="enter"
      @leave="leave">
      <component :is="playerType"/>
    </transition>

    <audio :src="curSong.url"/>
  </section>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapState, mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.min'

export default {
  name: 'player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapState(['playerType', 'isPlaying']),
    ...mapGetters(['curSong'])
  },
  methods: {
    ...mapActions(['setCurLyric', 'setPlaying', 'setShowDisc']),
    enter (el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 700, display: '' }, () => { done() })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownBigOut', 700, () => { done() })
    }
  },
  watch: {
    curSong (newVal) {
      if (newVal.id) {
        this.isPlaying || this.setPlaying(true)
        this.setCurLyric(newVal.id)
        // disc 过渡
        this.setShowDisc(false)
        let img = new Image()
        img.src = newVal.picUrl
        img.onload = () => {
          this.setShowDisc(true)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
