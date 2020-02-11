export default {
  curSong: state => state.playlist.length === 0
    ? { id: '', name: '', artist: '', picUrl: '', url: '' } : state.playlist[state.curIndex]
}
