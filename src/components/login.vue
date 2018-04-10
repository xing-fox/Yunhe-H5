<template>
  <div class="login">
    <div class="content animated fadeInUp">
      <div class="closed" @click="closeFunc"></div>
      <div class="contTitle">
        <span>超级店猿</span>
      </div>
      <div class="contMain">
        <div class="input">
          <input type="text" placeholder="请输入您的手机号码">
        </div>
        <div class="input">
          <input type="Number" placeholder="请输入手机验证码">
          <span class='inputVerify' @click="verifyFunc">{{ verifyText }}<span v-if="verifySecond">s</span></span>
        </div>
      </div>
      <div class="contLogin">
          <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      verifyText: '发送验证码',
      verifySecond: false,
      setInt: ''
    }
  },
  methods: {
    ...mapActions([
      'LoginingStatus'
    ]),
    closeFunc () {
      this.LoginingStatus(true)
    },
    verifyFunc () {
      this.verifyText = 60
      this.verifySecond = !this.verifySecond
      this.setInterFunc()
    },
    setInterFunc () {
      this.setInt = setInterval(() => {
        this.verifyText--
        if (this.verifyText === 0) {
          this.verifySecond = !this.verifySecond
          this.verifyText = '发送验证码'
          clearInterval(this.setInt)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    font-size: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    .content{
        width: 100%;
        padding: .15rem 0;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        .closed{
            width: .16rem;
            height: .16rem;
            position: absolute;
            top: .1rem;
            right: .1rem;
            background-image: url('../images/icon/close.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .contTitle{
            color: #222;
            font-size: .16rem;
            width: 100%;
            text-align: center;
        }
        .contMain{
            margin: .17rem .2rem 0 .2rem;
            padding: 0;
            .input{
                width: 100%;
                position: relative;
                input{
                    border: none;
                    font-size: .14rem;
                    width: 100%;
                    height: .45rem;
                    padding: 0 0 0 .1rem;
                    margin: 0 0 .1rem 0;
                    box-sizing: border-box;
                    border: .01rem solid #ddd;
                    border-radius: .05rem;
                }
                .inputVerify{
                    color: #222;
                    font-size: .14rem;
                    line-height: .45rem;
                    position: absolute;
                    top: 0;
                    right: .1rem;
                }
            }
        }
        .contLogin{
            color: #222;
            font-size: .16rem;
            letter-spacing: .05rem;
            height: .45rem;
            line-height: .45rem;
            text-align: center;
            margin: .1rem .2rem .2rem .2rem;
            background: #ffda44;
            border-radius: .05rem;
        }
    }
}
</style>
