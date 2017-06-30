if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city;
var req={
        works:{
            start:0,
            count:4
        }
    };

$("#worksMore").css("visibility","hidden");

//    获取搜索的内容数据
function getSourceWorks(url,obj){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"jsonp",
        data:{
            apikey:"0b2bdeda43b5688921839c8ecb20399b",
            city:cityName,
            client:"",
            udid:"",
            start:obj.works.start,
            count:obj.works.count
        },
        success:function(data){
            $("#show").css("display","none");
            if(data.total==0){
                $("#worksMore").before("<p>未找到搜索内容</p>");
            }else{
                if(data.start==0){
                    obj.works.total=data.total;
                }
                $("#worksMore").css("visibility","visible");
                if(obj.works.start+obj.works.count>=obj.works.total){
                    $("#worksMore").css("display","none");
                }
                obj.works.start+=obj.works.count;
                for(var i=0;i<data.subjects.length;i++){
                    getWork(data.subjects[i]);
                };
                $(".mov").on("click",function(){
                    localStorage.moveId=$(this).attr("data-id");
                    window.location.href="../html/information.html";
                })
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};

if(localStorage.search){
    getSourceWorks("http://api.douban.com/v2/movie/search?q="+localStorage.search,req);
}else{
    localStorage.search="aaa";
    getSourceWorks("http://api.douban.com/v2/movie/search?q="+localStorage.search,req);
}

$("#worksMore").on("click",function(){
    getSourceWorks("http://api.douban.com/v2/movie/search?q="+localStorage.search,req);
});

 
// 将获取的数据可视化 ，应该用正则匹配的方式来写要简单一些  /^{%(\w+)%}$/g
function getWork(data){
    console.log(data);
    var content=document.getElementById("works").content;
    var role="",kind="",cast="",direct="",duration="";
    var a=content.querySelector("a");
    a.setAttribute("data-id",data.id);;
    var avatars=content.querySelector(".avatars");
    avatars.src=data.images.medium;
    var title=content.querySelector(".title");
    title.innerHTML=data.title;
    var year=content.querySelector(".year");
    year.innerHTML=data.year;
    var genres=content.querySelector(".genres");
    for(var i=0;i<data.genres.length;i++){
        if(i==data.genres.length-1){
            kind+=data.genres[i];
        }else{
            kind+=data.genres[i]+"、";
        }
    }
    genres.innerHTML=kind;
    var casts=content.querySelector(".casts");
    for(var i=0;i<data.casts.length;i++){
        if(i==data.casts.length-1){
            direct+=data.casts[i].name;
        }else{
            direct+=data.casts[i].name+"、";
        }
    }
    casts.innerHTML=direct;
    var directors=content.querySelector(".directors");
    for(var i=0;i<data.directors.length;i++){
        if(i==data.directors.length-1){
            cast+=data.directors[i].name;
        }else{
            cast+=data.directors[i].name+"、";
        }
    }
    directors.innerHTML=cast;
    var durations=content.querySelector(".durations");
    for(var i=0;i<data.durations.length;i++){
        if(i==data.durations.length-1){
            duration+=data.durations[i];
        }else{
            duration+=data.durations[i]+"、";
        }
    }
    durations.innerHTML=duration;
    var collect_count=content.querySelector(".collect_count");
    collect_count.innerHTML=data.collect_count;
    var rating=content.querySelector(".rating");
    rating.innerHTML=data.rating.average;
    // var longMore=document.getElementById("longMore");
    var clone = document.importNode(content, true);
    $("#worksMore").before(clone);
}


$(".bottom-main>li>a").on("click",function(){
    localStorage.urls=$(this).attr("data-url");
    window.location.href="../html/index.html";
});




