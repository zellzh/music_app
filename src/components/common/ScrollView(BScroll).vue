<template>
  <div class="scroll-view" ref="scroll">
    <slot/>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default {
  name: 'ScrollView',
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.initScroll()
  },
  methods: {
    initScroll () {
      this.scroll = new BScroll(this.$refs.scroll, {
        observeDOM: true,
        click: true
      })
    }
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
