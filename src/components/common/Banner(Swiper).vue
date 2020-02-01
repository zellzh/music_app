<template>
  <section class="banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="value in banners" :key="value.bannerId">
        <a class="slide-jump" :href="value.url">
          <img class="slide-img" :src="value.pic" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 用户操作swiper后是否停止
        },
        loop: true,
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 自定义类名
          bulletActiveClass: 'my-bullet-active'
        },
        // 开启监视器, 自动调整swiper
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  mounted () {
    // 待优化
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style scoped lang="scss">
.banner{
  width: 100%;
  padding: 10px 15px;
  position: relative;
  .swiper-container{
    z-index: 0; // swiper bug, 防止自动设置 z-index
    .slide-jump{
      display: inline-block;
      width: 100%;
      overflow: hidden;
      .slide-img{
        width: 100%;
      }
    }
  }
  /* 修改插件自定义的css时, 需要深度穿透 */
  ::v-deep .my-bullet{
    display: inline-block;
    margin: 0 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    &.my-bullet-active{
      width: 20px;
      border-radius: 5px;
      @include bgc-type($bgc-main)
    }
  }
}
</style>
