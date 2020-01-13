<template>
  <section class="detail-info">
    <div class="detail-cover">
      <img :src="imgUrl" alt="">
    </div>
  </section>
</template>

<script>
export default {
  name: 'DetailInfo',
  props: {
    imgUrl: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.detail-info{
  width: 100%;
  height: 500px;
  position: relative;
  z-index: -1;
  .detail-cover{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
