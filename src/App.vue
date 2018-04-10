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
  },
  computed: {
    ...mapState({
      LoginShow: state => state.Login.LoginState,
      LoadingShow: state => state.Loading.LoadingState
    })
  }
}
</script>

<style lang='less'>
@import 'assets/css/reset.less';
#app{
  width: 100%;
  height: 100%;
}
.boxOrent{
  // eslint-disable-next-line
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
</style>
