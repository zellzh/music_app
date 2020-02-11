<template>
  <section class="detail">
    <DetailHeader :title="albumDetail.name" :scroll="{innerScroll, outerScroll}"/>
    <div class="outer-scroll" ref="outerScroll">
      <div class="scroll-content">
        <DetailInfo :imgUrl="albumDetail.coverImgUrl" ref="info"/>
        <section class="detail-bottom">
          <div class="list-header" @click.stop="selectAll(0)">
            <div class="header-left">
              <svg-icon icon-name="play_s"/>
              <span>播放全部</span>
            </div>
            <div class="header-right"></div>
          </div>
          <div class="inner-scroll" ref="innerScroll">
            <DetailList @selectAll="selectAll" :songlist="albumDetail.tracks"/>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { getPersonalizedDetail, getAlbumDetail } from '../api'
import DetailHeader from '../components/detail/DetailHeader'
import DetailInfo from '../components/detail/DetailInfo'
import DetailList from '../components/detail/DetailList'
import BScroll from '@better-scroll/core'
import NestedScroll from '@better-scroll/nested-scroll'
import ObserveDOM from '@better-scroll/observe-dom'
import { mapState, mapActions } from 'vuex'

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
      albumDetail: {},
      outerScroll: null,
      innerScroll: null
    }
  },
  props: ['id', 'type'],
  created () {
    switch (this.type) {
      case 'personalized': // 推荐歌单详情
        getPersonalizedDetail(this.id).then(data => {
          if (data) {
            this.albumDetail = data.playlist
          }
        })
        break
      case 'album': // 最新专辑内容
        getAlbumDetail(this.id).then(data => {
          if (data) {
            this.albumDetail = {
              name: data.album.name,
              coverImgUrl: data.album.picUrl,
              tracks: data.songs
            }
          }
        })
        break
    }
  },
  mounted () {
    this.initScroll()
    this.scrollEffect()
  },
  computed: {
    ...mapState(['playlist', 'curIndex'])
  },
  methods: {
    ...mapActions(['setPlaylist', 'setPlayerType', 'setCurIndex']),
    async selectAll (selectIndex) {
      this.setPlayerType('NormalPlayer')
      if (this.curIndex !== selectIndex) this.setCurIndex(selectIndex)
      let ids = this.albumDetail.tracks.map(item => item.id)
      if (this.playlist.length > 0) {
        let temp = this.playlist.map(item => item.id)
        if (ids.every((value, index) => value === temp[index])) return // 同playlist不重复请求
      }
      this.setPlaylist(ids)
    },
    // BS初始化
    initScroll () {
      // outer
      this.outerScroll = new BScroll(this.$refs.outerScroll, {
        nestedScroll: true,
        probeType: 3,
        observeDOM: true,
        click: true,
        bounce: {
          bottom: false
        }
      })
      // inner
      this.innerScroll = new BScroll(this.$refs.innerScroll, {
        nestedScroll: true,
        probeType: 3,
        observeDOM: true,
        // click: true,
        bounce: {
          top: false
        }
      })
    },
    // 滚动效果
    scrollEffect () {
      /*
      (边界滚动会引起点击bug, 并且性能不好, 不使用)
      // 监听上拉: 范围内, 内层禁用, 启用外层; 范围外反之
      // 内层滚动之前, 外层能滚动, 禁用内层
      this.innerScroll.on('beforeScrollStart', pos => {
        if (this.outerScroll.y <= 0 && this.outerScroll.y > this.outerScroll.maxScrollY) {
          this.innerScroll.disable()
          this.outerScroll.enable()
        } else if (this.outerScroll.y > 0) { // 防止下拉外层卡住导致bug
          this.outerScroll.enable()
          this.outerScroll.scrollTo(0, 0)
        }
        if (this.innerScroll.maxScrollY === 0) { // 内层无滚动时, 外层滚动
          this.outerScroll.enable()
        }
      })
      // 外层混动之前, 内层有滚动时禁用内层
      // this.outerScroll.on('scrollStart', pos => {
      //   if (this.innerScroll.y !== 0) {
      //     this.outerScroll.disable()
      //     this.innerScroll.enable()
      //   } else {
      //     this.outerScroll.enable()
      //   }
      // })

      // 边界滚动 & 下拉放大
      let imgHeight = this.$refs.info.$el.offsetHeight
      this.outerScroll.on('scroll', pos => { // 内层有滚动时: 外层到达边界, 启动内层 --- (上拉)
        if (pos.y === this.outerScroll.maxScrollY && this.outerScroll.movingDirectionY === 1 && this.innerScroll.maxScrollY !== 0) {
          this.outerScroll.disable()
          this.innerScroll.enable()

          // 解决移动端真机内层click事件失效的bug
          this.innerScroll.options.click = true
        } else if (pos.y > 0) {
          // 下拉图片放大
          let scale = pos.y / imgHeight + 1
          this.$refs.info.$el.style.transform = `scale(${scale})`
        } else {
          // 解决移动端真机内层click事件失效的bug
          this.innerScroll.options.click = false
        }
      })
      this.innerScroll.on('scroll', pos => { // 内层有滚动时: 内层到达边界, 启动外层 --- (下拉)
        if (pos.y === 0 && this.innerScroll.movingDirectionY === -1 && this.innerScroll.maxScrollY !== 0) {
          this.outerScroll.enable()
          this.innerScroll.disable()
        }
      })
      // this.innerScroll.on('scrollEnd', () => {
      //   this.outerScroll.enable()
      // })
    }
       */

      // 去除边界滚动
      // 内层滚动开始之前, 外层还未滚动完, 禁用内层; 否则启用内层
      this.innerScroll.on('beforeScrollStart', pos => {
        if (this.outerScroll.y === this.outerScroll.maxScrollY && this.innerScroll.maxScrollY !== 0) {
          this.outerScroll.disable()
          this.innerScroll.enable()

          // 解决真机内层click事件失效的bug
          this.innerScroll.options.click = true
        } else {
          this.outerScroll.enable()
          this.innerScroll.disable()

          // 解决真机内层click事件失效的bug
          this.innerScroll.options.click = false
        }
      })

      // 下拉放大图片
      let imgHeight = this.$refs.info.$el.offsetHeight
      this.outerScroll.on('scroll', pos => {
        if (pos.y > 0) {
          // 下拉图片放大
          let scale = pos.y / imgHeight + 1
          this.$refs.info.$el.style.transform = `scale(${scale})`
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

  解决办法:
    - 利用视口单位 vh / vw
    - 有些浏览器视口包含搜索栏等, 暂时无法解决
   */
.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bgc-type($bgc-sub);
  .outer-scroll{
    width: 100%;
    height: calc(100% - 100px);
    overflow: hidden;
    .scroll-content{
      .detail-bottom{
        width: 100%;
        height: calc(100vh - 100px);
        overflow: hidden;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        @include bgc-type($bgc-sub);
        .list-header{
          width: 100%;
          height: 100px;
          line-height: 80px;
          padding: 10px 15px;
          font-size: 60px;
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
          height: calc(100% - 100px);
          overflow: hidden;
        }
      }
    }
  }
}
</style>
