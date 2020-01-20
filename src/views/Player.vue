<template>
  <section class="player">
    <NormalPlayer v-if="showNormalPlayer"/>
    <MiniPlayer v-if="showMiniPlayer"/>
    <ListPlayer v-if="showListPlayer"/>
  </section>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapState } from 'vuex'

export default {
  name: 'player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapState(['showNormalPlayer', 'showMiniPlayer', 'showListPlayer'])
  }
}
</script>

<style scoped lang="scss">

</style>
