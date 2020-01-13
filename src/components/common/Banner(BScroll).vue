<template>
  <section class="banner">
    <div class="swipe-wrapper" ref="swipe">
      <ul class="slide-wrapper">
        <li class="slide-item" v-for="value in banners" :key="value.bannerId">
          <a class="item-jump" :href="value.url">
            <img class="item-img" :src="value.pic" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="docs-wrapper">
      <span
        class="doc"
        v-for="(item, index) in banners"
        :key="item.bannerId"
        :class="{'active': currentPageIndex === index}"/>
    </div>
  </section>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default {
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      slide: null,
      currentPageIndex: 0,
      playTimer: 0
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.playTimer)
    this.slide.destroy()
  },
  methods: {
    init: function () {
      clearTimeout(this.playTimer)
      this.slide = new BScroll(this.$refs.swipe, {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: true,
          threshold: 100
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2
      })
      this.slide.on('scrollEnd', this._onScrollEnd)

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext()
      })
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
      this.autoGoNext()
    },
    _onScrollEnd () {
      this.autoGoNext()
    },
    nextPage () {
      this.slide.next()
    },
    autoGoNext () {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.nextPage()
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
.banner{
  width: 100%;
  padding: 10px 15px;
  position: relative;
  .swipe-wrapper{
    overflow: hidden;
    .slide-wrapper{
      white-space: nowrap;
      .slide-item{
        display: inline-block;
        width: 100%;
        .item-jump{
          display: inline-block;
          .item-img{
            width: 100%;
          }
        }
      }
    }
  }
  .docs-wrapper{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    .doc{
      display: inline-block;
      margin: 0 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      &.active{
        width: 20px;
        border-radius: 5px;
        @include bgc-type($bgc-main)
      }
    }
  }
}
</style>
