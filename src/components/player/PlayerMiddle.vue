<template>
  <section class="player-middle">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="cd">
        <div class="cd-top" ref="disc">
          <img class="cd-cover" :src="curSong.picUrl" alt="">
        </div>
        <div class="cd-bottom">
          <div class="cd-favorite" @click="switchFavorite">
            <svg-icon :icon-name="favoriteName"/>
          </div>
          <p class="cd-lyric">就分段尚福林中中</p>
        </div>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul class="scroll-content">
            <li class="noLrc" v-if="noLyric">暂时没有歌词,（。・＿・。）ﾉ</li>
            <li class="fixedLrc" v-if="fixedLrc">*该歌词不支持自动滚动*</li>
            <li v-for="(lrc, key) in curLyric.lrcObj" :key="key">
              <p>{{lrc}}</p>
              <p v-if="curLyric.tlrcObj">{{curLyric.tlrcObj[key]}}</p>
            </li>
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
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      favoriteName: '',
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
  computed: {
    ...mapState(['isPlaying', 'isFavorite', 'curLyric']),
    ...mapGetters(['curSong']),
    fixedLrc () { // 不支持滚动的歌词
      return this.curLyric.lrcObj instanceof Array
    },
    noLyric () { // 没有歌词
      return this.curLyric.lrcObj ? Object.keys(this.curLyric.lrcObj).length === 0 : false
    }
  },
  methods: {
    ...mapActions(['setFavorite', 'setCurLyric']),
    switchFavorite () {
      this.setFavorite(!this.isFavorite)
      this.favoriteName = this.isFavorite ? 'favorites_fill' : 'favorites'
    }
  },
  watch: {
    isPlaying (newVal) {
      let discClass = this.$refs.disc.classList
      newVal ? discClass.add('active') : discClass.remove('active')
    },
    curSong (newVal) {
      this.setCurLyric(newVal.id)
    }
  },
  mounted () {
    let discClass = this.$refs.disc.classList
    this.isPlaying ? discClass.add('active') : discClass.remove('active')
    this.favoriteName = this.isFavorite ? 'favorites_fill' : 'favorites'
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
        animation: spin 15s linear 600ms infinite;
        animation-play-state: paused;
        .cd-cover{
          width: 373px;
          height: 373px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          // 图片水平居中
          object-fit: cover;
          /*
          text-align: center;
          img{
            width: 100%;
            height: 100%;
            margin: auto -100%;
          }
           */
        }
        &.active{
          animation-play-state: running;
        }
      }
      .cd-bottom{
        height: 200px;
        position: relative;
        .cd-favorite{
          position: absolute;
          top: 0;
          right: 100px;
          font-size: 65px;
          color: #ddd;
        }
        .cd-lyric{
          margin-top: 20px;
          padding-top: 100px;
          text-align: center;
          color: #ccc;
          @include font-size($font-l)
        }
      }
    }
    .lyric{
      padding-bottom: 50px;
      color: #ccc;
      text-align: center;
      .scroll-content{
        padding: 50% 70px;
        li{
          padding: 15px 0;
          @include font-size($font-l);
          word-break: keep-all;
        }
      }
    }
  }
  ::v-deep .my-bullet{
    display: inline-block;
    margin: 0 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ccc;
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
