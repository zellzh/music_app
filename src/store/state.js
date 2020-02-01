import modeType from './modeType' // 导入播放模式

export default {
  // showNormalPlayer: false,
  // showMiniPlayer: false,
  // showListPlayer: false,

  playerType: '',
  isPlaying: false,
  isFavorite: false,
  playMode: modeType.loop,
  currentIndex: -1,

  // 优化项: 待续
  swiper: null // 部分界面显示, 暂停swiper
}
