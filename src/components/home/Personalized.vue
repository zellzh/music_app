<template>
  <section class="personalized">
    <div class="personalized-top">
      <h3 class="title">{{title}}</h3>
    </div>
    <ul class="personalized-list">
      <li class="personalized-item" v-for="value in personalized" @click="toDetail(type, value.id)" :key="value.id">
        <img class="item-cover" v-lazy="value.picUrl" alt="">
        <p class="item-info">{{value.name}}</p>
        <p class="item-artist" v-if="value.artist">{{value.artist.name}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    personalized: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    toDetail (type, id) {
      // 路由跳转
      // this.$router.push({ path: `/recommend/detail/${id}` })
      this.$router.push({ path: '/recommend/detail', query: { id, type } })
    }
  }
}
</script>

<style scoped lang="scss">
.personalized{
  width: 100%;
  margin-top: 50px;
  .personalized-top{
    padding: 0 15px;
    position: relative;
    .title{
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      @include ftc-type($ftc-main);
      @include font-size($font-xl);
    }
    &:after{
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      width: 4px;
      height: 30px;
      @include bgc-type($ftc-active);
    }
  }
  .personalized-list{
    display: flex;
    margin-top: 20px;
    padding: 0 15px;
    justify-content: space-between;
    flex-wrap: wrap;
    .personalized-item{
      width: 220px;
      margin-top: 10px;
      .item-cover{
        width: 100%;
        height: 220px;
        border-radius: 20px;
      }
      .item-info{
        margin-top: 10px;
        @include font-size($font-m);
        @include clamp-n(2);
        @include ftc-type($ftc-main);
      }
      .item-artist{
        margin-top: 10px;
        @include font-size($font-s);
        @include clamp-one();
        @include ftc-type($ftc-sub);
      }
    }
  }
}
</style>
