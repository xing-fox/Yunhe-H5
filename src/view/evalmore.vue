<template>
  <div class='evalmore'>
    <ul class="evaList">
        <li>
          <div class="listImg">
            <img src="../images/1.png" alt="">
          </div>
          <div class="listContent1">
            <div class="listContTitle">
                <span>asdfasdf</span>
            </div>
            <div class="listContMain">
                <span>Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span>
            </div>
            <div class="timeStars">
                <div class="time">昨天 11:12</div>
                <div class="reward">
                <img src="../images/icon/shang.png" alt="">
                <span>10</span>
                </div>
                <div class="eval">
                <img src="../images/icon/eval.png" alt="">
                <span>1</span>
                </div>
                <div class="zan">
                <img src="../images/icon/admire.png" alt="">
                <span>10</span>
                </div>
            </div>
            <div class="listEval">
                <div class="list">
                    <div class="evalMain">
                        <span>羊肉烤串:</span>如果以上这些效果不能满足你的需求，你可以仿照animate.css的格式制作一些其他效果
                    </div>
                    <div class="timeZan">
                        <span class="zanTime">08-12 08:32</span>
                        <img src="../images/icon/admire.png" alt="">
                        <span class="zanCount">12</span>
                    </div>
                </div>
                <div class="list">
                    <div class="evalMain">
                        <span>羊肉烤串:</span>如果以上这些效果不能满足你的需求，你可以仿照animate.css的格式制作一些其他效果
                    </div>
                    <div class="timeZan">
                        <span class="zanTime">08-12 08:32</span>
                        <img src="../images/icon/admire.png" alt="">
                        <span class="zanCount">12</span>
                    </div>
                </div>
            </div>
          </div>
        </li>
        <li>
            <div class="listImg">
            <img src="../images/1.png" alt="">
            </div>
            <div class="listContent1">
            <div class="listContTitle">
                <span>asdfasdf</span>
            </div>
            <div class="listContMain">
                <span>Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span>
            </div>
            <div class="timeStars">
                <div class="time">昨天 11:12</div>
                <div class="reward">
                <img src="../images/icon/shang.png" alt="">
                <span>10</span>
                </div>
                <div class="eval">
                <img src="../images/icon/eval.png" alt="">
                <span>90</span>
                </div>
                <div class="zan">
                <img src="../images/icon/admire.png" alt="">
                <span>10</span>
                </div>
            </div>
            </div>
        </li>
        </ul>
  </div>
</template>
<script>
export default {
  name: 'Evalmore',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.evalmore {
  font-size: 0;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  overflow: scroll;
  left: 0;
  background: #f4f6fa;
  .evaList {
    width: 100%;
    background: #fff;
    li {
      padding: 0.2rem 0.12rem .1rem 0.12rem;
      display: flex;
      .listImg {
        width: 0.35rem;
        height: 0.35rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.18rem;
        }
      }
      .listContent {
        flex: 1;
        color: #999;
        font-size: 0.13rem;
        height: 0.35rem;
        line-height: 0.35rem;
        margin: 0 0 0 0.11rem;
        padding: 0 0 0 0.1rem;
        box-sizing: border-box;
        border: 0.01rem solid #ddd;
        border-radius: 0.05rem;
      }
      .listContent1 {
        flex: 1;
        font-size: 0.13rem;
        margin: 0 0 0 .11rem;
        box-sizing: border-box;
        .listContTitle {
          color: #222;
          line-height: 0.18rem;
        }
        .listContMain {
          color: #222;
          line-height: 0.18rem;
          overflow: scroll;
        }
        .timeStars {
          color: #999;
          font-size: 0.13rem;
          width: 100%;
          line-height: 0.18rem;
          margin: 0.12rem 0 0 0;
          display: flex;
          .time {
            width: 0.3rem;
            vertical-align: middle;
          }
          .eval {
            width: 0.7rem;
            a {
              color: #999;
            }
            img {
              width: 0.16rem;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              width: 0.3rem;
              margin: 0 0 0 0.02rem;
              text-align: left;
              vertical-align: middle;
            }
          }
          .zan {
            width: 0.7rem;
            img {
              width: 0.16rem;
              vertical-align: middle;
            }
            span {
              display: inline-block;
              width: 0.4rem;
              margin: 0 0 0 0.02rem;
              text-align: right;
              vertical-align: middle;
            }
          }
          .time,
          .reward {
            flex: 1;
            img {
              width: 0.16rem;
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
        }
        .listEval{
          width: 100%;
          margin: .1rem 0 0 0;
          padding: .12rem .12rem .12rem .15rem;
          box-sizing: border-box;
          border-radius: .05rem;
          background: #f8f8f8;
          position: relative;
          .list{
            margin: 0 0 .1rem 0;
          }
          &:before{
            content: '';
            width: 0;
            height: 0;
            border-left: .06rem solid transparent;
            border-right: .06rem solid transparent;
            border-bottom: .06rem solid #f8f8f8;
            position: absolute;
            top: -.06rem;
            left: .12rem;
          }
          .evalMain{
            color: #999;
            font-size: .13rem;
            span{
              color: #222;
              margin: 0 .1rem 0 0;
            }
          }
          .timeZan{
            color: #999;
            font-size: .13rem;
            margin: .1rem 0 0 0;
            display: flex;
            img{
              width: .16rem;
              height: .16rem;
              vertical-align: middle;
            }
            span{
              vertical-align: middle;
              &.zanCount{
                width: .42rem;
                text-align: right;
              }
              &.zanTime{
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
