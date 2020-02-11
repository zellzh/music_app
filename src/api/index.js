import network from './network'

/*
export default {
  getBanner: () => network.get('/banner', { type: 2 }), // 轮播图
  getPersonalized: () => network.get('/personalized', { limit: 6 }), // 推荐歌单
  getNewAlbum: () => network.get('/album/newest'), // 最新专辑
  getNewSong: () => network.get('/personalized/newsong'), // 最新音乐
  getPersonalizedDetail: (id = '') => network.get('/playlist/detail', { id }), // 歌单详情
  getAlbumDetail: (id = '') => network.get('/album', { id }), // 专辑内容
  getSongDetail: (ids = '') => network.get('/song/detail', { ids }) // 歌曲详情
}
 */

export const getBanner = () => network.get('/banner', { type: 2 }) // 轮播图
export const getPersonalized = () => network.get('/personalized', { limit: 6 }) // 推荐歌单
export const getNewAlbum = () => network.get('/album/newest') // 最新专辑
export const getNewSong = () => network.get('/personalized/newsong') // 最新音乐
export const getPersonalizedDetail = (id = '') => network.get('/playlist/detail', { id }) // 歌单详情
export const getAlbumDetail = (id = '') => network.get('/album', { id }) // 专辑内容
export const getSongDetail = (ids = '') => network.get('/song/detail', { ids }) // 歌曲详情
export const getSongURL = (ids = '') => network.get('/song/url', { id: ids }) // 歌词url
export const getSongInfo = (ids = '') => network.all([getSongDetail(ids), getSongURL(ids)]) // 并发歌曲信息
export const getSongLyric = (id = '') => network.get('/lyric', { id }) // 歌词详情
