<template>
  <div id="app">
    <Login v-if="LoginShow"></Login>
    <Loading v-if="LoadingShow"></Loading>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/login'
import Loading from '@/components/loading'
export default {
  name: 'App',
  components: {
    Login,
    Loading
  },
  created () {
    /**
     * 登录接口信息
     */
//  this.$http.Wxlogin({
//    code: this.getQueryString('code') || ''
//  }).then(res => {
//    console.log(res)
//    if (res.success) {
//      window.localStorage.setItem('openId', res.content.pub_openid)
//    }
//    window.localStorage.setItem('shareUrl', location.href.split('#')[0])
//  }).catch(err => {
//    console.log(err)
//  })
    	window.localStorage.setItem('openId', 'oGJVJ5HcsYHWnq-NGlxWE3jcKpRA')
	console.log(window.localStorage.getItem('openId'))

  },
  computed: {
    ...mapState({
      LoginShow: state => state.Login.LoginState,
      LoadingShow: state => state.Loading.LoadingState
    })
  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<style lang='less'>
@import 'assets/css/reset.less';
#app{
  width: 100%;
  height: 100%;
}
a:hover{
  background: none;
}
.boxOrent{
  // eslint-disable-next-line
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
</style>
