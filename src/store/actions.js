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
  setNormalPlayer ({ commit }, payload) {
    commit(SET_NORMAL_PLAYER, payload)
  },
  setMiniPlayer ({ commit }, payload) {
    commit(SET_MINI_PLAYER, payload)
  },
  setListPlayer ({ commit }, payload) {
    commit(SET_LIST_PLAYER, payload)
  },
  setPlayerType ({ commit }, payload) {
    commit(SET_PLAYER_TYPE, payload)
  },
  setPlaying ({ commit }, payload) {
    commit(SET_PLAYING, payload)
  },
  setFavorite ({ commit }, payload) {
    commit(SET_FAVORITE, payload)
  },
  setPlayMode ({ commit }, payload) {
    commit(SET_PLAY_MODE, payload)
  },
  setCurrentIndex ({ commit }, payload) {
    commit(SET_CURRENT_INDEX, payload)
  }
}
