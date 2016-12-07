// var element = document.getElementById("myfirstdiv");
// console.log(element);
// element.innerHTML="sdfa";
// var img = document.getElementsByTagName("img")[0];
 // img.src = "b.jpg";
 // console.log(img);
 // img.setAttribute("src","b.jpg");
 // element.style.color = "red"; 	

 // var pa = document.createElement("h1");
 // pa.innerHTML="我是追加的h1";
 // element.appendChild(pa);
 // element.insertBefore(pa,document.getElementById("myp")); 
 // element.removeChild(document.getElementById("myp"));
 // var replaceBtn = document.createElement("a");
 // replaceBtn.innerText = "百度一下";
 // element.replaceChild(replaceBtn,document.getElementById("myp"));
var element = document.getElementById("myfirstdiv");
// console.log(element);
var input = document.getElementById("username");
element.onmouseup = function(e){
	// alert("第一次可以点击");
	// console.log(e.target.innerText);
	console.log(input.value);
};

input.onchange = function(e){
	console.log(this.value);
};
window.onresize = function(a){
	console.log(window.screen.width);
}
// console.log(element);
