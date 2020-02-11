<template>
    <header class="header">
      <div class="header-left" @click="back">
        <svg-icon iconName="back"/>
      </div>
      <div class="header-title">{{title}}</div>
      <div class="header-right">
        <svg-icon icon-name="more"/>
      </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    scroll: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    back () {
      this.$router.back()
      // 返回时注销scroll, 防止滚动过程返回报错
      this.scroll.innerScroll.destroy()
      this.scroll.outerScroll.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 100px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include bgc-type($bgc-main);
    .header-left, .header-right{
      font-size: 55px;
      color: #f3f3f3;
    }
    .header-title{
      max-width: 550px;
      @include clamp-one();
      @include font-size($font-xl);
      color: #f3f3f3;
    }
  }
</style>
