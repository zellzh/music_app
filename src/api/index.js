import network from './network'

export default {
  getBanner: () => network.get('/banner', { type: 2 }), // 轮播图
  getPersonalized: () => network.get('/personalized', { limit: 6 }), // 推荐歌单
  getNewAlbum: () => network.get('/album/newest'), // 最新专辑
  getNewSong: () => network.get('/personalized/newsong'), // 最新音乐
  getPersonalizedDetail: (id = null) => network.get('/playlist/detail', { id }), // 歌单详情
  getAlbumDetail: (id = null) => network.get('/album', { id }) // 歌单详情
}
