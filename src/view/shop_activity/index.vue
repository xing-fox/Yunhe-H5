<template>
    <div style="position: relative width: 100%;height: 100%;">
        <div class="app">
            <div class="shop-activity-banner" :style="{backgroundImage: !content.action.action_video?'url('+content.action.action_picture+')':'none'}">
                <template v-if="content.action.action_video">
                    <div class='video-mask-img' :style="{backgroundImage: 'url('+content.action.action_picture+')'}" v-show="!isPlay"></div>
                    <i class="video-ico-play" @click="videoBtnPlay()" v-show="!isPlay"></i>
                    <video preload="none"
                        id="videoPlay"
                        class="shop-video"
                        :src="content.action.action_video"
                        playsinline @play="videoPlay()"
                        @pause="videoPause()"
                        :controls="isPlay"
                    ></video>
                </template>
            </div>
            <div class="shop-activity-section shop-activity-interact">
                <div class="shop-activity-abstract yht_table">
                    <div class="shop-activity-abstract-left yht_td">
                        <h4 class="shop-activity-title">{{ content.action.action_title }}</h4>
                        <p class="shop-activity-join-total"><span class="join-total">{{ content.action.join_total_f }}</span>人已参加</p>
                    </div>
                    <div class="shop-activity-abstract-right yht_td " @click="goJoin()">
                        <i :class="{'icon iconfont icon-ico_success':true,activeNoAnimate: content.action.action_join_flag == -1}">
                            <div class="join-text" v-if="content.action.action_join_flag == -1">我已参加</div>
                            <div class="join-text" v-else>我要参加</div>
                        </i>
                    </div>
                </div>
                <!--优惠劵部分-->
                <template v-if="content.coupon && content.coupon.length>0">
                    <div :class="{'shop-activity-coupon yht_table':true,late: content.action.action_coupon_flag == -1}">
                        <div class="shop-activity-coupon-left yht_td">
                            <div class="shop-activity-coupon-useLimit">
                                <div class="shop-activity-coupon-price">￥<span>{{ content.coupon[0].serve_amount }}</span></div>
                                <div class="shop-activity-coupon-term">
                                    <p> {{ content.coupon[0].remarks }} </p>
                                    <p>满{{ content.coupon[0].coupon_amount }}元可用</p>
                                </div>
                            </div>
                            <div class="shop-activity-coupon-useTime">有效期：{{ content.coupon[0].effective_date }} 至 {{ content.coupon[0].expire_date }}</div>
                        </div>
                        <div class="shop-activity-coupon-right yht_td">
                            <span class="shop-activity-coupon-receive">
                                <span v-if="content.action.action_coupon_flag == 1" @click="getCoupon()">立即<br/>领取</span>
                                <span v-else>已领取</span>
                            </span>
                        </div>
                    </div>
                </template>

                <!--门店活动部分-->
                <template>
                    <div class="shop-activity-section shop-activity-store">
                    <template v-if="content.shop && content.shop.length>0">
                        <div class="shop-activity-arrow-title shop-activity-borderline">
                            <svg class="icon icon-mendianhuodong" aria-hidden="true">
                                <use xlink:href="#icon-mendianhuodong"></use>
                            </svg>
                            <span class="arrow-text">活动门店</span>
                            <router-link :to="{ path:'/wechat_pub/bystore'}">
                                <i class="arrow fr" data-href="/wechat_pub/bystore">全部&gt;</i>
                            </router-link>
                        </div>
                        <div class="shop-activity-store-info shop-activity-borderline">
                            <div class="shop-activity-store-info-hd yht_table">
                                <div class="shopName yht_td">{{ content.shop[0].shop_name }}</div>
                                <!-- <div class="shopChat yht_td">
                                    <svg class="icon icon-ico_chat" aria-hidden="true">
                                        <use xlink:href="#icon-ico_chat"></use>
                                    </svg>
                                    微聊
                                </div>-->
                                <div class="shopTel yht_td">
                                    <a :href="'tel:'+content.shop[0].shop_mobile">
                                        <svg class="icon icon-ico_iphone" aria-hidden="true">
                                            <use xlink:href="#icon-ico_iphone"></use>
                                        </svg>
                                        电话
                                    </a>
                                </div>
                            </div>
                            <p class="shop-activity-store-info-addr">
                                <i class="icon iconfont icon-ico_site">{{ content.shop[0].shop_address }}</i>
                            </p>
                            <p class="shop-activity-store-info-time">
                                <i class="icon iconfont icon-ico_time">周一~周日 {{ content.shop[0].work_time }}~{{ content.shop[0].endwork_time }}</i>
                            </p>
                        </div>
                    </template>
                        <!--商品信息-->
                        <div class="shop-activity-goodsInfo">
                            <p class="shop-activity-goodsInfo-content">
                                &#12288;&#12288;{{ content.action.action_content }}                    </p>
                            <div class="shop-activity-goodsInfo-pic">
                                <img v-for="(item,index) in content.action.picturePOList" src="item.picture_url" alt="" :key="index">
                            </div>
                            <!--限时购商品-->
                            <div class="shop-activity-limitedGood" v-if="content.goods && content.goods.length >0">
                                <template>
                                    <div class="yht_table" v-for="(item,index) in content.goods" :key="index">
                                        <div class="yht_td yht_td_hd" :style="{backgroundImage: 'url('+item.picture_url+')'}"></div>
                                        <div class="yht_td yht_td_bd">
                                            <p class="info">{{ item.product_name }}</p>
                                            <p class="price">¥{{ item.product_price }}</p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <!--互动区-->
                <div class="shop-activity-interact" v-if="content.note || content.comment">
                    
                    <div class="shop-activity-arrow-title shop-activity-borderline">
                        <svg class="icon icon-hudongqu" aria-hidden="true">
                            <use xlink:href="#icon-hudongqu"></use>
                        </svg>
                        <span class="arrow-text">互动区</span>
                        <router-link :to="{ path:'shopActivity/commentArea'}">
                        <i class="arrow fr" >全部&gt;</i>
                        </router-link>
                    </div>
                    
                    <template v-if="content.note && content.note.length">
                        <noteItem v-for="( item, index ) in content.note" :dataItem="item" v-on:zanClick="zanClick(index,'note')" :key="index" ></noteItem>
                    </template>
                    <template v-if="content.comment && content.comment.length>0">
                        <commentItem v-for="( item, index ) in content.comment" :dataItem="item" v-on:zanClick="zanClick(index,'comment')" :key="index"></commentItem>
                    </template>
                </div>
                <writeArea :parameterId="actionId" v-on:writeSubmit="writeSubmit(arguments)" v-if="writeAreaOpen"></writeArea>
                <div class="shop-activity-footer">
                    <p>参与活动互动留言</p>
                    <p>超级店猿积分+20，抽大奖，赢好礼！</p>
                </div>
                <div class="shop-activity-footer-operate yht_table">
                <span class="yht_td btn-join js_join">
                    <i :class="{icon:true, iconfont: true, 'icon-ico_success': true, active: content.action.action_join_flag == -1}" @click="goJoin()"></i>
                    我
                    <span v-if="content.action.action_join_flag == -1">已</span>
                    <span v-else>要</span>
                    参加
                </span>
                    <span class="yht_td btn-chat" @click="writeAreaOpen = true">我要留言</span>
                </div>
            </div>
            <div class="shop-activity-footer-empty"></div>
            <!--优惠劵领取弹出层-->
            <template v-if="content.coupon && content.coupon.length>0 && getCouponMsg">
                <div class="getCoupon-dialog-mask"></div>
                <div class="getCoupon-dialog">
                    <h2 class="getCoupon-dialog-title">优惠劵已领取
                        <i class="icon iconfont icon-close" @click="getCouponMsg = false"></i>
                    </h2>
                    <div class="getCoupon-dialog-body yht_table">
                        <div class="yht_td price">￥{{ content.coupon[0].serve_amount }}</div>
                        <div class="yht_td price_needs">优惠劵<br/>满{{ content.coupon[0].coupon_amount }}元可用</div>
                    </div>
                </div>
            </template>
            <!--信息提示弹出框-->
            <msg :msg="msgContent" v-if="msgHide" v-on:closeMsg="closeMsg()"></msg>
        </div>
        <router-view/>
    </div>
</template>

<script>
import commentItem from "./components/comment_item";
import noteItem from "./components/note_item";
import writeArea from "./components/writeArea";
import msg from "../../components/msg";

export default {
  name: "shopActivity",
  components: {
    commentItem,
    noteItem,
    writeArea,
    msg
  },
  data() {
    return {
      _dom: "",
      isPlay: false,
      actionId: "",
      writeAreaOpen: false,
      content: {},
      msgContent: "",
      msgHide: false,
      getCouponMsg: false
    };
  },
  computed: {
    /* 实现某一属性的实时计算 */
  },
  watched: {
    /* 检测某一属性值的变化 */
  },
  methods: {
    /* 组件内部的方法 */
    /* 关闭msg弹框 */
    closeMsg() {
      this.msgHide = false;
    },
    /* 点赞事件 */
    zanClick(index, type) {
      let that = this;
      if (type === "note") {
        /* 笔记点赞 */
        that.$http
          .like({
            openid:
              window.localStorage.getItem("openId") ||
              window.sessionStorage.getItem("openId"),
            data: JSON.stringify({
              operate: 2,
              parameter_id: that.content[type][index][type + "_id"]
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              let flag = parseInt(
                that.content[type][index][type + "_like_flag"]
              );
              that.content[type][index][type + "_like_flag"] = -flag;
              that.content[type][index][type + "_like_total"] =
                parseInt(that.content[type][index][type + "_like_total"]) +
                flag * 1;
            }
          });
      } else {
        /* 评论点赞 */
        that.$http
          .commentlike({
            openid:
              window.localStorage.getItem("openId") ||
              window.sessionStorage.getItem("openId"),
            data: JSON.stringify({
              focus_type: 21,
              comment_id: that.content[type][index][type + "_id"],
              type: that.content[type][index][type + "_like_flag"]
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              let flag = parseInt(
                that.content[type][index][type + "_like_flag"]
              );
              that.content[type][index][type + "_like_flag"] = -flag;
              that.content[type][index][type + "_like_total"] =
                parseInt(that.content[type][index][type + "_like_total"]) +
                flag * 1;
            }
          });
      }
    },
    /* 评论提交后的事件 */
    writeSubmit(data) {
      this.writeAreaOpen = false;
      if (data[0]) {
        let that = this;
        /* 刷新评论数据 */
        that.$http
          .ShopActionDetailNoteComment({
            openid:
              window.localStorage.getItem("openId") ||
              window.sessionStorage.getItem("openId"),
            data: JSON.stringify({
              note_pag_no: 1,
              note_pag_num: 5,
              pag_no: 1,
              pag_num: 5,
              action_id: that.actionId
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              if (res.content.comment && res.content.comment.length > 0) {
                that.content.comment = res.content.comment;
              }
              if (res.content.note && res.content.note.length > 0) {
                that.content.note = res.content.note;
              }
            }
          });
      }
    },
    /* 点击我要参加活动事件 */
    goJoin() {
      if (this.content.action.action_join_flag === -1) {
        return false;
      } else {
        let that = this;
        that.$http
          .joinShopAction({
            openid:
              window.localStorage.getItem("openId") ||
              window.sessionStorage.getItem("openId"),
            data: JSON.stringify({
              action_id: that.actionId
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              that.content.action.action_join_flag = -1;
              that.content.action.join_total_f =
                parseInt(that.content.action.join_total_f) + 1;
              that.msgContent = "您已参加活动";
              that.msgHide = true;
            }
          });
      }
    },
    /* 领取优惠劵 */
    getCoupon() {
      let that = this;
      console.log("领取优惠券"+window.localStorage.getItem("openId"))
      that.$http
        .getShopActionCoupon({
          openid:
            window.localStorage.getItem("openId") ||
            window.sessionStorage.getItem("openId"),
          data: JSON.stringify({
            action_id: that.actionId,
            coupon_standard_id: that.content.coupon[0].coupon_id
          })
        })
        .then(res => {
          if (res.success && res.code === "E00000") {
            that.getCouponMsg = true;
          }else{
              that.msgContent = res.msg;
              that.msgHide = true;
          }
        });
    },
    /* 视频按钮点击播放 */
    videoBtnPlay() {
      this._dom = document.getElementById("videoPlay");
      this._dom.play();
    },
    /* 视频按钮停止播放触发事件 */
    videoPause() {
      this.isPlay = false;
    },
    /* 视频按钮播放时触发事件 */
    videoPlay() {
      this.isPlay = true;
    }
  },
  beforeCreate: function() {
    /* 创建前状态 */
  },
  /* 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件 */
  created: function() {
    /* 创建完毕状态 */
    this.actionId = this.$route.query.action_id;
    console.log(this.$route.query);
    let that = this;
    that.$http
      .ShopActionDetail({
        openid:
          window.localStorage.getItem("openId") ||
          window.sessionStorage.getItem("openId"),
        data: JSON.stringify({
          note_pag_no: 1,
          note_pag_num: 5,
          pag_no: 1,
          pag_num: 5,
          action_id: that.actionId
        })
      })
      .then(res => {
        if (res.success && res.code === "E00000") {
          that.content = res.content;
        }
      });
  },
  /**
   * 2.在created和beforeMount之间，判断是否有el选项，若有则继续编译，无，则暂停生命周期；
   * 然后程序会判断是否有templete参数选项，若有，则将其作为模板编译成render函数。若无，则将外部html作为模板编译（template优先级比外部html高）*
   * */
  beforeMount: function() {
    /* 载入前状态 */
  },
  /**
   * 3.在beforeMount和mounted之间，程序将上一步编辑好的html内容替换el属性指向的dom对象或者选择权对应的html标签里面的内容
   *
   * */
  mounted: function() {
    /* 载入后状态 */
  },
  /**
   * 4.mounted和beforeUpdate之间，程序实时监控数据变化
   *
   * */
  beforeUpdate: function() {
    /* 更新前状态 */
  },
  /**
   * 5.beforeUpdate和updated之间，实时更新dom
   *
   * */
  updated: function() {
    /* 更新后状态 */
  },
  beforeDestroy: function() {
    /* 销毁前状态 */
  },
  /**
   * 6.实例销毁
   *
   * */
  destroyed: function() {
    /* 销毁后状态 */
  }
};
</script>

<style scoped lang="less">
.yht_table {
  display: table;
  width: 100%;
}
.yht_td {
  display: table-cell;
}
.shop-activity-section {
  margin-bottom: 0.06rem;
  background-color: #fff;
  padding: 0 0.12rem 0.11rem;
  box-sizing: border-box;
}
.shop-activity-footer {
  padding: 0.2rem 0;
  background-color: #fff;
  margin-bottom: 0.06rem;
}
.shop-activity-footer p {
  font-size: 0.16rem;
  color: #222222;
  letter-spacing: 0.0057rem;
  text-align: center;
  line-height: 2;
}
.shop-activity-footer-operate {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 0.5rem;
  background-color: #fff;
}
.shop-activity-footer-operate .yht_td {
  width: 50%;
  vertical-align: middle;
  text-align: center;
  font-size: 0.16rem;
  color: #333333;
}
.shop-activity-footer-operate .btn-join {
  background-color: #fff;
}
.shop-activity-footer-operate .btn-join .icon {
  margin-right: 0.06rem;
  font-size: 0.2rem;
}
.shop-activity-footer-operate .btn-join .icon.active {
  color: #42a157;
}
.shop-activity-footer-operate .btn-chat {
  background: #ffda44;
}
.shop-activity-banner {
  width: 100%;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  position: relative;
  min-height: 1.875rem;
}
.shop-activity-banner .video-mask-img,
.shop-activity-banner .video-ico-play {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.shop-activity-banner .video-mask-img {
  background: none center center no-repeat;
  background-size: cover;
  z-index: 8;
}
.shop-activity-banner .video-ico-play {
  width: 0.5625rem;
  height: 0.5625rem;
  background: url(./img/btn_play@3x.png) center center no-repeat;
  background-size: cover;
  top: 50%;
  left: 50%;
  margin: -0.2813rem 0 0 -0.2813rem;
  z-index: 10;
}
.shop-activity-banner .shop-video {
  z-index: 1;
  min-height: 1.875rem;
  width: 100%;
}
.shop-activity-abstract {
  display: table;
  height: 0.48rem;
  width: 100%;
}
.shop-activity-abstract-left {
  vertical-align: top;
}
.shop-activity-abstract-right {
  vertical-align: middle;
  width: 1.17rem;
  text-align: right;
  position: relative;
}
.shop-activity-abstract-right .join-text {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.16rem;
  margin-left: 0.04rem;
  color: #333;
}
.shop-activity-abstract-right .icon-ico_success {
  font-size: 0.3rem;
  color: #ccc;
  position: absolute;
  top: 50%;
  left: 0.1875rem;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.shop-activity-abstract-right .icon-ico_success.activeNoAnimate {
  color: #42a157;
}
.shop-activity-abstract-right .icon-ico_success.active {
  color: #42a157;
  animation: join 0.5s ease both;
  -webkit-animation: join 0.5s ease both;
}
.shop-activity-title {
  font-size: 0.16rem;
  color: #222;
  margin-bottom: 0.06rem;
  text-align: left;
  font-weight: 600;
  padding-top: 0.0469rem;
}
.shop-activity-join-total {
  font-size: 0.14rem;
  color: #999;
}
.shop-activity-join-total .join-total {
  color: #222;
  background-color: #ffe062;
  padding: 0 0.1rem;
  border-radius: 0.06rem;
  font-weight: 600;
  margin-right: 0.05rem;
}
.shop-activity-container.placeholder .shop-activity-title {
  width: 100%;
  line-height: 2;
}
@keyframes join {
  0% {
    font-size: 0.3rem;
    color: #ccc;
  }
  50% {
    font-size: 0.4688rem;
    color: #42a157;
  }
  100% {
    font-size: 0.3rem;
    color: #42a157;
  }
}
@keyframes join {
  0% {
    font-size: 0.3rem;
    color: #ccc;
  }
  50% {
    font-size: 0.4688rem;
    color: #42a157;
  }
  100% {
    font-size: 0.3rem;
    color: #42a157;
  }
}
/* 优惠劵部分 */
.shop-activity-coupon {
  height: 1rem;
  width: 100%;
  position: relative;
  margin-top: 0.1497rem;
  background: url(./img/coupon.png) center center no-repeat;
  background-image: image-set(
    url(./img/coupon@1.5x.png) 1.5x,
    url(./img/coupon@2x.png) 2x,
    url(./img/coupon@3x.png) 3x
  );
  background-image: -webkit-image-set(
    url(./img/coupon@1.5x.png) 1.5x,
    url(./img/coupon@2x.png) 2x,
    url(./img/coupon@3x.png) 3x
  );
  background-size: contain;
}
.shop-activity-coupon.late {
  opacity: 0.5;
}
.shop-activity-coupon-left {
  padding: 0.1rem 0 0.1rem 0.24rem;
  box-sizing: border-box;
  color: #954f1c;
  width: 78%;
}
.shop-activity-coupon-useLimit {
  height: 73%;
  font-size: 0.12rem;
}
.shop-activity-coupon-price {
  display: inline-block;
  color: #e2330b;
  font-size: 0.18rem;
  margin-right: 0.17rem;
}
.shop-activity-coupon-term {
  display: inline-block;
  width: 1.3828rem;
}
.shop-activity-coupon-term p {
  width: 1.3828rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.13rem;
}
.shop-activity-coupon-price span {
  font-size: 0.4rem;
}
.shop-activity-coupon-useTime {
  text-align: left;
  font-size: 0.12rem;
}
.shop-activity-coupon-right {
  vertical-align: middle;
  position: relative;
}
.shop-activity-coupon-receive {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.13rem;
}
.shop-activity-arrow-title {
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.15rem;
}
.shop-activity-borderline {
  position: relative;
}
.shop-activity-borderline:after {
  position: absolute;
  bottom: 0;
  left: -0.12rem;
  right: -0.12rem;
  height: 0.01rem;
  background-color: #ddd;
  content: "";
}
.shop-activity-arrow-title .icon {
  width: 0.25rem;
  height: 0.25rem;
  vertical-align: -0.07rem;
  fill: currentColor;
}
.shop-activity-arrow-title .arrow-text {
  font-weight: 600;
}
.shop-activity-arrow-title .arrow {
  color: #999;
  font-size: 0.13rem;
  float: right;
  font-style: normal;
}
.shop-activity-store {
  padding: 0;
}
.shop-activity-store-info {
  padding: 0.15rem 0;
}
.shop-activity-store-info-hd .shopName {
  font-size: 0.16rem;
}
.shop-activity-store-info-addr,
.shop-activity-store-info-time {
  font-size: 0.14rem;
  color: #666;
  line-height: 1.8;
}
.shop-activity-store-info-addr i:before,
.shop-activity-store-info-time i:before {
  margin-right: 0.05rem;
}
.shop-activity-store-info-hd {
  padding: 0 0 0.04rem;
}
.shop-activity-store-info-hd .shopChat {
  text-align: right;
  font-size: 0.15rem;
}
.shop-activity-store-info-hd .shopTel {
  text-align: right;
  width: 0.8rem;
  font-size: 0.15rem;
}
.shop-activity-store-info-hd .shopTel a {
  color: #222;
}
.shop-activity-store-info-hd .shopTel svg.icon {
  width: 0.2rem;
  height: 0.2rem;
}
.shop-activity-goodsInfo-content {
  padding: 0.15rem 0;
  font-size: 0.15rem;
  color: #666;
  letter-spacing: 0.013rem;
  text-align: justify;
}
.shop-activity-goodsInfo-pic img {
  width: 100%;
}
.shop-activity-limitedGood .yht_table {
  padding: 0.1rem 0;
}
.shop-activity-limitedGood .yht_table:not(:nth-last-of-type(1)) {
  border-bottom: 0.01rem solid #f1f1f1;
}
.shop-activity-limitedGood .yht_td.yht_td_hd {
  width: 1.1rem;
  height: 1.1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border: 0.01rem solid #ddd;
  box-sizing: border-box;
}
.shop-activity-limitedGood .yht_td_bd {
  position: relative;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.shop-activity-limitedGood .yht_td_bd .info {
  font-size: 0.16rem;
  color: #222;
}
.shop-activity-limitedGood .yht_td_bd .price {
  position: absolute;
  left: 0.1rem;
  bottom: 0;
  font-size: 0.17rem;
  color: #ff2e2e;
}
.shop-activity-footer-empty {
  height: 0.5rem;
}
/*弹框样式*/
.getCoupon-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 988;
}
.getCoupon-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.0703rem;
  padding: 0.1875rem 0.1172rem;
  box-sizing: border-box;
  z-index: 999;
}
.getCoupon-dialog-title {
  text-align: center;
  font-size: 0.16rem;
  position: relative;
}
.getCoupon-dialog-title .icon-close {
  float: right;
  color: #ccc;
}
.getCoupon-dialog-body {
  width: 100%;
  border: 0.01rem solid #f0f0f0;
  border-radius: 0.0703rem;
  padding: 0.2344rem 0;
  margin-top: 0.1406rem;
}
.getCoupon-dialog-body .price {
  text-align: center;
  font-size: 0.28rem;
  vertical-align: middle;
  color: #e2330b;
}
.getCoupon-dialog-body .price_needs {
  vertical-align: middle;
  font-size: 0.14rem;
  color: #999;
}
</style>
