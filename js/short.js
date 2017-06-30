// if(localStorage.city){    
//     $("#cityName").html(localStorage.city);
// }
var cityName = localStorage.city,start=0,count=20,total=0;

//    获取短评的信息
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
            if(start>=total-count || data.comments.length<count){
                $("#more").css("display","none");
            };
             $("#show").css("display","none");
            start+=count;
            var data=data.comments;
            for(var i=0;i<data.length;i++){
                getShort(data[i]);
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};

$(document).ready(function(){
     $("#show").css("display","block");
    if(localStorage.moveId){
        getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/comments");
    }else{
        localStorage.moveId=26220650;
        getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/comments");
    }
})

$("#more").on("click",function(){
     $("#show").css("display","block");
    getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId+"/comments");
})

//   短评数据可视化
function getShort(data){
    var content=document.getElementById("short").content;
    var img=content.querySelector("img");
    img.src=data.author.avatar;
    var rating=content.querySelector(".rating");
    rating.innerHTML=data.rating.value;
    var created_at=content.querySelector(".created_at");
    created_at.innerHTML=data.created_at;
    var ctn=content.querySelector(".content");
    ctn.innerHTML=data.content;
    var useful_count=content.querySelector(".useful_count");
    useful_count.innerHTML=data.useful_count;
    var name=content.querySelector(".name");
    name.innerHTML=data.author.name;
    var clone = document.importNode(content, true);
    $("#more").before(clone);
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.urls=$(this).attr("data-url");
    window.location.href="../html/index.html";
});