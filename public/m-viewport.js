(function (w, r = 7.5) {
  let scale = 1 / devicePixelRatio
  let viewport = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`
  document.write(viewport)
  document.documentElement.style.fontSize = innerWidth / 7.5 + 'px'
  document.documentElement.setAttribute('data-dpr', devicePixelRatio + '')
})(window)
