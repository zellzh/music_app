import modeType from './modeType' // 播放模式

export default {
  // showNormalPlayer: false,
  // showMiniPlayer: false,
  // showListPlayer: false,

  // 状态相关
  playerType: '', // 播放器类型
  isPlaying: false, // 播放状态
  isFavorite: false, // 收藏状态
  playMode: modeType.loop, // 播放模式

  // 播放列表相关
  playlist: [],
  curIndex: 0,
  curLyric: {},

  // 优化项: 待续
  swiper: null // 部分界面显示, 暂停swiper
}
