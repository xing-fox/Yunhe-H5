<template>
  <div>
    <div>
      <div class="shop-activity-interact" v-if="note || comment" @scroll="scrollFunc" ref="shopBox">
         <div class="shop-activity-arrow-title shop-activity-borderline">
           <svg class="icon icon-hudongqu" aria-hidden="true">
             <use xlink:href="#icon-hudongqu"></use>
           </svg>
           <span class="arrow-text">互动区</span>
         </div>
        <template v-if="note && note.length">
          <noteItem v-for="( item, index ) in note" :dataItem="item" v-on:zanClick="zanClick(index,'note')" :key="index"></noteItem>
        </template>
        <template v-if="comment && comment.length>0">
          <commentItem v-for="( item, index ) in comment" :dataItem="item" v-on:zanClick="zanClick(index,'comment')" :key="index"></commentItem>
        </template>
      </div>
      <writeArea :parameterId="actionId" v-on:writeSubmit="writeSubmit(arguments)" v-if="writeAreaOpen"></writeArea>
      <div class="shop-activity-footer-operate yht_table">
        <span class="yht_td" @click="writeAreaOpen = true">我要留言</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style scoped lang="less">
body {
  .shop-activity-interact {
    margin-bottom: 0.8rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    overflow: scroll;
  }
  .shop-activity-arrow-title {
    height: 0.45rem;
    line-height: 0.45rem;
    font-size: 0.15rem;
  }
  .shop-activity-arrow-title .arrow-text {
    font-weight: 600;
  }
  .shop-activity-footer-operate {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 0.5rem;
    background-color: #fff;
    width: 100%;
  }
  .shop-activity-footer-operate .yht_td {
    width: 100%;
    vertical-align: middle;
    text-align: center;
    font-size: 0.16rem;
    color: #333;
    background: #ffda44;
  }
}
</style>

<script>
import commentItem from "../components/comment_item";
import noteItem from "../components/note_item";
import writeArea from "../components/writeArea";
import msg from "../../../components/msg";

export default {
  name: "commentArea",
  components: {
    commentItem,
    noteItem,
    writeArea,
    msg
  },
  data() {
    return {
      actionId: "",
      writeAreaOpen: false,
      comment: [],
      note: [],
      pageNub: 1,
      noMoreComments: false
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
              parameter_id: that[type][index][type + "_id"]
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              let flag = parseInt(that[type][index][type + "_like_flag"]);
              that[type][index][type + "_like_flag"] = -flag;
              that[type][index][type + "_like_total"] =
                parseInt(that[type][index][type + "_like_total"]) + flag * 1;
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
              comment_id: that[type][index][type + "_id"],
              type: that[type][index][type + "_like_flag"]
            })
          })
          .then(res => {
            if (res.success && res.code === "E00000") {
              let flag = parseInt(that[type][index][type + "_like_flag"]);
              that[type][index][type + "_like_flag"] = -flag;
              that[type][index][type + "_like_total"] =
                parseInt(that[type][index][type + "_like_total"]) + flag * 1;
            }
          });
      }
    },

    /* 评论提交后的事件 */
    writeSubmit(data) {
      this.writeAreaOpen = false;
      this.pageNub = 1;
      this.noMoreComments = false;
      if (data[0]) {
        this.init();
      }
    },
    /* 加载评论数据 */
    init() {
      let that = this;
      /* 刷新评论数据 */
      that.$http
        .ShopActionDetailNoteComment({
          openid:
            window.localStorage.getItem("openId") ||
            window.sessionStorage.getItem("openId"),
          data: JSON.stringify({
            note_pag_no: that.pageNub,
            note_pag_num: 5,
            pag_no: that.pageNub,
            pag_num: 5,
            action_id: that.actionId
          })
        })
        .then(res => {
          if (res.success && res.code === "E00000") {
            if (res.content.comment.length > 0 || res.content.note.length > 0) {
              that.comment = that.comment.concat(res.content.comment)
              that.note = that.note.concat(res.content.note)
              that.noMoreComments = false
            } else {
              that.noMoreComments = true
            }
          }
        });
    },
    scrollFunc() {
      console.log("滑动");
      if (
        this.$refs.shopBox.scrollTop + document.body.clientHeight + 50 >
          this.$refs.shopBox.scrollHeight &&
        !this.noMoreComments
      ) {
        this.noMoreComments = true
        this.pageNub++
        this.init()
        console.log("滑动到底")
      }
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
    this.pageNub = 1;
    this.noMoreComments = false;
    this.init();
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