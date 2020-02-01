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
  </section>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapState } from 'vuex'
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
    ...mapState(['playerType'])
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 600, display: '' }, () => { done() })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownBigOut', 600, () => { done() })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
