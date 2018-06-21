<template>
    <div>
        <div class="activity_comment_area-mask" :style="{display: isClose?'block':'none'}"></div>
        <div :class="{activity_comment_area: true, c_show: isClose,c_hide: !isClose}">
            <h2 class="activity_comment_area-title">
                留言区
                <i class="icon iconfont icon-close" @click="closeModel(false)"></i>
            </h2>
            <textarea name="" cols="30" rows="10" placeholder="请输入留言内容" @input="textCheck($event)" :value="textAreaContent"></textarea>
            <div class="activity_comment_area-footer">
                <span :class="{ btn: true, disabled:isDisabled }" @click="formSubmit()">发表</span>
            </div>
        </div>
        <msg :msg="msgContent" v-if="msgHide" v-on:closeMsg="closeMsg()"></msg>
    </div>
</template>

<style>
    /*组件的使用
    *@writeSubmit 提交表单后的执行事件
    *@parameterId 要留言的id值
    */
    /*留言区页面*/
    .activity_comment_area-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        z-index: 888;
    }
    .activity_comment_area.c_show{
        animation: comment-show .4s ease forwards;
    }
    .activity_comment_area.c_hide{
        animation: comment-hide .4s ease forwards;
    }
    @keyframes comment-show{
        0%{
            transform: translateY(100%);
        }
        100%{
            transform: translateY(0);
            box-shadow: .04rem -.04rem .2rem .01rem #ccc;
        }
    }
    @keyframes -webkit-comment-show{
        0%{
            transform: translateY(100%);
        }
        100%{
            transform: translateY(0);
            box-shadow: .04rem -.04rem .2rem .01rem #ccc;
        }
    }
    @keyframes comment-hide{
        0%{
            transform: translateY(0);
        }
        100%{
            transform: translateY(100%);
            box-shadow: none;
        }
    }
    @keyframes -webkit-comment-hide{
        0%{
            transform: translateY(0);
        }
        100%{
            transform: translateY(100%);
            box-shadow: none;
        }
    }
    .activity_comment_area{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2.1094rem;
        padding: .0938rem .1875rem;
        box-sizing: border-box;
        z-index: 9999;
        background-color: #fff;
        transform: translateY(100%);
        -webkit-transform: translateY(100%);
    }
    .activity_comment_area textarea{
        width: 100%;
        height: 1.0547rem;
        border: .01rem solid #ddd;
        outline: none;
        resize: none;
        border-radius: .04rem;
        box-sizing: border-box;
        padding: .04rem;
        color: #999;
        -webkit-appearance: none;
        appearance: none;
        font-size: 0.14rem;
    }
    .activity_comment_area textarea::placeholder{
        color: #999;
    }
    .activity_comment_area-title{
        text-align: center;
        font-size: .16rem;
        margin-bottom: .08rem;
    }
    .activity_comment_area-title .icon-close{
        color: #999;
        float: right;
    }
    .activity_comment_area-footer{
        text-align: center;
        margin-top: -.15rem;
    }
    .activity_comment_area-footer .btn{
        display: block;
        width: 100%;
        height: .4219rem;
        line-height: .4219rem;
        background-color: #FFDA44;
        color: #333;
        border-radius: .02rem;
        font-size: .16rem;
    }
    .activity_comment_area-footer .btn.disabled{
        background-color: #ccc;
    }
</style>

<script>
import msg from '../../../components/msg'
export default {
  props: ['parameterId'],
  components: {
    msg
  },
  data () {
    return {
      msgContent: '',
      isDisabled: true,
      textAreaContent: '',
      isClose: true,
      /* parameterId: '', */
      msgHide: false
    }
  },
  computed: {
    /* 实现某一属性的实时计算 */
  },
  watched: {
    /* 检测某一属性值的变化 */
  },
  methods: {
    /* 组件内部的方法 */
    /* 检测内容是否为空 */
    textCheck (e) {
      let val = e.target.value
      this.textAreaContent = val
      if (val) {
        this.isDisabled = false
      } else {
        this.isDisabled = false
      }
    },
    /* 关闭弹框 */
    closeModel (flag) {
      let that = this
      that.isClose = false
      let clearTime = setTimeout(function () {
        clearTimeout(clearTime)
        that.$emit('writeSubmit', flag)
      }, 400)
    },
    /* 表单提交 */
    formSubmit () {
      let that = this
      that.$http.commentShopAction({
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId'),
        data: JSON.stringify({
          'operate': that.textAreaContent,
          'parameter_id': that.parameterId,
          'type': 5
        })
      }).then(res => {
        if (res.success && res.code === 'E00000') {
          that.closeModel(true)
          that.msgContent = '发表留言成功'
          that.msgHide = true
        } else {
          that.closeModel(false)
          that.msgContent = '发表留言失败'
          that.msgHide = true
        }
      })
    },
    /* 关闭msg弹框 */
    closeMsg () {
      this.msgHide = false
    }
  },
  beforeCreate: function () {
    /* 创建前状态 */
  },
  /* 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件 */
  created: function () {
    /* 创建完毕状态 */
    this.parameterId = this.props.parameterId
  },
  /**
   * 2.在created和beforeMount之间，判断是否有el选项，若有则继续编译，无，则暂停生命周期；
   * 然后程序会判断是否有templete参数选项，若有，则将其作为模板编译成render函数。若无，则将外部html作为模板编译（template优先级比外部html高）*
   * */
  beforeMount: function () {
    /* 载入前状态 */
  },
  /**
   * 3.在beforeMount和mounted之间，程序将上一步编辑好的html内容替换el属性指向的dom对象或者选择权对应的html标签里面的内容
   *
   * */
  mounted: function () {
    /* 载入后状态 */
  },
  /**
   * 4.mounted和beforeUpdate之间，程序实时监控数据变化
   *
   * */
  beforeUpdate: function () {
    /* 更新前状态 */
  },
  /**
   * 5.beforeUpdate和updated之间，实时更新dom
   *
   * */
  updated: function () {
    /* 更新后状态 */
  },
  beforeDestroy: function () {
    /* 销毁前状态 */
  },
  /**
   * 6.实例销毁
   *
   * */
  destroyed: function () {
    /* 销毁后状态 */
  }
}
</script>
