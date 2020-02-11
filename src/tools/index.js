// 解析歌词
export function parseLyric (data) {
  let lyricObj = {} // key时间(秒), value对应歌词
  let lycArr = data.split('\n')
  let count = 0
  lycArr.forEach(function (item) {
    // 1.匹配时间分钟
    let reg1 = /\[\d*/
    let temp = item.match(reg1)
    if (!temp) return ++count
    let minStr = temp[0].slice(1)
    // 2.匹配时间秒钟
    let reg2 = /:\d*\.?\d*/
    temp = item.match(reg2)
    if (!temp) return
    let secStr = temp[0].slice(1)
    // 3.合并时间
    let time = parseFloat(minStr) * 60 + parseFloat(secStr)
    // 4.匹配歌词
    let text = item.slice(item.indexOf(']') + 1).trim()
    // 5.保存到对象中(有歌词时保存)
    if (text) lyricObj[time] = text
  })
  lyricObj = count === lycArr.length ? lycArr : lyricObj
  return lyricObj
}
