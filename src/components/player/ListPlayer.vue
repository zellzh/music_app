<template>
  <section class="list-player">
    <div class="list-player-wrapper">
      <div class="list-header">
        <div class="header-left" @click.stop="switchMode">
          <div class="loop-mode">
            <svg-icon :icon-name="modeType"/>
          </div>
          <span>{{modeText}}</span>
        </div>
        <div class="header-right">
          <div class="clear">
            <svg-icon icon-name="clear"/>
          </div>
        </div>
      </div>
      <ScrollView>
        <ul class="scroll-content" ref="songList">
          <li class="list-item" @click.stop="selectSong(index)" v-for="(song, index) in playlist" :key="song.id">
            <div class="item-left">
              <div :class="{'item-info': true, active: curIndex === index}">
                <span class="item-title">{{song.name}}</span>
                <span class="item-artist"> - {{song.artist}}</span>
              </div>
              <div class="playing" v-if="curIndex === index">
                <SvgIcon icon-name="play_line"/>
              </div>
            </div>
            <div class="item-handle">
              <div class="like">
                <svg-icon icon-name="favorites"/>
              </div>
              <div class="delete">
                <svg-icon icon-name="close"/>
              </div>
            </div>
          </li>
        </ul>
      </ScrollView>
      <div class="list-footer" @click.stop="hideListPlayer">关闭</div>
    </div>
  </section>
</template>

<script>
import ScrollView from '../common/ScrollView(BScroll)'
import SvgIcon from '../icons/SvgIcon'
import modeType from '../../store/modeType'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ListPlayer',
  components: {
    ScrollView,
    SvgIcon
  },
  data () {
    return {
      modeType: '',
      modeText: '',
      items: []
    }
  },
  computed: {
    ...mapState(['isPlaying', 'playMode', 'curIndex', 'playlist']),
    ...mapGetters(['curSong'])
  },
  mounted () {
    this.initMode()
  },
  methods: {
    ...mapActions(['setPlayerType', 'setPlaying', 'setPlayMode', 'setCurIndex', 'setCurLyric']),
    initMode () {
      switch (this.playMode) {
        case modeType.loop:
          this.modeType = 'loop'
          this.modeText = '列表循环'
          break
        case modeType.single:
          this.modeType = 'single'
          this.modeText = '单曲循环'
          break
        case modeType.shuffle:
          this.modeType = 'shuffle'
          this.modeText = '随机播放'
          break
      }
    },
    hideListPlayer () {
      this.setPlayerType('MiniPlayer')
    },
    switchMode () {
      switch (this.playMode) {
        case modeType.loop:
          this.setPlayMode(modeType.single)
          this.modeType = 'single'
          this.modeText = '单曲循环'
          break
        case modeType.single:
          this.setPlayMode(modeType.shuffle)
          this.modeType = 'shuffle'
          this.modeText = '随机播放'
          break
        case modeType.shuffle:
          this.setPlayMode(modeType.loop)
          this.modeType = 'loop'
          this.modeText = '列表循环'
          break
      }
    },
    selectSong (index) {
      if (this.curIndex === index) return
      this.setCurIndex(index)
      this.setCurLyric(this.playlist[index].id)
    }
  }
}
</script>

<style scoped lang="scss">
.list-player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .3);
  .list-player-wrapper{
    position: fixed;
    top: 300px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 15px;
    @include bgc-type($bgc-sub);
    .list-header{
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #939393;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left, .header-right{
        display: flex;
        line-height: 100px;
        font-size: 50px;
        color: #939393;
        .loop-mode{
          margin-right: 10px;
        }
        &>span{
          @include font-size($font-xl);
          @include ftc-type($ftc-main)
        }
      }
    }
    .scroll-view{
      width: 100%;
      height: calc(100% - 100px - 120px);
      .scroll-content{
        .list-item{
          width: 100%;
          height: 100px;
          border-bottom: 1px solid #939393;
          display: flex;
          justify-content: space-between;
          .item-left{
            display: flex;
            line-height: 100px;
            overflow: hidden;
            .item-info{
              @include clamp-one();
              .item-title{
                @include ftc-type($ftc-main);
                @include font-size($font-xl);
              }
              .item-artist{
                @include ftc-type($ftc-sub);
                @include font-size($font-l);
              }
              &.active{
                .item-title, .item-artist{
                  @include ftc-type($ftc-active);
                }
              }
            }
            .playing{
              margin-left: 10px;
              font-size: 50px;
              @include ftc-type($ftc-active)
            }
          }
          .item-handle{
            display: flex;
            line-height: 100px;
            margin-left: 20px;
            font-size: 50px;
            color: #939393;
            .delete{
              margin-left: 20px;
            }
          }
        }
      }
    }
    .list-footer{
      width: 100%;
      padding: 0 -15px;
      line-height: 120px;
      text-align: center;
      color: #f3f3f3;
      position: fixed;
      left: 0;
      bottom: 0;
      @include font-size($font-xl);
      @include bgc-type($bgc-main)
    }
  }
  .list-player-mask{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    @include z-index(bg)
  }
}
</style>
