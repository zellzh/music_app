<template>
  <div id="app">
    <Header/>
    <TabBar/>
    <router-view/>
    <player/>
  </div>
</template>
<script>
import Header from './components/home/Header'
import TabBar from './components/home/TabBar'
import Player from './views/Player'

export default {
  name: 'App',

  components: {
    Header,
    TabBar,
    Player
  }

}
</script>

<style lang="scss">
</style>
