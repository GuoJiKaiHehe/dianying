if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city,sum=0,price=0;

// 获取座位的数据
function getCinema(url,showId,showDate){
    $.ajax({
        url:"http://localhost:100/php/seats.php",
        type:"GET",
        dataType:"jsonp",
        data:{
            urls:url,
            showId:showId,
            showDate:showDate,
        },
        jsonpCallback:"a",
        success:function(data){
            console.log(data+'***');
            getData(data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest,textStatus,errorThrown);
            alert("请求超时");
        }
    })
};

if(localStorage.showId&&localStorage.showDate){
    getCinema("http://m.maoyan.com/show/seats",localStorage.showId,localStorage.showDate);
}else{
    window.location.href="../html/buy.html";
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.url=$(this).attr("data-url");
    window.location.href="../html/index.html";
});

//   点击提交时执行的逻辑
$("#put").on("click",function(){
    if(!sum){
        alert("请先选择座位");
        return;
    }
    var a=confirm("购买了"+sum/price+"张电影票,本次共消费"+sum+"元.");
    if(a){
        alert('恭喜订票成功');
    }
});
 
//    数据可视化，页面一开始的时候
function getData(data){
    if(data.errMsg){
        alert(data.errMsg.errMsg);
    }
    console.log(data);
    price=Number(data.showInfo.price);
    $("#cinemaName").html(data.showInfo.cinemaName);
    $("#movieName").html(data.showInfo.movieName);
    $("#showTime").html(data.showInfo.showTime);
    $("#price").html(data.showInfo.price);
    $("#center").html(data.showInfo.hallName);
    $("tbody td").attr("class","display");
    var seats=data.sections[0].seatRows;
    for(var i in seats){
        everyRow(seats[i]);
    };
    //  座位可选的逻辑
    $("td[class!='display']").on("click",function(){
         if(sum==price*5){
             alert("单人只能买五张电影票");
             return;
         }
        if($(this).attr('class')=="green"){
            $(this).attr("class","white");
            sum-=price;
        }else{
             $(this).attr("class","green");
             sum+=price;
        };
    })
    $('')
}

//   获取座位的信息情况
function everyRow(data){
    var allColumns=42;
    var allRow=16;
    var start=Math.floor((allColumns-data.columns)/2);
    for(var k in data.seats){
        console.log(1);
        if(!data.seats[k].seatNo){
            $("tr:eq("+Number(data.seats[k].rowNum-1)+")>td").eq(start+Number(data.seats[k].columnNum)).attr("class","white");
        }else{
             $("tr:eq("+Number(data.seats[k].rowNum-1)+")>td").eq(start+Number(data.seats[k].columnNum)).attr("class","red");
        }
    }
};


$(window).resize(function(){
    if($(window).width()>$("table").width()){
        var length = ($(window).width()-$("table").width())/2;
        $("table").css("marginLeft",length);
    }else{
        var length = -($(window).width()-$("table").width())/2;
        $("table").css("marginLeft",length);
    }
    if($(window).width()<=300){
        if(300>$("table").width()){
        var length = (300-$("table").width())/2;
        $("table").css("marginLeft",length);
    }else{
        var length = -(300-$("table").width())/2;
        $("table").css("marginLeft",length);
    }
    }
    if($(window).width()>=1040){
        if(1040>$("table").width()){
        var length = (1040-$("table").width())/2;
        $("table").css("marginLeft",length);
    }else{
        var length = -(1040-$("table").width())/2;
        $("table").css("marginLeft",length);
    }
    }
})

