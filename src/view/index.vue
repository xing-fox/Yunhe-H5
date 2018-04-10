<template>
  <div class='index'>
    <div class='indexContent' @scroll.stop.prevent="scrollFunc" ref="indexBox">
      <div id="header">
        <div class="manInfo">
          <img :src="hotData.customer_picture" alt="">
          <span>{{ hotData.customer_name }}</span>
        </div>
        <img class='hotImg' src="../images/icon/hot.png" alt="">
      </div>
      <div id="main">
        <ul v-if="hotData.notePictureMap">
          <li v-for="(item, index) in hotData.notePictureMap.notepicture" :key="index">
            <router-link :to="{ path: '/stroll/details', query:{'note_id': item.note_id}}">
              <img :src="item.picture_url" alt="">
            </router-link>
          </li>
        </ul>
        <div class='hotProduct'>
          <div class="proTitle">
            <span>{{ hotData.note_name }}</span>
          </div>
          <div class="proContent boxOrent">
            <span>{{ hotData.note_desc }}</span>
          </div>
        </div>
      </div>
      <div id="content">
        <ul class='contTop'>
          <li @click="NewDataFunc(true)">
            <span :class="{active: tableFlag}">最新的</span>
          </li>
          <li @click="LatestDataFunc(true)">
            <span :class="{active: !tableFlag}">附近的</span>
          </li>
        </ul>
        <div class='listTotal'>
          <!-- <img class='imgPoint' src="../images/icon/point.jpg" alt=""> -->
          <span v-if="listTotalNum">全部{{ listTotalNum }}篇笔记</span>
          <img class='imgRefresh' src="../images/icon/refresh.jpg" alt="">
        </div>
        <div class="options" v-if="listData">
          <WaterFall :list="listData"></WaterFall>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WaterFall from '@/components/Waterfall'
export default {
  name: 'index',
  data () {
    return {
      pagNo: 1,
      openId: '',
      tableFlag: true, // true,最近的 | false,附近的
      hotData: Object, // 逛逛hot部分
      listTotalNum: '', // 逛逛列表总数
      listData: [], // 列表数据,
      listDataState: false,
      listDataflag: false
    }
  },
  components: {
    WaterFall
  },
  created () {
    this.LoadingingStatus(true)
    let self = this
    self.$http.Wxlogin({
      code: this.$route.query.code || ''
    }).then(response => {
      /**
      * 调取微信地图定位信息
      */
      // self.bridge.getLocation(function (result) {
      //   alert(result)
      // }, function (res) {
      //   alert(res)
      // })
      self.openId = response.content.pub_openid
      window.localStorage.setItem('openId', response.content.pub_openid)
    }).then(() => {
      self.$http.HotNote({
        openid: self.openId
      }).then(response => {
        self.hotData = response.content
      })
      self.NewDataFunc(false) // 获取最新list数据
    })
  },
  mounted () {},
  methods: {
    ...mapActions([
      'LoginingStatus',
      'LoadingingStatus'
    ]),
    NewDataFunc (flag) {
      this.LoadingingStatus(true)
      if (flag && this.tableFlag) {
        return false
      }
      this.pagNo = this.tableFlag ? this.pagNo : 1
      this.listData = this.tableFlag ? this.listData : []
      this.tableFlag = true
      this.$http.NewNote({
        data: JSON.stringify({
          city_code: '',
          customer_id: '',
          pag_no: this.pagNo,
          pag_num: 8
        }),
        openid: this.openId
      }).then(response => {
        this.LoadingingStatus(false)
        response.content.noteinfo.map((item, index) => {
          let _len = item.picture_url.lastIndexOf('/') + 1
          item.picture_url = item.picture_url.substring(0, _len) + '2x_' + item.picture_url.slice(_len)
        })
        this.listData = this.listData.concat(response.content.noteinfo)
        this.listTotalNum = response.content.note_sum.note_sum
        this.listDataflag = false
        if (this.listData.length >= this.listTotalNum) {
          this.listDataState = true
        }
      })
    },
    LatestDataFunc (flag) {
      this.LoadingingStatus(true)
      if (flag && !this.tableFlag) {
        return false
      }
      this.pagNo = !this.tableFlag ? this.pagNo : 1
      this.listData = !this.tableFlag ? this.listData : []
      this.tableFlag = false
      this.$http.LateNote({
        data: JSON.stringify({
          city_code: '',
          customer_id: '',
          pag_no: this.pagNo,
          pag_num: 8
        }),
        openid: this.openId
      }).then(response => {
        this.LoadingingStatus(false)
        this.listData = this.listData.concat(response.content.noteinfo)
        this.listTotalNum = response.content.note_sum.note_sum
        this.listDataflag = false
        if (this.listData.length >= this.listTotalNum) {
          this.listDataState = true
        }
      })
    },
    scrollFunc () {
      if (this.$refs.indexBox.scrollTop + document.body.clientHeight + 50 > this.$refs.indexBox.scrollHeight && !this.listDataState && !this.listDataflag) {
        this.pagNo++
        this.listDataflag = true
        this.tableFlag ? this.NewDataFunc(false) : this.LatestDataFunc(false)
      }
    }
  },
  watch: {
    '$route' (to, from) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.index{
  width: 100%;
  height: 100%;
  .indexContent{
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f4f6fa;
  }
  #header{
    width: 100%;
    height: .52rem;
    background: #fff;
    position: relative;
    .hotImg{
      width: .42rem;
      position: absolute;
      top: 0;
      right: .12rem;
    }
    .manInfo{
      display: flex;
      height: .3rem;
      line-height: .3rem;
      padding: .1rem 0 0 .12rem;
      img{
        width: .3rem;
        height: .3rem;
        border-radius: .15rem;
        background: #999;
      }
      span{
        font-size: .13rem;
        margin: 0 0 0 .05rem;
      }
    }
  }
  #main{
    width: 100%;
    background: #fff;
    ul{
      width: 100%;
      font-size: 0;
      li{
        width: 33.3%;
        height: .9rem;
        &:nth-child(1){
          margin: 0 0 0 .12rem;
        }
        &:nth-child(2){
          margin: 0 .06rem;
        }
        &:nth-child(3){
          margin: 0 .12rem 0 0;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .hotProduct{
      padding: .14rem .13rem;
      .proTitle{
        color: #222;
        font-size: .15rem;
        line-height: .2rem;
        margin: 0 0 .06rem 0;
      }
      .proContent{
        display: box;
        display: -webkit-box;
        word-break: break-all;
        -webkit-text-overflow: ellipsis;
        text-overflow: ellipsis;
        // eslint-disable-next-line
        /*! autoprefixer: off */
        -webkit-line-clamp: 2;
        /* autoprefixer: on */
        overflow: hidden;
        color: #999;
        font-size: .12rem;
        line-height: .17rem;
      }
    }
  }
  #content{
    font-size: 0;
    width: 100%;
    background: #fff;
    margin: .06rem 0 0 0;
    .contTop{
      color: #999;
      font-size: .15rem;
      width: 100%;
      height: .42rem;
      line-height: .42rem;
      display: flex;
      li{
        flex: 1;
        height: 100%;
        text-align: center;
        span{
          height: 100%;
          padding: 0 .1rem;
          box-sizing: border-box;
          display: inline-block;
          &.active{
            color: #222;
            border-bottom: .04rem solid #ffda44;
          }
        }
      }
    }
    .listTotal{
      color: #999;
      font-size: .14rem;
      width: 100%;
      height: .42rem;
      line-height: .42rem;
      background: #f4f6fa;
      position: relative;
      .imgPoint{
        display: inline-block;
        width: .04rem;
        margin: 0 0 0 .08rem;
      }
      span{
        margin: 0 0 0 .1rem;
      }
      .imgRefresh{
        width: .16rem;
        position: absolute;
        top: .13rem;
        right: .1rem;
      }
    }
  }
  .options {
    width: 100%;
    background: #f4f6fa;
  }
}
</style>
