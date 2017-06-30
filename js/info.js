if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city,status = 1;


//   加载页面获取的数据
function getSourceInfo(url){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"jsonp",
        data:{
            apikey:"0b2bdeda43b5688921839c8ecb20399b",
            city:cityName,
            client:"",
            udid:""
        },
        success:function(data){
             $("#show").css("display","none");
            getAll(data);
            $("#directors>span>a,#casts>span>a,#writers>span>a").on("click",function(){
                localStorage.movePeople=$(this).attr("data-id");
                window.location.href="../html/action.html";
            })
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};

$(document).ready(function(){
     $("#show").css("display","block");
    if(localStorage.moveId){
    getSourceInfo("http://api.douban.com/v2/movie/subject/"+localStorage.moveId);
    }else{
        getSourceInfo("http://api.douban.com/v2/movie/subject/"+26220650);
    }
})



// 将获取的数据转换成熟悉html结构
function getAll(data){
    var durations="",pubdates="",languages="",countries="";
    $("#title").html(data.title);
    $("#rating").html(data.rating.average);
    if(data.rating.average==0){
        $("#rating").html("暂无评分");
    }
    $("#ratings_count").html(data.ratings_count);
    for(var i=0;i<data.durations.length;i++){
        if(i!=data.durations.length-1){
            durations += data.durations[i] + "/";
        }else{
            durations += data.durations[i] ;
        }
    }
    $("#durations").html(durations);
    for(var i=0;i<data.genres.length;i++){
        if(i==data.genres.length-1){
            $("#genres").append("<span>"+data.genres[i]+"</span>");
        }else{
            $("#genres").append("<span>"+data.genres[i]+"、</span>");
        }
    };
    for(var i=0;i<data.directors.length;i++){
        if(i==data.directors.length-1){
            $("#directors").append("<span><a href='javascript:void(0);' data-id= "+data.directors[i].id+">"+data.directors[i].name+"</span>");
        }else{
            $("#directors").append("<span><a href='javascript:void(0);' data-id= "+data.directors[i].id+">"+data.directors[i].name+"、</span>");
        }
    };
    for(var i=0;i<data.casts.length;i++){
        if(i==data.casts.length-1){
            $("#casts").append("<span><a href='javascript:void(0);' data-id= "+data.casts[i].id+">"+data.casts[i].name+"</span>");
        }else{
             $("#casts").append("<span><a href='javascript:void(0);' data-id= "+data.casts[i].id+">"+data.casts[i].name+"、</span>");
        }
    };
     for(var i=0;i<data.writers.length;i++){
        if(i==data.writers.length-1){
             $("#writers").append("<span><a href='javascript:void(0);' data-id= "+data.writers[i].id+">"+data.writers[i].name+"</span>");
        }else{
            $("#writers").append("<span><a href='javascript:void(0);' data-id= "+data.writers[i].id+">"+data.writers[i].name+"、</span>");
        }
    };
    for(var i=0;i<data.pubdates.length;i++){
        if(i!=data.pubdates.length-1){
            pubdates += data.pubdates[i] + "、";
        }else{
            pubdates += data.pubdates[i] ;
        }
    }
    $("#pubdates").html(pubdates);
    for(var i=0;i<data.languages.length;i++){
        if(i!=data.languages.length-1){
            languages += data.languages[i] + "、";
        }else{
            languages += data.languages[i] ;
        }
    }
    $("#languages").html(languages);
    $("#year").html(data.year);
    for(var i=0;i<data.countries.length;i++){
        if(i!=data.countries.length-1){
            countries += data.countries[i] + "、";
        }else{
            countries += data.countries[i] ;
        }
    }
    $("#countries").html(countries);
    for(var i=0;i<data.tags.length;i++){
        if(i==data.tags.length-1){
            $("#tags").append("<span>"+data.tags[i]+"</span>");
        }else{
            $("#tags").append("<span>"+data.tags[i]+"、</span>");
        }
    };
    $("#images").attr("src",data.images["large"]);
    $("#wish_count").html(data.wish_count);
    $("#collect_count").html(data.collect_count);
    $("#summary").html(data.summary);
    $(".trailer_urls").each(function(i){
        if(!data.trailer_urls[0]){
            $(this).parent().parent().parent().html("无")
        }
        if(data.trailer_urls[i]){
            $(this).prop("src",data.trailer_urls[i]);
        }else{
            $(this).parent().remove();
        }
    });

    $(".photos").each(function(i){
        if(data.photos[i]){
            $(this).attr("src",data.photos[i].image);
        }else{
            $(this).css("display","none");
        }
    });
    for(var i=0;i<data.popular_comments.length;i++){
        getShort(data.popular_comments[i]);
    };
    for(var i=0;i<data.popular_reviews.length;i++){
        getLong(data.popular_reviews[i]);
    };
}



//   将短评数据可视化
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
    $("#shortMore").before(clone);
}

// 将影评数据可视化
function getLong(data){
    var content=document.getElementById("long").content;
    var popular_reviews=content.querySelector(".popular_reviews_title");
    popular_reviews.innerHTML=data.title;
    var img=content.querySelector("img");
    img.src=data.author.avatar;
    // var rating=content.querySelector(".rating");
    // rating.innerHTML=data.rating.value;
    var name=content.querySelector(".name");
    name.innerHTML=data.author.name;
     var summary=content.querySelector(".summary");
    summary.innerHTML=data.summary;
    // var longMore=document.getElementById("longMore");
    var clone = document.importNode(content, true);
    // longMore.appendChild(clone);
    $("#longMore").before(clone);
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.title = $(this).html();
    localStorage.urls=$(this).attr("data-url");
    window.location.href="../html/index.html";
});

$("#shortMore>a").on("click",function(){
    window.location.href="../html/short.html";
})

$("#longMore>a").on("click",function(){
    window.location.href="../html/long.html";
})


//   伪投票的的加载，这里应该是要链接后台的数据的，然后返回成功之后再进行数据的更新的
$("#wish_count").parent().on("click",function(){
    if(status == 1){
        $("#wish_count").html(Number($("#wish_count").html())+1);
        status=0;
    }else{
        alert("已投过票了");
    }
});

$("#collect_count").parent().on("click",function(){
    if(status == 1){
        $("#collect_count").html(Number($("#collect_count").html())+1);
        status=0;
    }else{
        alert("已投过票了");
    }
})