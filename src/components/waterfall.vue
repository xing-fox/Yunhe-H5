<template>
<div class="waterfall-wrap" ref="container">
    <template>
      <div v-for="(item, index) of list"
        :key="index"
        class="column-item">
        <router-link :to="{ path: '/stroll/details', query:{'note_id': item.note_id}}">
          <img :src="item.picture_url" alt="">
          <div class='item-title'>{{ item.note_name }}</div>
          <div class='item-content'>{{ item.note_desc }}</div>
          <div class='item-slef'>
            <img class='imgSelf' :src="item.customer_picture" alt="">
            <span class='selfName'>{{ item.customer_name }}</span>
            <img class='imgZan' src="../images/icon/admire.png" alt="">
            <span class='selfCount'>{{ item.note_like_total }}</span>
          </div>
        </router-link>
      </div>
    </template>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    column: {
      type: Number,
      default: 2
    },
    height: {
      type: Number,
      default: 800
    }
  },
  data () {
    return {
      itemWidth: 0,
      columnData: []
    }
  },
  watch: {
    list (val) {
      this.renderList()
      setTimeout(() => {
        this.renderList()
      }, 500)
    }
  },
  mounted () {
    this.renderList()
    setTimeout(() => {
      this.renderList()
    }, 500)
  },
  methods: {
    renderList () {
      if (!this.row) {
        this.columnData = []
        this.$nextTick(() => {
          const boxes = this.$refs.container.getElementsByClassName(
            'column-item'
          )
          for (let i = 0; i < boxes.length; i++) {
            this.setElementStyle(boxes[i], this.list[i], i)
          }
        })
      }
    },
    setElementStyle (element, img, index) {
      setTimeout(() => {
        if (index < this.column) {
          element.style.left = `${index * (100 / this.column)}%`
          element.style.top = `0px`
          this.$nextTick(() => {
            this.columnData[index] = this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
          })
        } else {
          if (this.columnData[0] < this.columnData[1]) {
            element.style.left = `0`
            element.style.top = `${this.columnData[0]}px`
            this.$nextTick(() => {
              this.columnData[0] += this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
            })
          } else {
            element.style.left = `${(100 / this.column)}%`
            element.style.top = `${this.columnData[1]}px`
            this.$nextTick(() => {
              this.columnData[1] += this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
            })
          }
        }
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.waterfall-wrap {
  margin: 0 .065rem;
  position: relative;
  .column-item {
    width: 1.74rem;
    position: absolute;
    margin: 0 .035rem;
    font-size: 0;
    background: #fff;
    border-radius: .05rem;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.3s ease;
    &:before{
      content: '';
      pointer-events: none;
      position: absolute;
      width: 200%;
      height: 200%;
      border: 1px solid #ddd;
      border-radius: .1rem;
      overflow: hidden;
      -webkit-transform-origin: 0 0;
      -moz-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      -o-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scale(0.5, 0.5);
      -ms-transform: scale(0.5, 0.5);
      -o-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    img {
      width: 100%;
    }
    .item-title{
      color: #222;
      font-size: .14rem;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: .11rem .02rem .05rem .08rem;
    }
    .item-content{
      color: #999;
      font-size: .12rem;
      line-height: .17rem;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 0 .03rem .1rem .08rem;
    }
    .item-slef{
      width: 100%;
      line-height: .2rem;
      margin: .2rem 0;
      position: relative;
      display: flex;
      .imgSelf{
        width: .2rem;
        height: .2rem;
        margin: 0 .04rem 0 .05rem;
        border-radius: .1rem;
      }
      .imgZan{
        width: .15rem;
        height: .16rem;
        position: absolute;
        top: .02rem;
        right: .35rem;
      }
      .selfName{
        color: #222;
        font-size: .1rem;
      }
      .selfCount{
        display: inline-block;
        color: #999;
        font-size: .12rem;
        width: .26rem;
        position: absolute;
        top: 0;
        left: 1.4rem;
        text-align: right;
      }
    }
  }
}
</style>
