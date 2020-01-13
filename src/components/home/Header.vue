<template>
    <header class="header" @click="switchTheme">
      <div class="header-left">
        <svg-icon :iconName="theme[index]"/>
      </div>
      <div class="header-title">鱼丸音乐</div>
      <div class="header-right">
        <svg-icon icon-name="account"/>
      </div>
    </header>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    switchTheme () {
      this.index = ++this.index % this.theme.length
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    }
  }
}
</script>

<style lang="scss">
  .header{
    width: 100%;
    height: 100px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include bgc-type($bgc-main);
    .header-left, .header-right{
      font-size: 65px;
      @include ftc-type($icon-color);
    }
    .header-right{
      font-size: 50px;
    }
    .header-title{
      max-width: 550px;
      @include clamp-one();
      @include font-size($font-xl);
      color: #f3f3f3;
    }
  }
</style>
