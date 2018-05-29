<template>
  <div>
    <div class='evalmore' @scroll.stop.prevent="scrollFunc" ref="rewardBox">
      <div>
        <ul class="evaList">
          <li class="">
            <!--<div class="listImg">
              <img  alt="" src="../images/1.png">
            </div>-->
            <div class="listContent1">
              <div class="listEval" >
                <div class="list">
                  <div class="evalMain">
                    <ul>
                     <span>问题列表，点击选择查看问题答案！</span>
                      <li v-for="(item, index) in commentData" :key="index" >
                        <router-link :to="{path: 'chat/chatdetail', query:{'answer': index}}" >
                          问题{{ index+1 }} {{ item.question }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                 <div>
                    <span @click="queryallquestion(flag)">{{ message }}</span>
                </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--<div class="evaInput" ref="Input">
          <input type="text"  placeholder="">
          <span>发送</span>
        </div>-->
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Chat',
  data () {
    return {
      flag: true,
      message: '展开',
      commentData: [],
      allquestion: [],
      question: []
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      let that = this
      this.$http.talklist({
        data: JSON.stringify({
          'question': null
        })
      }).then(res => {
        if (res.success && res.content) {
          // 所有问题
          that.allquestion = res.content
          for (let i = 0; i <= 4; i++) {
            // 前五条问题
            that.commentData.push(res.content[i])
            that.question.push(res.content[i])
          }
        }
      })
    },
    queryallquestion (flag) {
      if (flag) {
        this.commentData = this.allquestion
        this.flag = false
        this.message = '收回'
      } else {
        this.commentData = this.question
        this.flag = true
        this.message = '展开'
      }
    },
    scrollFunc () {
      if (this.$refs.rewardBox.scrollTop + document.body.clientHeight + 50 > this.$refs.rewardBox.scrollHeight) {
      }
    }
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
    //background: #fff;
    li{
      padding: .1rem .12rem .1rem 0;
      margin: 0 0 0 .12rem;
      display: flex;
      .listImg{
        width: .35rem;
        height: .35rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: .18rem;
        }
      }
      .listContent{
        flex: 1;
        color: #999;
        font-size: .13rem;
        height: .35rem;
        line-height: .35rem;
        margin: 0 0 0 .11rem;
        padding: 0 0 0 .1rem;
        box-sizing: border-box;
        border: .01rem solid #ddd;
        border-radius: .05rem;
      }
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
        .timeStars{
          color: #999;
          font-size: .13rem;
          width: 100%;
          line-height: .18rem;
          margin: .12rem 0 0 0;
          display: flex;
          .time{
            vertical-align: middle;
          }
          .eval{
            width: .55rem;
            text-align: right;
            img{
              width: .15rem;
              vertical-align: middle;
            }
            span{
              display: inline-block;
              margin: 0 0 0 .02rem;
              text-align: left;
              vertical-align: middle;
            }
          }
          .zan{
            width: .55rem;
            text-align: right;
            img{
              width: .15rem;
              vertical-align: middle;
            }
            span{
              display: inline-block;
              margin: 0 0 0 .02rem;
              vertical-align: middle;
            }
          }
          .time,{
            flex: 1;
            span{
              vertical-align: middle;
            }
          }
          .reward{
            width: .5rem;
            margin-left: .05rem;
            img{
              width: .15rem;
              vertical-align: middle;
            }
            span{
              vertical-align: middle;
            }
          }
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
  .evaInput{
    font-size: 0;
    width: 100%;
    height: .45rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    input{
      -webkit-appearance: none;
      color: #666;
      font-size: .13rem;
      border: none;
      width: 2.9rem;
      height: .29rem;
      margin: .08rem 0 0 .15rem;
      padding: 0 0 0 .1rem;
      border: 1px solid #ddd;
      border-radius: .05rem;
      box-sizing: border-box;
    }
    span{
      color: #fff;
      font-size: .13rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      text-align: center;
      width: .45rem;
      height: .29rem;
      background: #ffda44;
      position: absolute;
      top: .08rem;
      right: .1rem;
      border-radius: .03rem;
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
