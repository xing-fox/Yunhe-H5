<template>
    <div class="msg_dialog" :style="{display:msgHide?'block':'none'}">
        <div :class="{msg_content:true,msg_hide:isHide}">{{ msg }}</div>
    </div>
</template>

<style>
    .msg_dialog{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 9999999;
    }
    .msg_content{
        position: absolute;
        display: inline-block;
        padding: .15rem .2rem;
        background-color: rgba(0,0,0,.6);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        font-size: .16rem;
        color: #fff;
        border-radius: .06rem;
    }
    .msg_content.msg_hide{
        animation: msg_hide .5s ease forwards;
        -webkit-animation: msg_hide .5s ease forwards;
    }
    @keyframes msg_hide {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    @-webkit-keyframes msg_hide {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>

<script>
export default {
  props: ['time', 'msg'],
  data () {
    return {
      /* msg: '这个是Home模板页', */
      isHide: false,
      msgHide: true
      /* time: 2000 */
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
  },
  beforeCreate: function () {
    /* 创建前状态 */
  },
  /* 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件 */
  created: function () {
    /* 创建完毕状态 */
    this.time = this.time || 2000
    let that = this
    let clearTime = setTimeout(function () {
      that.isHide = true
      clearTime = setTimeout(function () {
        clearTimeout(clearTime)
        that.msgHide = false
        that.isHide = false
        that.$emit('closeMsg')
      }, 500)
    }, that.time)
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
