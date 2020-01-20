import {
  SET_NORMAL_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER
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
  }
}
