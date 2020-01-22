import {
  SET_NORMAL_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PLAYER_TYPE
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
  }
}
