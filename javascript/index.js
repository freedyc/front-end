var oList=document.getElementsByClassName("list1");
var ogg=document.getElementsByClassName("g1");
for(var i=0;i<ogg.length;i++){
	ogg[i].style.display="block";
}
for(var i=0;i<oList.length;i++){
	oList[i].index=i;
	oList[i].firstElementChild.onclick=function(){
	   var oG1=oList[this.parentNode.index].getElementsByClassName("g1");
	   for(var i=0;i<oG1.length;i++){
		   	if(oG1[i].style.display=="block"){
		   		oG1[i].style.display="none";
		   	}else{
		   		oG1[i].style.display="block";
		   	}

	   }
	}
}
//标题框展开。

var oTop=document.getElementById("topone");

oTop.onmouseover=function(){
	oTop.className="hover";
}
oTop.onmouseout=function(){
	oTop.className="";
}
window.onscroll=function(){
	var sTop=document.body.scrollTop||document.documentElement.scrollTop;
	if(sTop>30){
		oTop.style.display="block";
	}else{
		oTop.style.display="none";
	}
}
oTop.onclick=function(){
	clearInterval(timer);
    timer=setInterval(demo,25)
}
var timer;
function demo(){

	var sTop=document.body.scrollTop||document.documentElement.scrollTop;
	var sTop=sTop-sTop/7;
	sTop=sTop>0?sTop:Math.floor(sTop);
	if(document.body.scrollTop){
		document.body.scrollTop=sTop;
	}
	else{
		document.documentElement.scrollTop=sTop;
	}

	if(sTop==0){
		clearInterval(timer);
	}
}
