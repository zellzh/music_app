<template>
  <section class="newsong">
    <div class="newsong-top">
      <h3 class="title">最新音乐</h3>
    </div>
    <ul class="newsong-list">
      <li class="newsong-item" v-for="(value, index) in songs" :key="value.id" @click="showPlayer">
        <div class="item-left">
          <p class="item-info">
            {{value.name}}
            <span v-if="value.song.alias.length>0">({{value.song.alias[0]}})</span>
          </p>
          <p class="item-artist">
            <i class="icon-sq"/>
            {{artists[index]}}
          </p>
        </div>
        <div class="item-right">
          <svg-icon icon-name="play_f"/>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewSong',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    // 格式化歌手
    artists () {
      let artists = []
      this.songs.forEach(item => {
        if (item.song.artists.length > 1) {
          let formatArtist = ''
          item.song.artists.forEach((value, index) => {
            formatArtist += index === 0 ? value.name : '/' + value.name
          })
          formatArtist += ' - ' + item.song.album.name
          artists.push(formatArtist)
        } else {
          artists.push(item.song.artists[0].name + ' - ' + item.song.album.name)
        }
      })
      return artists
    }
  },
  methods: {
    ...mapActions(['setPlayerType']),
    showPlayer () {
      this.setPlayerType('NormalPlayer')
    }
  }
}
</script>

<style scoped lang="scss">
.newsong{
  width: 100%;
  margin-top: 50px;
  .newsong-top{
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
  .newsong-list{
    width: 100%;
    margin-top: 20px;
    padding: 0 15px;
    .newsong-item{
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0;
      .item-left{
        flex: 1;
        overflow: hidden;
        .item-info, .item-artist{
          @include font-size($font-xl);
          @include clamp-one();
          @include ftc-type($ftc-main);
        }
        .item-artist{
          margin-top: 10px;
          @include font-size($font-m);
          @include ftc-type($ftc-sub);
        }
        .icon-sq{
          display: inline-block;
          width: 24px;
          height: 16px;
          background: url("../../assets/icon/sq.png") no-repeat;
          background-size: cover;
        }
      }
      .item-right{
        margin-left: 30px;
        font-size: 60px;
        @include ftc-type($ftc-active);
      }
    }
  }
}
</style>
