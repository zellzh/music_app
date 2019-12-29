<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconId"/>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconId () {
      return `#icon-${this.iconName}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
