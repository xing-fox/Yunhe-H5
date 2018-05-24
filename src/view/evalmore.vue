<template>
  <div>
    <div class='evalmore' @scroll.stop.prevent="scrollFunc" ref="rewardBox">
      <div>
        <ul class="evaList">
          <li v-for="(item, index) in commentData" :key="index" class="bor-b">
            <div class="listImg">
              <img :src="item.customer_picture" alt="">
            </div>
            <div class="listContent1">
              <div class="listContTitle">
                <span>{{ item.customer_name }}</span>
              </div>
              <div class="listContMain boxOrent">
                <span>{{ item.comment_content }}</span>
              </div>
              <div class="timeStars">
                <div class="time">{{ item.created_at }}</div>
                <div v-if="item.is_reward == 1" class="reward">
                  <img src="../images/icon/shang.png" alt="">
                  <span>{{ item.reward_amount }}</span>
                </div>
                <div class="zan" @click="zanFunc(item.comment_id, item.customer_id, item.comment_like_flag, index)">
                  <img v-if="item.comment_like_flag == -1" src="../images/icon/admire_1.png" alt="">
                  <img v-else src="../images/icon/admire.png" alt="">
                  <span>{{ item.comment_like_total }}</span>
                </div>
              </div>
              <div class="listEval" v-if="item.reply_info">
                <div class="list">
                  <div class="evalMain">
                    <span>羊肉烤串:</span>如果以上这些效果不能满足你的需求，你可以仿照animate.css的格式制作一些其他效果
                  </div>
                  <div class="timeZan">
                    <span class="zanTime">08-12 08:32</span>
                    <img src="../images/icon/admire.png" alt="">
                    <span class="zanCount">12</span>
                  </div>
                  <div class="listSeeMore">
                    <span>查看剩下3条回复</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class='nomoreData' v-if='commentState'>
          小猿数据加载完啦
        </div>
        <div class="evaInput" ref="Input">
          <input type="text" v-model="commentMessage" @focus="inputFocusFunc" @blur="inputBlurFunc" placeholder="添加评论">
          <span @click="sendCommentFunc">发送</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  name: 'Evalmore',
  data () {
    return {
      pagNo: 1,
      pagNum: 15,
      commentData: [],
      commentState: false,
      commentFlag: false,
      commentMessage: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    scrollFunc () {
      if (this.$refs.rewardBox.scrollTop + document.body.clientHeight + 50 > this.$refs.rewardBox.scrollHeight && this.commentFlag) {
        this.pagNo++
        this.commentFlag = false
        this.init()
      }
    },
    init () {
      this.LoadingingStatus(true)
      this.$http.commentDetail({
        data: JSON.stringify({
          'note_id': this.$route.query.note_id,
          'pag_no': this.pagNo,
          'pag_num': this.pagNum
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        this.LoadingingStatus(false)
        for (let i = 0; i < response.content.commentinfo.length; i++) {
          response.content.commentinfo[i].comment_content = Base64.decode(response.content.commentinfo[i].comment_content)
        }
        this.commentData = this.commentData.concat(response.content.commentinfo)
        if (response.content.commentinfo.length < 15) {
          this.commentState = true
        }
        if (response.content.commentinfo.length === 15) {
          this.commentFlag = true
        }
      })
    },
    isAndroid () {
      let u = window.navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    },
    inputFocusFunc (e) {
      if (!this.isAndroid()) {
        setTimeout(() => {
          let scrollH = document.body.scrollHeight - 45
          this.$refs.Input.style.top = `${scrollH}px`
          this.$refs.Input.style.bottom = `null`
        }, 300)
      }
    },
    inputBlurFunc (e) {
      if (!this.isAndroid()) {
        this.$refs.Input.style.top = `null`
        this.$refs.Input.style.bottom = `0`
      }
    },
    zanFunc (arg1, arg2, arg3, arg4) {
      this.commentData[arg4].comment_like_flag = parseInt(arg3) === -1 ? 1 : -1
      this.commentData[arg4].comment_like_total = parseInt(arg3) === -1 ? parseInt(this.commentData[arg4].comment_like_total) - 1 : parseInt(this.commentData[arg4].comment_like_total) + 1
      this.$http.zanCommitNewNote({
        data: JSON.stringify({
          'customer_id': arg2,
          'comment_id': arg1,
          'focus_type': 5,
          'type': parseInt(arg3)
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        console.log(response.msg)
      })
    },
    sendCommentFunc () {
      let self = this
      if (this.commentMessage === '') {
        return self.$toast('您还未填写任何评论哦～', {
          durtaion: 500
        })
      }
      this.$http.publishcomment({
        data: JSON.stringify({
          'type': 1,
          'operate': Base64.encode(this.commentMessage),
          'parameter_id': this.$route.query.note_id
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        self.$toast(response.msg, {
          durtaion: 500
        })
        if (response.code === 'E00000') {
          self.pagNo = 1
          self.commentData = []
          self.commentFlag = false
          self.commentState = false
          self.commentMessage = ''
          self.init()
        }
      })
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
    background: #fff;
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
          width: 100%;
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
