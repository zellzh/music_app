import types from './mutations-type'
import { getSongInfo, getSongLyric } from '../api'
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
  setShowDisc ({ commit }, boolean) {
    commit(types.SET_SHOW_DISC, boolean)
  },
  async setPlaylist ({ commit, state }, payload = { ids: [], type: '' }) {
    // let curArr = state.playlist.map(obj => obj)
    let [data, urls] = await getSongInfo(payload.ids.join())
    if (!(data && urls)) return
    let tempArr = data.songs.map(song => {
      let artists = ''
      song.ar.forEach((artist, i) => { // 歌手处理
        artists += i === 0 ? artist.name : '/' + artist.name
      })
      let urlObj = urls.data.find(item => item.id === song.id)

      return { // 保存歌曲信息
        id: song.id,
        name: song.name,
        artist: artists,
        picUrl: song.al.picUrl,
        url: urlObj.url
      }
    })
    if (payload.type === 'one') {
      state.playlist.splice(++state.curIndex, 0, tempArr[0])
    } else {
      commit(types.SET_PLAYLIST, tempArr)
    }
  },
  async setCurLyric ({ commit }, id) {
    let data = await getSongLyric(id)
    if (!data) return
    let lrcObj = data.lrc ? (data.lrc.lyric ? parseLyric(data.lrc.lyric) : {}) : {}
    let tlrcObj = data.tlyric ? (data.tlyric.lyric ? parseLyric(data.tlyric.lyric) : null) : null
    commit(types.SET_CUR_LYRIC, { lrcObj, tlrcObj })
  }
}
