# iscroll-demo (使用原生js，实现**移动端**的**上拉加载、下拉刷新**)

- [演示地址](https://wonghan.github.io/iscroll-demo/)

### HTML结构
```
<body>
  <div id="app">
    <header id="header">
      <input type="text" id="input">
      <input type="submit" id="submit">
    </header>
    <article id="article">
      <ul id="ul">
        <li class="li" id="text">下拉刷新</li>
        <li class="li">1</li>
        <li class="li">2</li>
        <li class="li">3</li>
        <li class="li">4</li>
        <li class="li">5</li>
        <li class="li">6</li>
        <li class="li">7</li>
        <li class="li">8</li>
        <li class="li">9</li>
        <li class="li">10</li>
      </ul>
    </article>
  </div>
</body>
```

### 上拉加载
```
let ul = document.getElementById('ul');  // 获取ul列表
let div = document.getElementById('article') // 获取包裹ul列表的div(css:  overflow:scroll;)
let num = 11; // 要添加的li文本，可自定义

// 添加li的方法，可自定义
function addLi() {  
  let fragment = document.createDocumentFragment();
  for(let i=0;i<10;i++) {
    let li = document.createElement('li');
    li.className = 'li';
    li.innerHTML = num++;
    fragment.appendChild(li); // 用DocumentFragment提高渲染速度
  }
  ul.appendChild(fragment);
}

// 上拉加载
div.addEventListener('touchmove',function(event){
  if(div.scrollHeight-div.scrollTop<1000) {   // 主要核心！！！
    addLi();
  }
},false);
```

### 下拉刷新
```
let ul = document.getElementById('ul');  // 获取ul列表
let div = document.getElementById('article') // 获取包裹ul列表的div(css:  overflow:scroll;)
let text = document.getElementById('text');  // 写着“下拉刷新”的元素
let start;  // 辅助变量：触摸开始时，相对于文档顶部的Y坐标
let refresh = false;  // 辅助变量：是否刷新

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
      text.innerHTML = "释放刷新";
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
        text.innerHTML = "下拉刷新";
        // 若恢复时'refresh===true',刷新页面
        if(refresh){
          location.reload();
        }
      }
    })
  }
},false);
```
