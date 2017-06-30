if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city,things={};

//   获取影院具体消息以及具体的电影的消息
function getCinema(url,id,movieId){
    $.ajax({
        url:"http://localhost:100/php/cinema.php",
        type:"GET",
        dataType:"jsonp",
        data:{
            urls:url,
            cinemaid:id,
            movieid:movieId,
        },
        jsonpCallback:"a",
        success:function(data){
            data = data.data;
            console.log(data);
            getIndex(data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest,textStatus,errorThrown);
            alert("请求超时");
        }
    })
};

if(localStorage.cinema){
    getCinema("http://m.maoyan.com/showtime/wrap.json",localStorage.cinema,"");
}else{
    localStorage.cinema="16228";
    getCinema("http://m.maoyan.com/showtime/wrap.json",localStorage.cinema,"");
}

//   获取不同的电影的场次情况
function getchoise(url,cinema,moviesId){
    $.ajax({
        url:"http://localhost:100/php/cinema.php",
        type:"GET",
        dataType:"jsonp",
        data:{
            urls:url,
            cinemaid:cinema,
            movieid:moviesId,
        },
        jsonpCallback:"a",
        success:function(data){
            console.log(data);
            data = data.data;
            change(data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest,textStatus,errorThrown);
            alert("请求超时");
        }
    })
}


// 获取页面的主要情况
function getIndex(data){
    $("#nm").html(data.cinemaDetailModel.nm);
    $("#addr").html(data.cinemaDetailModel.addr);
    $("#tel").html(data.cinemaDetailModel.tel[0]).attr("href","tel:"+data.cinemaDetailModel.tel[0]);
    change(data);
    getPhoto(data.movies);
};

// 获取不同日期的电影情况
function change(data){
    getDates(data);
}


// 获取各个电影对应的照片情况
function getPhoto(data){
    for(var i=0;i<data.length;i++){
        $("#movie").append('<div class="col-md-2 col-sm-2 col-xs-3"><a href="javascript:void(0);" data-movieId='+data[i].id+'><img src='+data[i].img+' class="img-responsive max-height" alt="Responsive image" data-id='+data[i].id+'></a></div>')
    };
    $("#movie>div").eq(0).attr("class","col-md-2 col-sm-2 col-xs-3 shadow");
    $("#movie>div").on("click",function(){
        $("#movie>div").attr("class","col-md-2 col-sm-2 col-xs-3");
        $(this).attr("class","col-md-2 col-sm-2 col-xs-3 shadow");
        getchoise("http://m.maoyan.com/showtime/wrap.json",localStorage.cinema,$(this).children().children().eq(0).attr("data-id"));
    });
}


//    获取日期电影场次时转换的html
function getDates(data){
    $("#date").empty();
    $("#choose").empty();
    for(var i=0;i<data.Dates.length;i++){
        $("#date").append('<div class="col-xs-3 text-center"><a href="javascript:void(0);" data-slug='+data.Dates[i].slug+'>'+data.Dates[i].text+'</a></div> ')
    };
    var things=data.DateShow;
    if(things[data.Dates[0].slug].length==0){
        alert("抱歉，此片今日无排片！");
    }
    for(var i=0;i<things[data.Dates[0].slug].length;i++){
        getMoives(things[data.Dates[0].slug][i]);
    };
    $("#date>div>a").eq(0).attr("class","orange");
    $("#date>div>a").on("click",function(){
        $("#choose").empty();
        $("#date>div>a").attr("class","");
        $(this).attr("class","orange");
        for(var i=0;i<things[$(this).attr("data-slug")].length;i++){
            getMoives(things[$(this).attr("data-slug")][i]);
        }
    });
}

//   获取不同的电影时的变换情况
function getMoives(data){
    $("#choose").append('<div class="row border margins"><div class="col-md-2 col-sm-2 col-xs-2 text-center"><h3 class="margin-fixed tm orange">'+data.tm+'</h3><h5 class="end">'+data.end+'<span>结束</span></h5></div><div class="col-md-3 col-sm-3 col-xs-3 text-center"><h3 class="margin-fixed orange"><span class="lang">'+data.lang+'</span><span class="tp">'+data.tp+'</span></h3><h5 class="th">'+data.th+'</h5></div><div class="col-md-4 col-sm-4 col-xs-4 text-center"><h3 class="margin-fixed orange prices"></h3><h5>折扣卡首单特惠</h5></div><div class="col-md-3 col-sm-3 col-xs-3 text-center"><h4 class="move-margin"><a href="javascript:void(0);" class="red" data-showDate='+data.showDate+' data-showId='+data.showId+'>选座购票</a></h4></div></div>');
    $("#choose .red").on("click",function(){
        localStorage.showDate = $(this).attr("data-showDate");
        localStorage.showId = $(this).attr("data-showId");
        window.location.href="../html/seats.html";
    });
}




$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.url=$(this).attr("data-url");
    window.location.href="../html/index.html";
});







