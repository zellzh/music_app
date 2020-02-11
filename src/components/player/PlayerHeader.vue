<template>
    <header class="player-header">
      <div class="header-left" @click.stop="switchPlayer">
        <svg-icon iconName="down"/>
      </div>
      <div class="header-info">
        <h3 class="header-title">{{curSong.name}}</h3>
        <p class="header-artist">{{curSong.artist}}</p>
      </div>
      <div class="header-right"></div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['curSong'])
  },
  methods: {
    ...mapActions(['setPlayerType']),
    switchPlayer () {
      this.setPlayerType('MiniPlayer')
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-header{
    width: 100%;
    height: 100px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left, .header-right{
      width: 55px;
      font-size: 55px;
      color: #f3f3f3;
    }
    .header-info{
      flex: 1;
      padding: 0 30px;
      text-align: center;
      overflow: hidden;
      .header-title{
        letter-spacing: 1px;
        color: #fff;
        @include clamp-one();
        @include font-size($font-xl);
      }
      .header-artist{
        padding-top: 10px;
        color: #ddd;
        @include clamp-one();
        @include font-size($font-l);
      }
    }
  }
</style>
