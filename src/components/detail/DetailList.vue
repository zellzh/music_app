<template>
    <ul class="detail-list">
      <li class="list-item" v-for="(value, index) in songlist" :key="value.id" @click="selectSong">
        <div class="item-left">
          <p class="item-song">{{value.name}}</p>
          <p class="item-artist">{{artists[index]}}</p>
        </div>
        <div class="item-right">
          <svg-icon icon-name="more"/>
        </div>
      </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailList',
  props: {
    songlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(['setNormalPlayer']),
    selectSong () {
      this.setNormalPlayer(true)
    }
  },
  computed: {
    // 格式化歌手
    artists () {
      let artists = []
      this.songlist.forEach(item => {
        if (item.ar.length > 1) {
          let formatArtist = ''
          item.ar.forEach(value => {
            formatArtist += value.name + '/'
          })
          formatArtist = formatArtist.slice(0, formatArtist.lastIndexOf('/'))
          formatArtist += ' - ' + item.al.name
          artists.push(formatArtist)
        } else {
          artists.push(item.ar[0].name + ' - ' + item.al.name)
        }
      })
      return artists
    }
  }
}
</script>

<style scoped lang="scss">
.detail-list{
  .list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
    .item-left{
      overflow: hidden;
      .item-song{
        @include clamp-one();
        @include font-size($font-xl);
        @include ftc-type($ftc-main);
      }
      .item-artist{
        margin-top: 10px;
        @include clamp-one();
        @include font-size($font-m);
        @include ftc-type($ftc-sub);
      }
    }
    .item-right{
      margin-left: 20px;
      font-size: 40px;
      @include ftc-type($ftc-main);
    }
  }
}
</style>
