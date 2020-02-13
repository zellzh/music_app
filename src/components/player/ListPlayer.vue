<template>
  <section class="list-player">
    <div class="list-player-wrapper">
      <div class="list-header">
        <div class="header-left" @click.stop="switchMode">
          <div class="play-mode">
            <svg-icon :icon-name="playMode"/>
          </div>
          <span v-if="playMode === modeType.loop">列表循环</span>
          <span v-else-if="playMode === modeType.single">单曲循环</span>
          <span v-else>随机播放</span>
        </div>
        <div class="header-right">
          <div class="clear">
            <svg-icon icon-name="clear"/>
          </div>
        </div>
      </div>
      <ScrollView>
        <ul class="scroll-content">
          <li class="list-item" @click.stop="selectSong(index)" v-for="(song, index) in playlist" :key="song.id">
            <div class="item-left">
              <div :class="{'item-info': true, active: curIndex === index}">
                <span class="item-title">{{song.name}}</span>
                <span class="item-artist"> - {{song.artist}}</span>
              </div>
              <div class="playing" v-if="curIndex === index && isPlaying">
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
import playerType from '../../store/playerType'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ListPlayer',
  components: {
    ScrollView,
    SvgIcon
  },
  data () {
    return {
      modeType: modeType,
      items: []
    }
  },
  computed: {
    ...mapState(['playMode', 'isPlaying', 'curIndex', 'playlist'])
  },
  methods: {
    ...mapActions(['setPlayerType', 'setPlayMode', 'setCurIndex', 'setPlaying']),
    hideListPlayer () {
      this.setPlayerType(playerType.mini)
    },
    switchMode () {
      switch (this.playMode) {
        case modeType.loop:
          this.setPlayMode(modeType.single)
          break
        case modeType.single:
          this.setPlayMode(modeType.shuffle)
          break
        case modeType.shuffle:
          this.setPlayMode(modeType.loop)
          break
      }
    },
    selectSong (index) {
      this.isPlaying || this.setPlaying(true)
      this.curIndex === index || this.setCurIndex(index)
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
        .play-mode{
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
