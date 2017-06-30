//   搜索功能的实现
$("#search").on("click",function(){
    if($(this).prev().val()){
        window.location.href="../html/search.html";
        localStorage.search=$(this).prev().val();
    }
})

if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}

//   遮盖层的样式设置
$("#show").css({
    "width":document.documentElement.clientWidth,
    "height":document.documentElement.clientHeight,
    "background":"rgba(255,255,255,0.6)",
    "position":"fixed",
    "left":0,
    "top":0,
    "zIndex":100
});

// 点击logo的时候的跳转情况
$("#logo").on("click",function(){
    localStorage.urls="";
    localStorage.id="";
    window.location.href="../html/index.html";
})


//   判断搜索栏的内容不能为空
$("#search").on("click",function(){
    if($("#search").prev().val()){
        localStorage.search=$("#search").prev().val();
        window.location.href="../html/search.html";
    }else{
        alert("搜索不能为空");
    }
})
