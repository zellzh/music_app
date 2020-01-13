<template>
  <div class="scroll-view" ref="scroll">
    <slot/>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
// import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  name: 'ScrollView',
  data () {
    return {
      scroll: null,
      observeDOM: null
    }
  },
  mounted () {
    this.scroll = new IScroll(this.$refs.scroll, {
      mouseWheel: false,
      probeType: 3,
      scrollbar: true,
      disableMouse: true,
      disableTouch: false,
      disablePointer: false,
      bindToWrapper: true
    })

    /*    */
    // 创建DOM节点监听
    this.observerDOM = new MutationObserver(typeList => {
      // console.log(typeList)
      this.scroll.refresh()
      // console.log(this.scroll.maxScrollY)
    })
    // 配置监听配置
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    // 启动监听
    this.observerDOM.observe(this.$refs.scroll, config)


    // 借助插件 --- 只能监听元素尺寸的变化
    // this.observeDOM = elementResizeDetectorMaker({
    //   strategy: 'scroll'
    // })
    // this.observeDOM.listenTo(this.$refs.scroll, () => {
    //   this.scroll.refresh()
    // })
  },
  beforeDestroy () {
    this.observerDOM.disconnect()
    // this.observeDOM.uninstall(this.$refs.content)
  }
}
</script>

<style scoped lang="scss">
.scroll-view{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
