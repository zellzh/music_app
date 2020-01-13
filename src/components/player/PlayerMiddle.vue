<template>
  <section class="player-middle">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="cd">
        <div class="cd-top">
          <img src="http://p1.music.126.net/iNZkyfe5KQ3vgb7nKY_d6w==/109951164428470125.jpg" alt="">
        </div>
        <div class="cd-bottom">
          <div class="cd-like" @click="switchLike">
            <svg-icon :icon-name="isLike" ref="icon"/>
          </div>
          <p class="cd-lyric">就分段尚福林中中</p>
        </div>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul class="scroll-content">
            <li>第1个li</li>
            <li>第2个li</li>
            <li>第3个li</li>
            <li>第4个li</li>
            <li>第5个li</li>
            <li>第6个li</li>
            <li>第7个li</li>
            <li>第8个li</li>
            <li>第9个li</li>
            <li>第10个li</li>
            <li>第11个li</li>
            <li>第12个li</li>
            <li>第13个li</li>
            <li>第14个li</li>
            <li>第15个li</li>
            <li>第16个li</li>
            <li>第17个li</li>
            <li>第18个li</li>
            <li>第19个li</li>
            <li>第20个li</li>
            <li>第21个li</li>
            <li>第22个li</li>
            <li>第23个li</li>
            <li>第24个li</li>
            <li>第25个li</li>
            <li>第26个li</li>
            <li>第27个li</li>
            <li>第28个li</li>
            <li>第29个li</li>
            <li>第30个li</li>
            <li>第31个li</li>
            <li>第32个li</li>
            <li>第33个li</li>
            <li>第34个li</li>
            <li>第35个li</li>
            <li>第36个li</li>
            <li>第37个li</li>
            <li>第38个li</li>
            <li>第39个li</li>
            <li>第40个li</li>
            <li>第41个li</li>
            <li>第42个li</li>
            <li>第43个li</li>
            <li>第44个li</li>
            <li>第45个li</li>
            <li>第46个li</li>
            <li>第47个li</li>
            <li>第48个li</li>
            <li>第49个li</li>
            <li>第50个li</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../common/ScrollView(BScroll)'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      isLike: 'favorites',
      swiperOption: {
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

  },
  methods: {
    switchLike () {
      this.isLike = this.isLike === 'favorites' ? 'favorites_fill' : 'favorites'
    }
  }
}
</script>

<style scoped lang="scss">
.player-middle{
  position: fixed;
  top: 150px;
  bottom: 300px;
  width: 100%;
  padding: 0 15px;
  .swiper-container{
    width: 100%;
    height: 100%;
    .cd{
      .cd-top{
        width: 600px;
        height: 600px;
        margin: 0 auto;
        overflow: hidden;
        background: url("../../assets/images/player-disc.png") no-repeat;
        background-size: 100%;
        position: relative;
        animation: spin 10s linear 0s;
        animation-play-state: paused;
        img{
          width: 373px;
          height: 373px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .cd-bottom{
        height: 200px;
        position: relative;
        .cd-like{
          position: absolute;
          top: 0;
          right: 100px;
          font-size: 60px;
          color: #f3f3f3;
        }
        .cd-lyric{
          margin-top: 20px;
          padding-top: 100px;
          text-align: center;
          color: #d3d3d3;
          @include font-size($font-l)
        }
      }
    }
    .lyric{
      padding-bottom: 50px;
      color: #737373;
      text-align: center;
    }
  }
  ::v-deep .my-bullet{
    display: inline-block;
    margin: 0 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    &.my-bullet-active{
      width: 50px;
      border-radius: 20px;
      @include bgc-type($bgc-main)
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
