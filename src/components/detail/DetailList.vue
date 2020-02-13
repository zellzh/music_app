<template>
    <ul class="detail-list">
      <li class="list-item" v-for="(value, index) in songlist" :key="value.id" @click.stop="selectSong(index)">
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
export default {
  name: 'DetailList',
  props: {
    songlist: {
      type: Array,
      default: () => [],
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    // 格式化歌手
    artists () {
      let artists = []
      this.songlist.forEach(item => {
        if (item.ar.length > 1) {
          let formatArtist = ''
          item.ar.forEach((value, index) => {
            formatArtist += index === 0 ? value.name : '/' + value.name
          })
          formatArtist += this.type === 'album' ? '' : ' - ' + item.al.name
          artists.push(formatArtist)
        } else {
          let temp = this.type === 'album' ? item.ar[0].name : item.ar[0].name + ' - ' + item.al.name
          artists.push(temp)
        }
      })
      return artists
    }
  },
  methods: {
    selectSong (selectIndex) {
      this.$emit('selectAll', selectIndex)
    }
  }
}
</script>

<style scoped lang="scss">
.detail-list{
  padding-bottom: 120px;
  .list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
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
      font-size: 55px;
      @include ftc-type($ftc-main);
    }
  }
}
</style>
