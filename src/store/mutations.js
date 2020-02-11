import types from './mutations-type'

export default {
  /*
  [types.SET_NORMAL_PLAYER] (state, payload) {
    state.showNormalPlayer = payload
  },
  [types.SET_MINI_PLAYER] (state, payload) {
    state.showMiniPlayer = payload
  },
  [types.SET_LIST_PLAYER] (state, payload) {
    state.showListPlayer = payload
  },
   */

  [types.SET_PLAYER_TYPE] (state, player) {
    state.playerType = player
  },
  [types.SET_PLAYING] (state, boolean) {
    state.isPlaying = boolean
  },
  [types.SET_FAVORITE] (state, boolean) {
    state.isFavorite = boolean
  },
  [types.SET_PLAY_MODE] (state, modetypes) {
    state.playMode = modetypes
  },
  [types.SET_CUR_INDEX] (state, num) {
    state.curIndex = num
  },
  [types.SET_PLAYLIST] (state, arr) {
    state.playlist = arr
  },
  [types.SET_CUR_LYRIC] (state, obj) {
    state.curLyric = obj
  }
}
