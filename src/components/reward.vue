<template>
  <div class='Reward'>
    <div class='content'>
      <div class="contTitle">
        <span>打赏</span>
        <div class="closed" @click="closeFunc"></div>
      </div>
      <div class="contInput">
        <input type="text" placeholder="自定义评语" v-model="rewardMessage">
        <span class="inputCommit" @click="rewardMesState = !rewardMesState"></span>
        <ul v-if="rewardMesState" class="rewardMes bor-1px">
          <li class="bor-b" v-for="(item, index) in rewardList" :key="index" @click.stop.prevent="rewardFunc(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="contCount">
        <span class="iconMiuns" @click="miunsFunc"></span>
        <span class="countNum">{{ count }}</span>
        <span class="iconAdd" @click="addFunc"></span>
      </div>
      <div class="contCommit">
        <span>打赏</span>
      </div>
      <div class="contfooter">
        <span>您剩余云币数量: {{ remaindCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reward',
  data () {
    return {
      count: 1,
      remaindCount: 10,
      rewardMessage: '',
      rewardMesState: false,
      rewardList: [
        '很喜欢，顶一个!',
        '感谢猿猿，如此走心!'
      ]
    }
  },
  created () {},
  methods: {
    closeFunc () {
      this.$emit('closed')
    },
    rewardFunc (arg) {
      this.rewardMessage = this.rewardList[arg]
      this.rewardMesState = false
    },
    addFunc () {
      this.count += 1
    },
    miunsFunc () {
      if (this.count === 0) return false
      this.count--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .Reward{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
    .content{
      font-size: 0;
      width: 2.75rem;
      height: 2.7rem;
      background: #fff;
      border-radius: .1rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
      .contTitle{
        color: #333;
        font-size: .16rem;
        line-height: .4rem;
        text-align: center;
        position: relative;
        .closed{
          width: .1rem;
          height: .1rem;
          position: absolute;
          top: .12rem;
          right: .1rem;
          background-image: url('../images/icon/close.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .contInput{
        margin: .15rem 0;
        padding: 0 .18rem;
        position: relative;
        input{
          border: none;
          color: #666;
          font-size: .14rem;
          width: 100%;
          height: .35rem;
          padding: 0 0 0 .1rem;
          border: .01rem solid #ddd;
          border-radius: .05rem;
          box-sizing: border-box;
        }
        .inputCommit{
          width: 0;
          height: 0;
          border-left: .08rem solid transparent;
          border-right: .08rem solid transparent;
          border-top: .1rem solid #ccc;
          position: absolute;
          top: .14rem;
          right: .25rem;
        }
        .rewardMes{
          display: inline-grid;
          background: #fff;
          border-radius: .05rem;
          box-sizing: border-box;
          position: absolute;
          bottom: -.65rem;
          left: .18rem;
          right: .18rem;
          li{
            color: #333;
            font-size: .14rem;
            line-height: .3rem;
            padding: 0 0 0 .1rem;
            border-bottom: .01rem solid #eee;
            &:last-child:before{
              display: none;
            }
          }
        }
      }
      .contCount{
        text-align: center;
        margin: .35rem 0;
        .iconMiuns{
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background-image: url('../images/icon/icon_minus.jpg');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .iconAdd{
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background-image: url('../images/icon/icon_add.jpg');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .countNum{
          color: #333;
          font-size: .2rem;
          margin: 0 .2rem;
          padding: .05rem .35rem;
          border-bottom: .01rem solid #ddd;
        }
      }
      .contCommit{
        color: #fff;
        font-size: .14rem;
        margin: .4rem .5rem .1rem;
        height: .42rem;
        line-height: .42rem;
        text-align: center;
        background: #eec144;
        border-radius: .22rem;
      }
      .contfooter{
        color: #999;
        font-size: .11rem;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
