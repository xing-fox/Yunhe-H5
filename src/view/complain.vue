<template>
<div class="all">
  <div>
        <div>
            <span>请描述你遇到的问题</span>
        </div>
            <textarea></textarea>
        <div>
            <span>联系人</span>
        </div>
            <input>
        <div>
            <span>联系电话</span>
        </div>
            <input>
        </div>
  <div>
        <button>提交申请</button>
  </div>
</div>
</template>
<style  lang='less' scoped>
.all{
    background: #FFFFFF;
    margin:0;
    padding:0;
    width:100%;
    height:100%;
    span {
        font-size: .15rem;
        color: #222222;
        letter-spacing: 0.57px;
        margin: 0 .1rem;
        display: -webkit-box;
        padding: 0.2rem 0.1rem;
    }
    textarea{
        width: 3.5rem;
        height: 1.4rem;
        border: 1px solid #DDDDDD;
        border-radius: 3px;
        margin: 0.01rem 0.13rem;
        display: -webkit-box;
    }
    input{
        width: 3.5rem;
        height: 0.5rem;
        border: 1px solid #DDDDDD;
        border-radius: 3px;
        margin: 0.01rem 0.13rem;
        display: -webkit-box;
    }
    button{
        width: 3.15rem;
        height: 0.5rem;
        background: #FFDA44;
        border-radius: 5px;
        font-size: .16rem;
        color: #222222;
        letter-spacing: 0.61px;
        text-align: center;
        margin: 0 0.3rem;
    }
}
</style>
