<template>
    <nav class="tab-bar">
      <router-link class="item" v-for="item in tabs" :to="item.path" replace tag="div" :key="item.id">
        <span class="item-name">{{item.tab}}</span>
      </router-link>
    </nav>
</template>

<script>
export default {
  name: 'TabBar',
  data () {
    return {
      tabs: [
        { tab: '推荐', path: '/recommend', id: 1 },
        { tab: '歌手', path: '/singer', id: 2 },
        { tab: '排行', path: '/rank', id: 3 },
        { tab: '搜索', path: '/search', id: 4 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .tab-bar{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    @include ftc-type($ftc-main);
    @include bgc-type($bgc-sub);
    border-bottom: 1px solid #ccc;
    &>.item{
      padding: 0 10px;
      line-height: 80px;
      @include font-size($font-l);
      &.router-active{
        @include ftc-type($ftc-active);
        border-bottom: 4px solid;
        transition: border-bottom 500ms ease 0ms;
      }
    }
  }
</style>
