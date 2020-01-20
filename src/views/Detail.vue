<template>
  <section class="detail">
    <DetailHeader :title="playlist.name" :scroll="{innerScroll, outerScroll}"/>
    <div class="outer-scroll" ref="outerScroll">
      <div class="scroll-content">
        <DetailInfo :imgUrl="playlist.coverImgUrl" ref="info"/>
        <section class="detail-bottom">
          <div class="list-header">
            <div class="header-left">
              <svg-icon icon-name="play_s"/>
              <span>播放全部</span>
            </div>
            <div class="header-right"></div>
          </div>
          <div class="inner-scroll" ref="innerScroll">
            <DetailList :songlist="playlist.tracks" ref="list"/>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api'
import DetailHeader from '../components/detail/DetailHeader'
import DetailInfo from '../components/detail/DetailInfo'
import DetailList from '../components/detail/DetailList'
import BScroll from '@better-scroll/core'
import NestedScroll from '@better-scroll/nested-scroll'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)
BScroll.use(NestedScroll)

export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailInfo,
    DetailList
  },
  data () {
    return {
      playlist: {},
      outerScroll: null,
      innerScroll: null
    }
  },
  props: ['id', 'type'],
  created () {
    switch (this.type) {
      case 'personalized': // 推荐歌单详情
        api.getPersonalizedDetail(this.id).then(data => {
          if (data) {
            this.playlist = data.playlist
          }
        })
        break
      case 'album': // 最新专辑详情
        api.getAlbumDetail(this.id).then(data => {
          if (data) {
            this.playlist = {
              name: data.album.name,
              coverImgUrl: data.album.picUrl,
              tracks: data.songs
            }
          }
        })
        break
    }
    /*
    if (this.type === 'personalized') { // 推荐歌单详情
      api.getPersonalizedDetail(this.id).then(data => {
        if (data) {
          this.playlist = data.playlist
        }
      })
    } else if (this.type === 'album') { // 最新专辑详情
      api.getAlbumDetail(this.id).then(data => {
        if (data) {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        }
      })
    }
     */
  },
  mounted () {
    this.initScroll()

    // 监听上拉: 范围内, 内层禁用, 启用外层; 范围外反之
    // 内层滚动之前, 外层能滚动, 禁用内层
    this.innerScroll.on('beforeScrollStart', obj => {
      if (this.outerScroll.y <= 0 && this.outerScroll.y > this.outerScroll.maxScrollY) {
        this.innerScroll.disable()
        this.outerScroll.enable()
      } else if (this.outerScroll.y > 0) { // 防止下拉外层卡住导致bug
        this.outerScroll.enable()
        this.outerScroll.scrollTo(0, 0)
      }
    })
    // 外层混动之前, 内层有滚动, 禁用外层
    this.outerScroll.on('beforeScrollStart', obj => {
      if (this.innerScroll.y !== 0) {
        this.outerScroll.disable()
        this.innerScroll.enable()
      }
    })
    // 边界滚动 & 下拉
    let imgHeight = this.$refs.info.$el.offsetHeight
    this.outerScroll.on('scroll', obj => { // 外层到达边界, 启动内层
      if (obj.y === this.outerScroll.maxScrollY && this.outerScroll.movingDirectionY === 1) {
        this.outerScroll.disable()
        this.innerScroll.enable()
      } else if (obj.y > 0) {
      // 下拉图片放大
        let scale = obj.y / imgHeight + 1
        this.$refs.info.$el.style.transform = `scale(${scale})`
      }
    })
    this.innerScroll.on('scroll', obj => { // 内层到达边界, 启动外层
      if (obj.y === 0 && this.innerScroll.movingDirectionY === -1) {
        this.outerScroll.enable()
        this.innerScroll.disable()
      }
    })
  },
  methods: {
    initScroll () {
      // outer
      this.outerScroll = new BScroll(this.$refs.outerScroll, {
        probeType: 3,
        nestedScroll: true,
        observeDOM: true,
        click: true,
        bounce: {
          bottom: false
        }
      })
      // inner
      this.innerScroll = new BScroll(this.$refs.innerScroll, {
        probeType: 2,
        nestedScroll: true,
        observeDOM: true,
        bounce: {
          top: false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /*
  BUG记录:
    - 移动端真机有`状态栏` / `工具栏` / '标签栏' 等, 可能会挡住底部内容
    - 不同的浏览器视口也不一样
   */
.detail{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  @include bgc-type($bgc-sub);
  .outer-scroll{
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    .scroll-content{
      .detail-bottom{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        @include bgc-type($bgc-sub);
        .list-header{
          width: 100%;
          height: 100px;
          line-height: 80px;
          padding: 10px 15px;
          font-size: 55px;
          @include ftc-type($ftc-main);
          span{
            margin-left: 20px;
            vertical-align: 6px;
            @include font-size($font-xl);
            @include ftc-type($ftc-main);
          }
        }
        .inner-scroll{
          width: 100%;
          height: 1134px; // 视口不一定
          overflow: hidden;
        }
      }
    }
  }
}
</style>
