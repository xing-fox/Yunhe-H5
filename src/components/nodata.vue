<template>
  <div class="empty">
    <div class="content">
      <img src="../images/icon/nodata.png" alt="">
      <p>暂无优惠券～</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nodata'
}
</script>

<style lang="less" scoped>
.empty {
  .content {
    width: 1.5rem;
    height: 1.8rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto auto;
    text-align: center;
  }
  img {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
  }
  p {
    color: #ccc;
    font-size: .14rem;
    line-height: .3rem;
  }
}
</style>
