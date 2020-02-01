import {
  SET_NORMAL_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PLAYER_TYPE,
  SET_PLAYING,
  SET_FAVORITE,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX
} from './mutations-type'

export default {
  [SET_NORMAL_PLAYER] (state, payload) {
    state.showNormalPlayer = payload
  },
  [SET_MINI_PLAYER] (state, payload) {
    state.showMiniPlayer = payload
  },
  [SET_LIST_PLAYER] (state, payload) {
    state.showListPlayer = payload
  },
  [SET_PLAYER_TYPE] (state, payload) {
    state.playerType = payload
  },
  [SET_PLAYING] (state, payload) {
    state.isPlaying = payload
  },
  [SET_FAVORITE] (state, payload) {
    state.isFavorite = payload
  },
  [SET_PLAY_MODE] (state, payload) {
    state.playMode = payload
  },
  [SET_CURRENT_INDEX] (state, payload) {
    state.currentIndex = payload
  }
}
