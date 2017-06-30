// var cityName=document.getElementById("cityName").innerHTML;
var start=0,count=12,urls="https://api.douban.com/v2/movie/in_theaters";
var more=document.getElementById("more");


if(localStorage.title){
    $("#title").html(localStorage.title);
}else{
    $("#title").html("正在热映");
}
getSource(urls)

//   获取首页的资源
function getSource(url){
    console.log(url);
    $.ajax({
        type:"GET",
        url:url,
        dataType:"jsonp",
        data:{
            apikey:"0b2bdeda43b5688921839c8ecb20399b",
            city:cityName,
            start:start,
            count:count,
            client:"",
            udid:""
        },
        success:function(data){
            console.log(data);
            localStorage.removeItem("url");
            localStorage.removeItem("title")
            $("#show").css("display","none");
            if(start == 0){
                $("#main").empty();
            };
            if((start+count)<data.total){
                $("#more").css({"display":"block"});
            }else{
                $("#more").css({"display":"none"});
            }
            start+=count;
             var data=data.subjects;
             for(var i=0;i<data.length;i++){
                 getTemplate("template-main",data[i]);
             };

            $("#main>div").on("click",function(){
                localStorage.moveId=$(this).children().eq(0).attr("data-id");
                window.location.href="../information.html";
            });
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};



// 获取模板函数
function getTemplate(id,obj){
    var ctn = document.getElementById(id).content;
    var a=ctn.querySelector("a");
        a.setAttribute("data-id",obj.id);
    var img=ctn.querySelector("img");
    img.src=obj.images.large;
    img.alt=obj.images.large;
    var h5=ctn.querySelector("h5");
    h5.innerHTML = obj.title;
    var span=ctn.querySelectorAll("span")[0];
    span.innerHTML=obj.rating.average;
    if(obj.rating.average == 0){
        span.innerHTML="暂无评分";
    }
    var main = document.getElementById("main");
    var clone = document.importNode(ctn, true);
    main.appendChild(clone);
};


// 加载更多的时候
more.addEventListener("click",function(){
    $("#show").css("display","block");
    getSource(urls);
});


$(".bottom-main>li>a").on("click",function(){
    if($("#title").html()==$(this).html()){
        return;
    }else{
        urls=$(this).attr("data-url");
        start=0;
        count=12;
        $("#more").css({"display":"none"});
        $("#show").css("display","block");
        localStorage.title =  $(this).html();
        $("#title").html(localStorage.title );
        getSource(urls);
    }
});

$("#show").css({
    "width":document.documentElement.clientWidth,
    "height":document.documentElement.clientHeight,
    "background":"rgba(255,255,255,0.6)",
    "position":"fixed",
    "left":0,
    "top":0,
    "zIndex":100
});


$(document).ready(function(){
    if(localStorage.urls){
        urls=localStorage.urls;
        $("#title").html(localStorage.title);
    }
});







