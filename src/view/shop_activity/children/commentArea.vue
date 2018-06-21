<template>
    <div>
        123{{msg}}
        <router-view/>
    </div>
</template>

<style>
    body {
        background-color: #ff0000;
    }
</style>

<script>
export default {
  name: 'commentArea',
  data () {
    return {msg: '这个是Home模板页'}
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
