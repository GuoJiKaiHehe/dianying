if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city,start=0,count=10,total=0;

//    获取影评的数据
function getSourceInfo(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"jsonp",
        data:{
            apikey:"0b2bdeda43b5688921839c8ecb20399b",
            city:cityName,
            client:"",
            udid:"",
            start:start,
            count:count
        },
        success:function(data){
            total=data.total;
            console.log(data);
            if(start==0){
                $("#images").attr("src",data.subject.images.large);
                $("#tit").html(data.subject.title);
                $("#average").html(data.subject.rating.average);
                $("#total").html(total);
                $("#more").css("display","block");
            };
            if(start>=total-count || data.reviews.length<count){
                $("#more").css("display","none");
            };
            $("#show").css("display","none");
            start+=count;
            var data=data.reviews;
            for(var i=0;i<data.length;i++){
                getLongs(data[i]);
            };
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};

$(document).ready(function(){
     $("#show").css("display","block");
    if(localStorage.moveId){
        getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/reviews");
    }else{
        localStorage.moveId=26220650;
        getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/reviews");
    }
})

$("#more").on("click",function(){
     $("#show").css("display","block");
    getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/reviews");
})


//  将影评数据可视化
function getLongs(data){
    var content=document.getElementById("long").content;
    var popular_reviews=content.querySelector(".popular_reviews_title");
    popular_reviews.innerHTML=data.title;
    var img=content.querySelector("img");
    img.src=data.author.avatar;
    var rating=content.querySelector(".rating");
    rating.innerHTML=data.rating.value;
    var name=content.querySelector(".name");
    name.innerHTML=data.author.name;
     var summary=content.querySelector(".summary");
    summary.innerHTML=data.content;
    var useful_count=content.querySelector(".useful_count");
    useful_count.innerHTML=data.useful_count;
    var created_at=content.querySelector(".created_at");
    created_at.innerHTML=data.created_at;
    // var longMore=document.getElementById("longMore");
    var clone = document.importNode(content, true);
    // longMore.appendChild(clone);
    console.log(1);
    $("#more").before(clone);
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.urls=$(this).attr("data-url");
    window.location.href="../html/index.html";
});