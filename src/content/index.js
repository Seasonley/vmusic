console.log('content-script2!')
if (location.href.startsWith('file:///')) {
  const $video = document.querySelector('video')
  if ($video) {
    $video.disablePictureInPicture = true
    document.body.innerHTML += `<style>
    body{background:transparent}
    video{height:54px;margin:0;width:100%;box-sizing:border-box;padding-left:46px;}
    video::-webkit-media-controls-enclosure{border-radius:0}
    </style>`
    if ('mediaSession' in navigator) {
      var ms = navigator.mediaSession
      const data = {
        title: decodeURIComponent(location.href.replace(/.*\/(.*)\.\w+/, '$1')),
        cover: ''
      }
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.title,
        // artist: data.director,
        artwork: [
          { src: data.cover, sizes: '192x192' }
        ]
      })
      ms.setActionHandler('play', function () {
        $video.play()
      })
      ms.setActionHandler('nexttrack', function () {
        // playNext()
        console.log('vmusic.playNext')
      })
      ms.setActionHandler('previoustrack', function () {
        // playPrev()
      })
      ms.setActionHandler('pause', function () {
        console.log('vmusic.pause')
        $video.pause()
      })
    }
  } else if (location.href.endsWith('Music/')) {
    // const arr = document.body.innerHTML.match(/addRow\("[^"]+","[^"]+",0/g)
    // if (arr && arr.length) {
    //   ;[0, 0, 0, 0].forEach(() => document.body.removeChild(document.body.children[0]))
    //   arr.forEach((v, i) => {
    //     arr[i] = v.match(/"([^"]+)"/)[0].slice(1, -1)
    //   })
    //   console.log(arr)
    // }
    document.body.appendChild(document.createElement('iframe'))
    document.head.innerHTML += '<link rel="icon" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3dUZXh0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04IDV2MTRsMTEtN3oiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+" />'
    document.addEventListener('click', (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      const url = evt.target.dataset.value
      if (url && !url.endsWith('/')) {
        document.title = url.replace(/.[^.]+$/, '')
        const hd = document.getElementById('header')
        if (hd) {
          hd.innerHTML = '<style>td[data-value="' + url + '"] a{color:#000;background:#e5e5e5 url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3dUZXh0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik04IDV2MTRsMTEtN3oiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+") left 0.4em center/1em 1em no-repeat}</style>'
        }
        let ifrEle = document.querySelector('iframe')
        if (!ifrEle) {
          ifrEle = document.createElement('iframe')
        }
        ifrEle.style.height = '0'
        ifrEle.style.borderTop = '54px solid rgb(241, 243, 244)'
        ifrEle.src = './' + url
        document.body.appendChild(ifrEle)
        setTimeout(() => {
          ifrEle.style.height = ''
          ifrEle.style.borderTop = ''
          ifrEle.focus()
        }, 500)
        document.title = '📻 ' + document.title
      }
    })
    document.body.innerHTML += `<style>
    body{margin:0}body+div{display:none!important}
    iframe{background:rgb(241, 243, 244) url("data:image/svg+xml,%3Csvg class='icon' style='width:1em;height:1em;vertical-align:middle' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' fill='currentColor' overflow='hidden'%3E%3Cpath d='M682.667 384h-128v234.667A106.667 106.667 0 0 1 448 725.333a106.667 106.667 0 0 1-106.667-106.666A106.667 106.667 0 0 1 448 512c24.32 0 46.08 8.107 64 21.333V298.667h170.667m128-170.667H213.333A85.333 85.333 0 0 0 128 213.333v597.334A85.333 85.333 0 0 0 213.333 896h597.334A85.333 85.333 0 0 0 896 810.667V213.333A85.333 85.333 0 0 0 810.667 128z'/%3E%3C/svg%3E") left 8px center/40px 40px no-repeat;width:100%;border:0;position:fixed;bottom:0;right:0;height:54px;box-shadow: 0 0 20px #ccc;}
    a.file{pointer-events:none;color:#000;background:none;padding:4px 5px 4px 0; text-indent:2em;display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:calc(100vw - 2em);font-weight:light;color:#666}
    #header,#parentDirLinkBox{display:none!important}
    table{font-size:12px;width:100%;background:#fff;border-bottom:54px solid rgb(241, 243, 244);box-sizing:border-box;overflow-y:auto;display:flex;height:100vh;flex-direction:column}
    tr{display:flex;}
    tr:nth-child(odd){background:#f7f7f7}
    td[data-value$="/"]{display:none}
    td:nth-child(1){cursor:pointer;flex:1;}
    td:nth-child(1):hover{box-shadow:0 0 0 1px #bbb inset}
    td:nth-child(1):active{background:#e5e5e5}
    thead,td:nth-child(2),td:nth-child(3){display:none;flex:0;}
    </style>`
    window.addEventListener('message', (ev) => {
      console.log(ev.data)
    })
  }
}
// https://cloud.tencent.com/developer/article/1543549
// https://www.npmjs.com/package/jsmediatags
// https://dribbble.com/shots/14623026-LoudMusic-Ui-Kit-iOS-Dashboard-Figma-XD/attachments/6316311?mode=media
