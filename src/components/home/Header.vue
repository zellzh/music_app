<template>
    <div class="header" @click="switchTheme">
      <div class="header-left">
        <svg-icon :iconName="theme[index]"/>
      </div>
      <div class="header-title">鱼丸音乐</div>
      <div class="header-right">
        <svg-icon icon-name="account"/>
      </div>
    </div>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include bgc-main();
    .header-left, .header-right{
      width: 60px;
      height: 60px;
      font-size: 60px;
    }
    .header-left{
      margin-left: 10px;
      @include icon-color();
    }
    .header-right{
      margin-right: 10px;
      @include icon-color();
    }
    .header-title{
      @include clamp-one(500px);
      @include font-size($font-xl);
      color: #fff;
    }
  }
</style>
