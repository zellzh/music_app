import types from './mutations-type'
import { getSongLyric, getSongInfo } from '../api'
import { parseLyric } from '../tools'

export default {
  /*
  setNormalPlayer ({ commit }, payload) {
    commit(type.SET_NORMAL_PLAYER, payload)
  },
  setMiniPlayer ({ commit }, payload) {
    commit(type.SET_MINI_PLAYER, payload)
  },
  setListPlayer ({ commit }, payload) {
    commit(type.SET_LIST_PLAYER, payload)
  },
   */

  setPlayerType ({ commit }, player) {
    commit(types.SET_PLAYER_TYPE, player)
  },
  setPlaying ({ commit }, boolean) {
    commit(types.SET_PLAYING, boolean)
  },
  setFavorite ({ commit }, boolean) {
    commit(types.SET_FAVORITE, boolean)
  },
  setPlayMode ({ commit }, modeType) {
    commit(types.SET_PLAY_MODE, modeType)
  },
  setCurIndex ({ commit }, num) {
    commit(types.SET_CUR_INDEX, num)
  },
  async setPlaylist ({ commit }, ids) {
    let arr = []
    let [data, urls] = await getSongInfo(ids.join())
    console.log(urls)
    if (data && urls) {
      data.songs.forEach(song => {
        let artists = ''
        let url = ''
        song.ar.forEach((artist, i) => { // 歌手处理
          artists += i === 0 ? artist.name : '/' + artist.name
        })
        urls.data.forEach(item => { // 歌曲url处理
          if (item.id === song.id) {
            url = item.url
          }
        })

        let item = { // 保存歌曲信息
          id: song.id,
          name: song.name,
          artist: artists,
          picUrl: song.al.picUrl,
          url: url
        }
        arr.push(item)
      })
    }
    commit(types.SET_PLAYLIST, arr)
  },
  async setCurLyric ({ commit, state }, id) {
    let data = await getSongLyric(id)
    if (!data) return
    let lrcObj = data.lrc ? (data.lrc.lyric ? parseLyric(data.lrc.lyric) : {}) : {}
    let tlrcObj = data.tlyric ? (data.tlyric.lyric ? parseLyric(data.tlyric.lyric) : null) : null
    commit(types.SET_CUR_LYRIC, { lrcObj, tlrcObj })
  }
}
