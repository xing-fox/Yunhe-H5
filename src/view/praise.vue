<template>
  <div class='praise'>
    <ul>
      <li class="bor-b">
        <div class="listImg">
          <img src="../images/1.png" alt="">
        </div>
        <div class="listCont">
            <div class="contName">
                <span>聪明的一休</span>
            </div>
            <div class="contTime">
              <span>今天18:00</span>给笔记点了赞
            </div>
        </div>
      </li>
      <li class="bor-b">
        <div class="listImg">
          <img src="../images/1.png" alt="">
        </div>
        <div class="listCont">
            <div class="contName">
                <span>聪明的一休</span>
            </div>
            <div class="contTime">
              <span>今天18:00</span>给笔记点了赞
            </div>
        </div>
      </li>
      <li class="bor-b">
        <div class="listImg">
          <img src="../images/1.png" alt="">
        </div>
        <div class="listCont">
            <div class="contName">
                <span>聪明的一休</span>
            </div>
            <div class="contTime">
              <span>今天18:00</span>给笔记点了赞
            </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Praise',
  data () {
    return {
    }
  },
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .praise{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    overflow: scroll;
    left: 0;
    background: #f4f6fa;
    ul{
      font-size: 0;
      width: 100%;
      margin: .09rem 0 0 0;
      background: #fff;
      li{
        padding: .15rem .12rem;
        display: flex;
        .listImg{
          width: .35rem;
          height: .35rem;
          border-radius: .18rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .listCont{
          flex: 1;
          margin: 0 0 0 .08rem;
          .contName{
            color: #333;
            font-size: .13rem;
            line-height: .175rem;
          }
          .contTime{
            color: #777;
            font-size: .12rem;
            line-height: .2rem;
            span{
              margin: 0 .05rem 0 0;
            }
          }
        }
      }
    }
  }
</style>
