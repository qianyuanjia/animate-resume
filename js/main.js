let part1=`/**
* 面试官您好，我是钱圆佳
* 也许文字简历对您来说太单调了，所以我用动态的代码来介绍自己吧
* 首先给所有变化一个过渡缓和，以防给您的阅览带来不适
**/
*{
	transition:all 1s;
}
/*也许您不能忍受白色的背景以及默认的字体样式，所以我改变一下它*/
#leftCode{
	color: #999;
}
html{
	background:#eee;
	font-size:16px;
}
/*我需要一个页面用于呈现我左半部分的内容*/
.wrap{
 	position:fixed;
	left:40px;
	top:0;
	bottom:0;
	margin:auto;	
	width:40%;
	height:90vh;
	background:#29282C;
	box-shadow:0 0 3px 2px rgba(0,0,0,0.3);
	overflow: hidden;
}
#leftCode{
	position:absolute;
	left:0;
	top:0;
	z-index:1;
}
/*加点动画不至于显得单调*/
@keyframes rotate{
	from{
		transform:rotate(0)
	}
	to{
		transform:rotate(360deg)
	}
}
#taiji{
	width:100px;
	height:50px;
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	margin:auto;
	background: #D4D4D5;
	border-radius:50%;
	border-bottom:50px solid #949494;
	opacity:0.3;
	animation:rotate 3s linear infinite;
}
#taiji::before,
#taiji::after{
	content:'';
	display:block;
	width:20px;
	height:20px;
	position:absolute;
	top:25px;
	border-radius:50%;
}
#taiji::before{
	background:#D4D4D5;
	border:15px solid #949494;
}
#taiji::after{
	background: #949494;
	right:0;
	border:15px solid #D4D4D5;
}
/*接下来我需要一个页面展示左半部分的内容*/
.rightWrap{
	width:50%;
	height:90vh;
	position:fixed;
	right:40px;
	top:0;
	bottom:0;
	margin:auto;
	border:1px solid #AAAAAA;
	background:#EEEEEE;
	overflow:hidden;
}
#rightCode{
	padding:15px;	
	line-height:26px;
	white-space:pre-line;
}
/*我将在左边页面上用markdown写一下我的基本情况*/


`;
let part2=`### 自我介绍
----
我叫钱圆佳，籍贯是浙江湖州德清，是浙江大学2014级本科毕业生，专业为应用生物科学，
本人对前端行业十分感兴趣，已经自学前端一年半，希望能在贵公司的前端工程师岗位就职。
### 技能介绍
----
熟悉前端三种必备技能HTML，CSS以及JS，会使用jQuery以及Vue框架。
### 项目介绍
----
1. 苹果风格轮播
2. 手机画板
3. 键盘收藏夹
4. 会动的简历
5. Vue重构的简历  

### 其他技能
----
PhotoShop、摄影、视频剪辑
### 联系方式
----
* QQ:1712030209
* 邮箱:qianyuanjia@qq.com
* 手机:17816872377
### 链接
* [github](https://github.com/qianyuanjia)
* [博客](https://qianyuanjia.github.io/)
`;

let part3=`/*我给左边页面加一些动态效果不显得单调*/
@keyframes blink{
	from{
		box-shadow:0 0 3px 1px rgba(0,0,0,0.2);
	}
	to{
		box-shadow:0 0 3px 4px rgba(0,0,0,0.2);
	}
}
.rightWrap{
	animation:blink 0.8s infinite;
}


`;
let part4=`/*接下来我将使用marked.js库将Markdown转换为HTML*/


`;
let part5=`/**
*以上就是所有内容，谢谢观看！
*最后加一个滚动条方便您回看
**/
.scrollBar{
	position:absolute;
	right:0;
	top:0;
	height:100%;
	width:20px;
	background: linear-gradient(to right,#1D1D1D,#323232);
	z-index: 10;
	overflow:hidden;
}
#scroll{
	position:absolute;
	left:0;
	right:0;
	margin:auto;
	width:60%;
	background: linear-gradient(to right,#585858,#404040);
	border-radius:16px 20px;
	cursor:default;
}
*{
	transition:none;
}

`;

writeCode('#leftCode',part1,true,()=>{
	writeCode('#rightCode',part2,false,()=>{
		writeCode('#leftCode',part3,true,()=>{
			setTimeout(()=>{				
				writeCode('#leftCode',part4,false,()=>{				
					setTimeout(()=>{				
						var orightCode=document.getElementById('rightCode');
						var oDiv=document.createElement('div');
						oDiv.id='md';
						oDiv.innerHTML=marked(part2);
						document.querySelector('.rightWrap').replaceChild(oDiv,orightCode);
						setTimeout(()=>{
							writeCode('#leftCode',part5,true,leftScroll,part1+part3+part4)
						},2000)
					},2000)
				},part1+part3)
			},3000)
		},part1)
	});
});

function writeCode(codePlaceSelector,codeStr,css,callback,preCodeStr){
	let n=0;
	let preCode = preCodeStr || '';
	let timer=setInterval(()=>{
		var obj=document.querySelector(codePlaceSelector);
		var oInnerStyle=document.querySelector('#innerStyle');
		obj.innerHTML=Prism.highlight(preCode+codeStr.substring(0,++n), Prism.languages.css, 'css');
		obj.parentNode.scrollTop=obj.scrollHeight;
		if(css){
			oInnerStyle.innerHTML+=codeStr.substring(n-1,n);
		}
		if(n>=codeStr.length){
			clearInterval(timer);
			callback && callback();
		}
	},20);
}
function leftScroll(){
	var oScroll=document.querySelector('#scroll');
	var oLeftCode=document.querySelector('#leftCode');
	var oWrap=document.querySelector('.wrap');
	var pageHeight=oWrap.offsetHeight;
	var contentHeight=oLeftCode.offsetHeight;
	oScroll.style.height=pageHeight/contentHeight*pageHeight+'px';
	oScroll.style.top=pageHeight-oScroll.offsetHeight+'px';
	// oLeftCode.style.marginTop=-oScroll.offsetTop/pageHeight*contentHeight+'px';
			
	oScroll.onmousedown=function(ev){

	   var disY=ev.clientY-this.offsetTop;
	   var This=this;
	   document.onmousemove=function(ev){
	    	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	    	var top=ev.clientY-disY;
	    	if(top<0){
	    		top=0;
	    	}
	   		if(top>pageHeight-This.offsetHeight){
	    		top=pageHeight-This.offsetHeight;
	     	}
	     	This.style.top=top+'px'
	     	oLeftCode.style.marginTop=-This.offsetTop/pageHeight*contentHeight+'px';
	     	this.onmouseup=function(){
	        	this.onmousemove=this.onmouseup=null;
	     	}
	   }
	 }
	 window.onresize=function(){
	  	pageHeight=oWrap.offsetHeight;
	 	oScroll.style.height=pageHeight/contentHeight*pageHeight+'px';
	 	oScroll.style.top=pageHeight-oScroll.offsetHeight+'px';
	 	oLeftCode.style.marginTop=-oScroll.offsetTop/pageHeight*contentHeight+'px';
	 }
}

