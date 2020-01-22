import {
  SET_NORMAL_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PLAYER_TYPE
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
  }
}
