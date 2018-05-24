<template>
  <div class="index">
    <div v-wechat-title="$route.meta.title"></div>
    <!-- <div class="search">
    </div> -->
    <div class="cityName bor-b">
      <span>当前查看城市：<span class="city">嘉善</span></span>
    </div>
    <div class="indexBox" @scroll="scrollFunc" ref="shopBox">
      <ul>
        <li v-for="(item, index) in dataList" :key="index">
          <div class="list_store bor-b">
            <div class="storeImg">
              <img :src="item.shop_picture" alt="">
            </div>
            <div class="storeinfro">
              <div class="storeName">{{ item.shop_name }}</div>
              <div class="noteContent">
                <router-link v-if="item.note_id" :to="{ path: 'bystore/details', query:{'note_id': item.note_id}}">
                  <i></i><span>{{ item.note_name }}</span>
                  <div class="icon_right"></div>
                </router-link>
              </div>
              <div class="storeDis">
                <span>距您 {{ item.distance }}km</span>
              </div>
            </div>
          </div>
          <div class="list_infro">
            <div class="infrotimeaddr">
              <div class="addr">
                <i></i><span>{{ item.shop_address }}</span>
              </div>
              <div class="time">
                <i></i><span>周一至周日8:00-19:00</span>
              </div>
            </div>
            <a class="bor-l" :href='`tel:${ item.shop_mobile }`'></a>
          </div>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'nearbystore',
  data () {
    return {
      pagNo: 1,
      pagNum: 5,
      dataList: [],
      dataFlag: false
    }
  },
  created () {
    this.init()
    window.localStorage.setItem('shareUrl', location.href.split('#')[0])
  },
  methods: {
    init () {
      this.$http.NearByStore({
        data: JSON.stringify({
          'pag_no': this.pagNo,
          'pag_num': this.pagNum
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        for (let i = 0; i < res.content.shopinfo.length; i++) {
          res.content.shopinfo[i].note_name = Base64.decode(res.content.shopinfo[i].note_name)
          res.content.shopinfo[i].distance = (parseFloat(res.content.shopinfo[i].distance) / 1000).toFixed(2)
        }
        this.dataFlag = res.content.shopinfo.length === 5
        this.dataList = this.dataList.concat(res.content.shopinfo)
      })
    },
    scrollFunc () {
      if (this.$refs.shopBox.scrollTop + document.body.clientHeight + 50 > this.$refs.shopBox.scrollHeight && this.dataFlag) {
        this.dataFlag = false
        this.pagNo++
        this.init()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .index{
    width: 100%;
    height: 100%;
    .search{
      width: 100%;
      height: .55rem;
    }
    .cityName{
      color: #222;
      font-size: .14rem;
      height: .44rem;
      line-height: .44rem;
      padding: 0 0 0 .15rem;
      background: #fff;
      .city{
        font-weight: bold;
      }
    }
    .indexBox{
      width: 100%;
      // height: 100%;
      position: absolute;
      top: .44rem;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: scroll;
      background: #f3f5f9;
    }
    ul{
      width: 100%;
      font-size: 0;
      li{
        width: 100%;
        margin: 0 0 .06rem 0;
        background: #fff;
        .list_store{
          padding: .12rem;
          box-sizing: border-box;
          display: flex;
          .storeImg{
            width: 1.2rem;
            height: 1rem;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .storeinfro{
            flex: 1;
            margin: 0 0 0 .1rem;
            position: relative;
            .storeName{
              color: #222;
              font-size: .16rem;
              font-weight: bold;
              letter-spacing: .006rem;
            }
            .noteContent{
              margin: .1rem .2rem 0 0;
              position: relative;
              i{
                display: inline-block;
                width: .34rem;
                height: .16rem;
                margin: 0 .05rem 0 0;
                background-image: url('../images/icon/new.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
              }
              span{
                color: #222;
                font-size: .14rem;
                letter-spacing: .005rem;
                vertical-align: middle;
              }
              .icon_right{
                width: .14rem;
                height: .14rem;
                position: absolute;
                right: -.16rem;
                bottom: 0;
                top: 0;
                margin: auto auto;
                background-image: url('../images/icon/right.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                vertical-align: middle;
              }
            }
            .storeDis{
              color: #666;
              font-size: .13rem;
              letter-spacing: .005rem;
              position: absolute;
              left: 0;
              bottom: .03rem;
            }
          }
        }
        .list_infro{
          padding: .1rem 0 .1rem .1rem;
          box-sizing: border-box;
          display: flex;
          .infrotimeaddr{
            flex: 1;
            color: #666;
            font-size: .14rem;
            .addr{
              line-height: .2rem;
              margin: 0 0 .05rem 0;
              i{
                display: inline-block;
                width: .14rem;
                height: .14rem;
                background-image: url('../images/icon/addr.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center center;
                vertical-align: middle;
              }
              span{
                vertical-align: middle;
                margin: 0 0 0 .05rem;
              }
            }
            .time{
              height: .2rem;
              line-height: .2rem;
              i{
                display: inline-block;
                width: .14rem;
                height: .14rem;
                background-image: url('../images/icon/time.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center center;
                vertical-align: middle;
              }
              span{
                vertical-align: middle;
                margin: 0 0 0 .05rem;
              }
            }
          }
          a{
            display: inline-block;
            font-size: .2rem;
            width: .65rem;
            cursor: pointer;
            background-image: url('../images/icon/iphone.png');
            background-size: 40% auto;
            background-repeat: no-repeat;
            background-position: center center;
          }
        }
      }
    }
  }
</style>
