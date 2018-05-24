<template>
     <div>
    <div class='evalmore' @scroll.stop.prevent="scrollFunc" ref="rewardBox">
      <div>
        <ul class="evaList">
          <li class="">
            <div class="listContent1">
              <div class="listEval" >
                <div class="list">
                  <div class="evalMain">
                    <ul>
                     <span>{{ answer }}</span>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Chatdetail',
  data () {
    return {
      answer: this.$route.query.answer
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {}
  }
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
  left: 0;
  background: #f3f5f9;
  overflow: scroll;
  .evaList{
    width: 100%;
    margin: .1rem 0 0 0;
    li{
      padding: .1rem .12rem .1rem 0;
      margin: 0 0 0 .12rem;
      display: flex;
      .listContent1{
        flex: 1;
        font-size: .13rem;
        margin: 0 0 0 .11rem;
        box-sizing: border-box;
        .listContTitle{
          color: #222;
          line-height: .18rem;
        }
        .listContMain{
          color: #222;
          line-height: .18rem;
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
        }
        .listEval{
          width: 80%;
          margin: .1rem 0 0 0;
          padding: .12rem .12rem .12rem .15rem;
          box-sizing: border-box;
          border-radius: .05rem;
          background: #f8f8f8;
          position: relative;
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
          .listSeeMore{
            color: #4395f7;
            margin: .1rem 0 0 0;
          }
        }
      }
      &:nth-last-child(1):after{
        content: none;
      }
    }
  }
}
.nomoreData{
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  color: #333;
  font-size: .14rem;
  text-align: center;
  margin: 0 0 .5rem 0;
}
</style>
