<template>
  <div id="tel" :class="{fadeInUp: fadeInFlag, animatedTime: fadeInFlag, animatedTime: fadeOutFlag, fadeOutDown: fadeOutFlag}">
    <div class="telTip">
      <i></i><span>请先绑定手机号，便于领取优惠券和店员提供服务时进行验证</span>
    </div>
    <input class="tel" type="tel" placeholder="请输入您的手机号" v-model="telephone">
    <div class="verfiCode">
      <input type="number" placeholder="请输入手机验证码" v-model="verfyCode">
      <span v-if="phoneSure" @click="sendCodeFunc">发送验证码</span>
      <span v-else>{{ timeLeave }}s后重新发送</span>
    </div>
    <div class="commit" @click="commitFunc">
      <span>立即绑定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'telSure',
  data () {
    return {
      timeLeave: 60,
      timeInter: '',
      phoneSure: true,
      telephone: '',
      verfyCode: '',
      fadeInFlag: true,
      fadeOutFlag: false
    }
  },
  methods: {
    changeTime () {
      this.timeInter = setInterval(() => {
        if (this.timeLeave === 0) {
          this.phoneSure = true
          this.timeLeave = 60
          clearInterval(this.timeInter)
          return false
        }
        this.timeLeave--
      }, 1000)
    },
    commitFunc () {
      if (!this.telephone) {
        return this.$toast('请输入手机号', {
          durtaion: 200
        })
      }
      if (!this.verfyCode) {
        return this.$toast('请输入手机验证码', {
          durtaion: 200
        })
      }
      this.$http.bindPhone({
        'phone': this.telephone,
        'identifycode': this.verfyCode,
        'openid': window.localStorage.getItem('openId')
      }).then(res => {
        if (res.success) {
          this.$alert({
            title: ' ',
            content: res.msg
          }).then(() => {
            this.fadeInFlag = false
            setTimeout(() => {
              this.fadeOutFlag = true
            }, 0)
            setTimeout(() => {
              this.$emit('phoneChangeFunc')
            }, 500)
          })
        } else {
          this.$alert({
            title: ' ',
            content: res.msg
          })
        }
      })
    },
    sendCodeFunc () {
      if (!this.telephone) {
        return this.$toast('请输入手机号', {
          durtaion: 200
        })
      }
      if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.telephone))) {
        return this.$toast('手机号输入有误,请重新输入', {
          durtaion: 200
        })
      }
      this.$http.getIdentifyCode({
        data: JSON.stringify({
          'phone': this.telephone
        }),
        'openid': window.localStorage.getItem('openId')
      }).then(res => {
        if (res.code === 'E00000') {
          this.$toast('发送成功', {
            durtaion: 200
          })
          this.phoneSure = false
          this.changeTime()
        } else {
          this.$alert({
            title: ' ',
            content: res.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #tel{
    font-size: 0;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #fff;
    text-align: center;
    overflow: scroll;
    .telTip{
      color: #999;
      font-size: .13rem;
      width: 3.35rem;
      margin: .12rem auto .26rem;
      text-align: left;
      display: flex;
      i{
        display: inline-block;
        width: .2rem;
        height: .2rem;
        vertical-align: middle;
        background-image: url('../images/icon/light.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      span{
        line-height: .18rem;
        vertical-align: middle;
        margin: 0 0 0 .06rem;
      }
    }
    input{
      border: none;
      margin: 0;
      padding: 0 0 0 .1rem;
      width: 3.35rem;
      height: .45rem;
      box-sizing: border-box;
      -webkit-appearance: none;
      &.tel{
        color: #999;
        font-size: .15rem;
        margin: 0 0 .2rem;
        border-radius: 3px;
        border: 1px solid #ddd;
      }
    }
    .verfiCode{
      border: none;
      margin: 0;
      width: 3.35rem;
      height: .45rem;
      margin: 0 auto;
      position: relative;
      input{
        color: #999;
        font-size: .15rem;
        border-radius: 3px;
        border: 1px solid #ddd;
      }
      span{
        color: 222;
        font-size: .15rem;
        height: .45rem;
        line-height: .45rem;
        padding: 0 .1rem;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .commit{
      color: #222;
      font-size: .15rem;
      width: 3.35rem;
      height: .45rem;
      line-height: .45rem;
      border-radius: 3px;
      background: #ffda44;
      margin: .54rem auto 0;
      text-align: center;
    }
  }
</style>
