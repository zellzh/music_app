<template>
  <section class="player">
    <NormalPlayer/>
    <MiniPlayer/>
    <ListPlayer/>
  </section>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'

export default {
  name: 'player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  }
}
</script>

<style scoped lang="scss">

</style>
