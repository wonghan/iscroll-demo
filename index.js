let ul = document.getElementById('ul');  // 获取ul列表
let div = document.getElementById('article') // 获取包裹ul列表的div(css:  overflow:scroll;)
let upText = document.getElementById('upText');
let start;  // 辅助变量：触摸开始时，相对于文档顶部的Y坐标
let num = 11; // 添加li文本，可自定义
let refresh = false;

/**
 * 上拉加载
 */
function addLi() {  // 添加li的方法，可自定义
  let fragment = document.createDocumentFragment();
  for(let i=0;i<10;i++) {
    let li = document.createElement('li');
    li.className = 'li';
    li.innerHTML = num++;
    fragment.appendChild(li); // 用DocumentFragment提高渲染速度
  }
  ul.insertBefore(fragment,downText);
}
div.addEventListener('touchmove',function(){
  if(div.scrollHeight-div.scrollTop<=667) {
    let touch = event.touches[0];
    ul.style.top = ul.offsetTop + (touch.pageY - start)/5 +'px'; // ul.style.top = ul.offsetTop + 'px'
    start = touch.pageY;
  }
},false);
div.addEventListener('touchend',function(event){
  if(ul.offsetTop<0){
    let time2 = setInterval(function(){
      ul.style.top = ul.offsetTop +2 +'px';
      if(ul.offsetTop>=0){
        clearInterval(time2);
        addLi();  
      }
    })
  }

},false);
/**
 * 下拉刷新
 */
div.addEventListener('touchstart',function(event){
  let touch = event.touches[0];
  start = touch.pageY;  // 辅助变量：触摸开始时，相对于文档顶部的Y坐标
},false);
div.addEventListener('touchmove',function(event){
  // 下拉刷新
  let touch = event.touches[0];
  if(div.scrollTop<=0){
    // 如果ul列表到顶部，修改ul列表的偏移,显示“下拉刷新”，并准备触发下拉刷新功能，可自定义
    ul.style.top = ul.offsetTop + touch.pageY - start +'px'; // ul.style.top = ul.offsetTop + 'px'
    start = touch.pageY;
    // 若ul偏移量过大,则修改文字,refresh置为true,配合'touchend'刷新
    if(ul.offsetTop>=100) {
      upText.innerHTML = "释放刷新";
      refresh = true;
    }
  }
},false);

div.addEventListener('touchend',function(event){
  // 若'touchend'时，ul偏移,用setInterval循环恢复ul的偏移量
  if(ul.offsetTop>=0) {
    let time = setInterval(function(){
      ul.style.top = ul.offsetTop -3 +'px';
      // 若ul的偏移量恢复，clearInterval
      if(ul.offsetTop<=0){
        clearInterval(time);
        upText.innerHTML = "下拉刷新";
        // 若恢复时'refresh===true',刷新页面
        if(refresh){
          refresh = false;
          location.reload();
        }
      }
    })
  }
},false);


/** 
 *  调试用
 */
// div.addEventListener('scroll',function(){
//   console.log('clientHeight',ul.clientHeight,div.clientHeight)
//   console.log('scrollHeight',ul.scrollHeight,div.scrollHeight)
//   console.log('offsetHeight',ul.offsetHeight,div.offsetHeight)
//   console.log('clientTop',ul.clientTop,div.clientTop)
//   console.log('scrollTop',ul.scrollTop,div.scrollTop)
//   console.log('offsetTop',ul.offsetTop,div.offsetTop)
// },false);