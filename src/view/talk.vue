<template>
<div>
   <div class="header">
			<a class="back" alt=""></a>

      <h5 class="tit">追星星的人</h5>
		</div>
		<div class="message">
			<div class="send">
				<div class="time">05/22 06:30</div>
				<div class="msg">
					<img  src="../images/1.png" alt="" />
					<p><i class="msg_input"></i>你好在不在呀，妹子承担施工场地的告诉电费大概费而风热风热风热供热费用！</p>
				</div>
			</div>
      	<div class="send">
				<div class="msg">
					<img  src="../images/1.png" alt="" />
					<p><i class="msg_input"></i>你好在不在呀，妹子！</p>
				</div>
			</div>
			<div class="show">
				<div class="time">05/22 06:30</div>
				<div class="msg">
					<img  src="../images/1.png" alt="" />
					<p><i clas="msg_input"></i>你好你好你好</p>
				</div>
			</div>
      	<div class="show">
				<div class="time">05/22 06:30</div>
				<div class="msg">
					<img  src="../images/1.png" alt="" />
					<p><i clas="msg_input"></i>你好你好你好</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<input type="text" />
      <img src="../images/Smile.png" alt="" />
			<!-- <img  alt="" /> -->
		</div>
</div>
</template>
<style lang='less' scoped>
  h5{
    margin: 0;
  }
  img{
    max-width: 100%;
    vertical-align: middle
  }
  input{
    outline: none;	
  }
  body{
      max-width: 720px;
      margin: 0 auto;
      background: #f1f1f1;
      color:#333;
      font-size: 0.26rem;
  }
  .header{
      border-bottom: 1px solid #dfdfdf;
      padding:0 0.2rem;
      height: 10%;
      line-height: 1rem;
      background: black;
      position: fixed;
      width: 100%;
      max-width: 720px;
      box-sizing: border-box;
      z-index: 100;
  }
  .back{
      position: absolute;  
      top: 0;
      left: 0.18rem;
      background:url(../images/left.png) no-repeat;
      width: 0.2rem;
      height:0.3rem;
      margin-top: 0.28rem;
      background-size: 0.18rem 0.2rem;
  }
  .header .tit{
      font-family: PingFangSC-Medium;
      font-size: 17px;
      vertical-align: middle;
      text-align: center;
      height: 2rem;
      line-height: 0.7rem;
      font-weight: normal;
      color: #FFFFFF;
  }
  .header .right{
    position: absolute;
    right: 0.3rem;
    top: 0;
    float: none;
    font-size: 0.24rem;
    line-height: 1.2rem;
  }
  .message{
      background-color: #f1f1f1;
    padding: 1.2rem 0.3rem 1rem 0.3rem;	
  }
  .time{
      font-size:0.14rem;
      color:#999;
      margin-bottom: 0.3rem;
      text-align: center;
  }
  .footer{
    font-size: 0;
    position: fixed;
    bottom: 0;
    background-color:#fff;
    width: 100%;
    border-top: 1px solid #ddd;
    display: flex;
  }
  .footer img{
      width: 0.3rem;
      height: .3rem;
      margin: .15rem .1rem 0 0;
  }
  .footer input{
      border: none;
      -webkit-appearance: none;
      flex: 1;
      height: .4rem;
      margin: .1rem .2rem .1rem .2rem;
      border-radius: 0.1rem;
      border: 1px solid #dadada;
  }
  .footer p{
    width:1.2rem;
      height:0.68rem;
      font-size:0.3rem;
      color:#fff;
      line-height:0.68rem;
      text-align:center;
      background-color:#ddd;
      border-radius: 0.1rem;
      float:right;
      margin-top:0.2rem;
      margin-right:0.2rem;
  }
  .send:after,.show:after,.msg:after{
    content: "";
    clear: both;
    display: table;	
  }
  .msg>img{
    width: 0.4rem;
    float: left;
  }
  .msg>p{
    float: left;
    margin:0  0.1rem;
    padding: 0.10rem;
    background: #fff;
    font-size: 0.15rem;
    position: relative;
    border-radius: 0.2rem;
    max-width:2rem ;
    box-sizing: border-box;
    border-radius: 15px 15px 15 15px;
  }
  .msg_input{
    position: absolute;
    //background: url(./images/msg-input.png) no-repeat;
    background-size: 0.31rem auto;
    width: 0.31rem;
    height: 0.51rem;
    left: -0.31rem;
    top: 0.25rem;
  }
  .show .msg img,.show .msg p,.show .msg{
    float: right;
  }
  .show .msg_input{
    left: auto;
    right: -0.1rem;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);	
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
  }
  .send,.show{
    padding-bottom: 0.3rem;
  }
  .alert_novip,.flower_num,.give_flower{
    display: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.28rem;
  }
  .alert_novip p,.flower_num  p{
    margin-bottom: 0.45rem;
    .layui-layer-wrap button{
      font-size: 0.28rem;
      padding: 0.2rem 0.3rem;
      margin-top: 0.1rem;
      background: #f8f8f8;
      border-radius: 10px;
    }
  }
  .flower_num button{
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
  }
  .layui-layer-wrap button:first-child{
    float: left;
  }
  .layui-layer-wrap button:last-child{
    float: right;
    background: #FF7171;
    color: #fff;
  }
  .alert_novip button{
    padding: 0.2rem 0.3rem;
      border-radius: 10px
  }
  .flower{
    width: 0.8rem;
    margin: 0 auto;
  }
  .give_flower{
    text-align: center;
  }
  .give_flower p{
    text-align: center;
    line-height: 1.5;
  }
  .give_flower button{
    display: block;
    width: 3rem;
    font-size: 0.28rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    float: none!important;
    line-height: 0.65rem;
    border-radius: 10px;
  }
</style>
