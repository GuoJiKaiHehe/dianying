if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city,main={key:{},data:{}};

//    获取影院的数据
function getmovies(url){
    $.ajax({
        url:"http://localhost:100/php/index.php",
        type:"GET",
        dataType:"jsonp",
        data:{
            urls:url
        },
        jsonpCallback:"a",
        success:function(data){
           console.log(data);
           getData(data);
           for(var i=0;i<main.data[main.key["0"]].length;i++){
               getCinema(main.data[main.key["0"]][i]);
           }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest,textStatus,errorThrown);
            alert("请求超时");
        }
    })
};

// 加载的时候立即请求加载数据
getmovies("http://m.maoyan.com/cinemas.json");


//   获取城市中的各个地区的划分
function getData(data){
    var i=0;
    for(var k in data.data){
        $(".area").append('<div class="col-md-1 col-sm-2 col-xs-4"><a href="javascript:void(0)" class="center-block">'+k+'</a></div>');
        main.key[i]=k;
        i++;
    };
    $(".area>div:eq(0)>a").attr("class","red");
    main.data=data.data;
    console.log(main);
    $(".area>div>a").on("click",function(){
        $(".area>div>a").attr("class","");
        $(this).attr("class","red");
        $(".area-main").empty();
        for(var i=0;i<main.data[$(this).html()].length;i++){
               getCinema(main.data[$(this).html()][i]);
           }
    });
};

//  获取各个地区的影院的数据，并转换成html
function getCinema(data){
    var content=document.getElementById("cinema").content;
    var a=content.querySelector("a");
    a.setAttribute("data-id",data.id);;
    var nm=content.querySelector(".nm");
    nm.innerHTML=data.nm;
    var price=content.querySelector(".price");
    price.innerHTML=data.sellPrice;
    var addr=content.querySelector(".addr");
    addr.innerHTML=data.addr;
    var sell=content.querySelector(".sell");
    if(data.sell){
        sell.innerHTML="有";
    }else{
        sell.innerHTML="无";
    };
    var imax=content.querySelector(".imax");
     if(data.imax){
        sell.innerHTML="有";
    }else{
        sell.innerHTML="无";
    };
    var clone = document.importNode(content, true);
    $(".area-main").append(clone);
    $(".area-main>div>a").on("click",function(){
        console.log(1);
        localStorage.cinema=$(this).attr("data-id");
        window.location.href="../html/cinema.html";
    })
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.url=$(this).attr("data-url");
    window.location.href="../html/index.html";
});







