<template>
  <section class="list-player">
    <div class="list-header">
      <div class="header-left">
        <div class="loop-mode">
          <svg-icon icon-name="loop_list"/>
        </div>
        <span>列表播放</span>
      </div>
      <div class="header-right">
        <div class="clear">
          <svg-icon icon-name="clear"/>
        </div>
      </div>
    </div>
    <ScrollView>
      <ul class="scroll-content">
        <li class="list-item">
          <div class="item-info">
            <span class="item-title">轻微</span>
            <span class="item-artist"> - 塞宁</span>
          </div>
          <div class="item-handle">
            <div class="like">
              <svg-icon icon-name="favorites"/>
            </div>
            <div class="delete">
              <svg-icon icon-name="close"/>
            </div>
          </div>
        </li>
      </ul>
    </ScrollView>
    <div class="list-footer">关闭</div>
  </section>
</template>

<script>
import ScrollView from '../common/ScrollView(BScroll)'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
.list-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1000px;
  padding: 0 15px;
  @include bgc-type($bgc-sub);
  .list-header{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #838383;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left{
      display: flex;
      line-height: 100px;
      .loop-mode{
        margin-right: 10px;
        font-size: 56px;
        color: #858585;
      }
      &>span{
        @include font-size($font-xl);
        @include ftc-type($ftc-main)
      }
    }
    .header-right{
      font-size: 46px;
      color: #838383;
    }
  }
  .scroll-view{
    width: 100%;
    height: calc(100% - 100px - 120px);
    .scroll-content{
      .list-item{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #838383;
        display: flex;
        justify-content: space-between;
        .item-info{
          line-height: 100px;
          .item-title{
            @include ftc-type($ftc-main);
            @include font-size($font-xl);
          }
          .item-artist{
            @include ftc-type($ftc-sub);
            @include font-size($font-l);
          }
        }
        .item-handle{
          display: flex;
          line-height: 100px;
          font-size: 46px;
          color: #838383;
          .delete{
            font-size: 40px;
            margin-left: 26px;
          }
        }
      }
    }
  }
  .list-footer{
    width: 100%;
    padding: 0 -15px;
    line-height: 120px;
    text-align: center;
    color: #f3f3f3;
    position: fixed;
    left: 0;
    bottom: 0;
    @include font-size($font-xl);
    @include bgc-type($bgc-main)
  }
}
</style>
