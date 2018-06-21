<template>
    <div class="interact-list-item shop-activity-borderline">
        <div class="interact-list-item-hd">
            <i class="user-pic" :style="{backgroundImage: 'url('+dataItem.customer_picture+')'}"></i>{{ dataItem.customer_name }}
        </div>
        <div class="interact-list-item-bd">
            <p>{{ dataItem.comment_content }}</p>
        </div>
        <div class="interact-list-item-ft yht_table">
            <span class="yht_td">{{ dataItem.created_at }}</span>
            <!--<span class="yht_td yht_td_chat">
                            <svg class="icon icon-ico_chat" aria-hidden="true">
                             <use xlink:href="#icon-ico_chat"></use>
                            </svg>
                           <span class="num"><%=  _.numChange(iem.reply_total) %></span>
                        </span>-->
            <span class="yht_td yht_td_zan">
                <svg :class="dataItem.comment_like_flag == -1 && isAnimate?'icon icon-ico_zan active':'icon icon-ico_zan'" aria-hidden="true" v-on:click="$emit('zanClick')">
                  <use :xlink:href="dataItem.comment_like_flag == -1?'#icon-ico_zan':'#icon-zan'"></use>
                    <!--<use xlink:href="#icon-zan"></use>-->
                </svg>
                <span class="num">{{ numChange }}</span>
            </span>
        </div>
    </div>
</template>

<style>
    .yht_table{
        display: table;
    }
    .yht_td{
        display: table-cell;
    }
    .shop-activity-borderline{
        position: relative;
    }
    .shop-activity-borderline:after{
        position: absolute;
        bottom: 0;
        left: -.12rem;
        right: -.12rem;
        height: .01rem;
        background-color: #ddd;
        content: '';
    }
    svg.icon{
        width: .25rem;
        height: .25rem;
        vertical-align: -.06rem;
        fill: currentColor;
    }
    svg.icon.icon-ico_chat{
        width: .2rem;
        height: .2rem;
    }
    svg.icon.icon-ico_zan{
        width: .2rem;
        height: .19rem;
    }
    svg.icon.icon-ico_zan.active{
        animation: zan-up .8s ease;
        -webkit-animation: zan-up .8s ease;
    }
    @keyframes zan-up {
        0%{
            transform: scale(1) translateY(0);
            -webkit-transform: scale(1) translateY(0);
        }
        50%{
            transform: scale(1.5) translateY(-100%);
            -webkit-transform: scale(1.5) translateY(-100%);
        }
        100%{
            transform: scale(1) translateY(0);
            -webkit-transform: scale(1) translateY(0);
        }
    }
    .interact-list-item{
        width: 100%;
        padding: .15rem 0;
    }
    .interact-list-item-hd{
        width: 100%;
        font-size: .15rem;
        color: #222222;
        height: .4rem;
        line-height: .4rem;
        font-weight: 600;
    }
    .interact-list-item-hd .user-pic{
        width: .35rem;
        height: .35rem;
        margin-right: .11rem;
        display: inline-block;
        border-radius: 50%;
        float: left;
        position: relative;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }
    .interact-list-item-hd .user-pic .icon-jiav{
        position: absolute;
        bottom: -.06rem;
        right: -.06rem;
    }

    .interact-list-item-bd{
        width: 100%;
    }
    .interact-list-item-bd h4{
        font-size: .16rem;
        color: #222222;
        font-weight: 600;
        line-height: 1.8;
        width: 100%;
        word-wrap: break-word;
    }
    .interact-list-item-bd p{
        font-size: .14rem;
        color: #666666;
        letter-spacing: .005rem;
        width: 100%;
        word-wrap: break-word;
    }
    .interact-list-item-ft{
        width: 100%;
        padding: .05rem 0;
        font-size: .12rem;
        color: #999999;
    }
    .interact-list-item-ft .yht_td_zan{
        text-align: right;
        width: .8rem;
        font-size: .16rem;
        color: #222222;
    }
    .interact-list-item-ft .yht_td_chat{
        text-align: right;
        font-size: .16rem;
        color: #222222;
    }
    .interact-list-item-ft .icon{
        margin-bottom: .03rem;
    }
</style>

<script>
export default {
  props: ['dataItem', ''],
  data () {
    return {
      isAnimate: false
      /* dataItem: {
        'customer_picture': 'http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
        'customer_name': '123',
        'comment_content': '123456',
        'created_at': '时间',
        'comment_like_flag': '-1',
        'comment_id': '23',
        'comment_like_total': '100'
      } */
    }
  },
  computed: {
    /* 实现某一属性的实时计算 */
    numChange () {
      let num = this.dataItem.comment_like_total
      num = parseInt(num)
      if (num >= 1000 && num < 10000) {
        num = Math.round((num / 1000) * 100) / 100 + 'k'
      } else if (num >= 10000) {
        num = Math.round((num / 10000) * 100) / 100 + 'w'
      }
      return num
    }
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
    this.dataItem = this.props.dataItem
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
    this.isAnimate = true
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
