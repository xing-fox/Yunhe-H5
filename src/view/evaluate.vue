<template>
<div class="all">
    <div class="content">
            <div class="time">
                <span>39分钟前</span>
            </div>
            <div class="chatLeft">
                <img src="../images/1.png">
                <div class="chatcontent">
                    <span>您好，很高兴为您服务，请问，有什么可以帮助您？</span>
                    <ul>
                        <span>[常见问题列表]</span>
                        <li>1、手机消费一般组成怎样的？</li>
                        <li>1、手机消费一般组成怎样的？</li>
                        <li>1、手机消费一般组成怎样的？</li>
                        <li>1、手机消费一般组成怎样的？</li>
                        <li>1、手机消费一般组成怎样的？</li>
                    </ul>
                </div>
            </div>
            <div class="chatRight">
                <div class="chatcontent">
                    <span>有什么可以帮助您？</span>
                    <ul>
                        <span>[常见问题列表]</span>
                        <li>1、手机消费一般组成怎样的？</li>
                    </ul>
                </div>
                <img src="../images/1.png">
            </div>
            <div class="chatLeft">
                <img src="../images/1.png">
                <div class="chatcontent">
                    <span>有什么可以帮助您？</span>
                    <ul>
                        <span>[常见问题列表]</span>
                        <li>1、手机消费一般组成怎样的？</li>
                    </ul>
                </div>
            </div>
            <div class="left">
                <span class="complain">投诉意见</span>
                <!-- <span class="call">打电话</span> -->
            </div>
    </div>
    <div class="footer">
    </div>
</div>
</template>
<style lang='less' scoped>
.all{
    margin:0;
    padding:0;
    width:100%;
    height:100%;
    .content{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: .8rem;
        left: 0;
        right: 0;
        overflow:scroll;
        overflow-y:auto;
        .time{
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            background: #CECECE;
            border-radius: 3px;
            width: .7rem;
            height: .18rem;
            margin: .2rem 1.53rem;
        }
        .chatcontent{
            flex: 1;
            background: #FFFFFF;
            float: left;
            margin: 0.1rem;
        }
        .chatRight{
            max-width: 90%;
            margin: 0 0 .2rem 10%;
            text-align: right;
            display: flex;
            .chatcontent{
                border-radius: 5px 5px 5px 0;
                position: relative;
                &:before{
                    content: '';
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-left: 6px solid white;
                    border-bottom: 6px solid transparent;
                    position: absolute;
                    top: 8px;
                    right: -6px;
                }
            }
        }
        .chatLeft {
            max-width: 90%;
            margin: 0 0 .2rem 0;
            display: flex;
            .chatcontent{
                border-radius: 5px 5px 0 5px;
                position: relative;
                &:before{
                    content: '';
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-right: 6px solid white;
                    border-bottom: 6px solid transparent;
                    position: absolute;
                    top: 8px;
                    left: -6px;
                }
            }
        }
        .chatLeft img{
            width: .38rem;
            height: .38rem;
            margin: 0 0 0 .1rem;
            border-radius: .38rem;
        }
        .chatRight img{
            width: .38rem;
            height: .38rem;
            margin: 0 .1rem 0 0;
            border-radius: .38rem;
        }
        .chatLeft span, .chatRight span{
            font-size: .15rem;
            color: #222222;
            letter-spacing: 0;
            text-align: left;
            display: -webkit-box;
            margin: .15rem;
        }
        .chatLeft ul li, .chatRight ul li{
            font-size: .15rem;
            color: #55B9EB;
            letter-spacing: 0;
            text-align: left;
            display: -webkit-box;
            margin: .1rem;
        }
        .left{
            position: fixed;
            bottom: .6rem;
            left: 0;
        }
        .complain{
            font-size: .13rem;
            color: #222222;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
            border-radius: 20px;
            width: .8rem;
            height: .32rem;
        }
    }
    .footer{
        width: 100%;
        height: 0.55rem;
        background: #FFFFFF;
        position: absolute;
        bottom: 0;
    }
}
</style>
