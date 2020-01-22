<template>
    <header class="player-header">
      <div class="header-left" @click="switchPlayer">
        <svg-icon iconName="down"/>
      </div>
      <div class="header-info">
        <h3 class="header-title">光年之外</h3>
        <p class="header-artist">邓紫棋</p>
      </div>
      <div class="header-right"></div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  props: {

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
      width: 50px;
      font-size: 50px;
      color: #f3f3f3;
    }
    .header-info{
      max-width: 550px;
      flex: 1;
      overflow: hidden;
      text-align: center;
      @include clamp-one();
      @include font-size($font-xl);
      color: #f3f3f3;
      .header-artist{
        padding-top: 5px;
        @include font-size($font-l);
      }
    }
  }
</style>
