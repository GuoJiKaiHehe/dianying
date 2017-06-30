// 判断city是否存在，存在时，将其传入到页面中的位置处
if(localStorage.city){    
    $("#cityName").html(localStorage.city);
}
var cityName = localStorage.city;

//   设置req对象，来设置请求的照片数量以及作品的数量
var req={
        photo:{
            start:0,
            count:12,
        },
        works:{
            start:0,
            count:4
        }
    };

//    获取照片资源的函数，通过jsonp方式来获取
function getSourcePhoto(url,obj){
    $.ajax({
        type:"GET",
        url:url,
        dataType:"jsonp",
        data:{
            apikey:"0b2bdeda43b5688921839c8ecb20399b",
            city:cityName,
            client:"",
            udid:"",
            start:obj.photo.start,
            count:obj.photo.count
        },
        success:function(data){
            //     获取照片的总数量
            if(data.start==0){
                obj.photo.total=data.total;
            }
            //  若开始值加上请求值大于或等于总量时，让请求加载更多的按钮隐藏
            if(obj.photo.start+obj.photo.count>=obj.photo.total){
                $("#photoMore").css("display","none");
            }

            //  每次请求后都开始的值发生动态变化
            obj.photo.start+=obj.photo.count;
            for(var i=0;i<data.photos.length;i++){

                // 利用模板获取数据中数据生成相应的模块
                getPhoto(data.photos[i]);
            };
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};

//    获取作品资源的函数，通过jsonp方式来获取
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
            // 这些方式与获取照片的作用都是雷同的，这里应该可以利用一个函数来执行的，这样更加的好，只需要在多传一个参数就可以，用来判断是获取photo还是works！
            if(data.start==0){
                obj.works.total=data.total;
            }
            if(obj.works.start+obj.works.count>=obj.works.total){
                $("#worksMore").css("display","none");
            }
            obj.works.start+=obj.works.count;
            for(var i=0;i<data.works.length;i++){
                getWork(data.works[i]);
            };
            //  点击作品的时候，让其跳转到作品的详情页去
            $(".mov").on("click",function(){
                localStorage.moveId=$(this).attr("data-id");
                window.location.href="../html/information.html";
            })
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};


//  页面加载的时候主要加载的的函数，只在页面加载的时候执行一次
function getSourceMain(url){
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
            //   加载完成的时候让遮盖层消失！
            $("#show").css("display","none");
            // 调用主函数
            getMain(data);
            //  调用照片函数
            getSourcePhoto("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople+"/photos",req);
            // 调用作品函数
            getSourceWorks("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople+"/works",req);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求超时");
        }
    })
};


//  当文档加载完成的时候，开始执行主函数！
$(document).ready(function(){
    //  $("#show").css("display","block");
    if(localStorage.movePeople){
        getSourceMain("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople);
    }else{
        localStorage.movePeople=1054395;
        getSourceMain("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople);;
    }
})



// 页面加载的时候加载的主要的函数
function getMain(data){
    var professions="",aka="",aka_en="";
    $("#name").html(data.name);
    $("#avatars").attr("src",data.avatars.large);
    $("#gender").html(data.gender);
    $("#constellation").html(data.constellation);
    $("#birthday").html(data.birthday);
    $("#born_place").html(data.born_place);
    $("#summary").html(data.summary);
    for(var i=0;i<data.professions.length;i++){
        if(i==data.professions.length-1){
            professions+=data.professions[i];
        }else{
             professions+=data.professions[i]+"、";
        }
    }
    $("#professions").html(professions);
    if(data.aka.length){
        for(var i=0;i<data.aka.length;i++){
            if(i==data.aka.length-1){
                aka+=data.aka[i];
            }else{
                aka+=data.aka[i]+"、";
            }
        }
        $("#aka").html(aka);
    }else{
        $("#aka").parent().remove();
    }
    if(data.aka_en.length){
        for(var i=0;i<data.aka_en.length;i++){
            if(i==data.aka_en.length-1){
                aka_en+=data.aka_en[i];
            }else{
                aka_en+=data.aka_en[i]+"、";
            }
        }
        $("#aka_en").html(aka_en);
    }else{
        $("#aka_en").parent().remove();
    }
}


// 将照片数据转换成html结构
function getPhoto(data){
    var content=document.getElementById("photo").content;
    var img=content.querySelector("img");
    img.src=data.image;
    var clone = document.importNode(content, true);
    $("#photoMore").prev().append(clone);
}

// 将作品数据转换成html结构
function getWork(data){
    console.log(data);
    var content=document.getElementById("works").content;
    var role="",kind="";
    var a=content.querySelector("a");
    a.setAttribute("data-id",data.subject.id);;
    var avatars=content.querySelector(".avatars");
    avatars.src=data.subject.images.medium;
    var title=content.querySelector(".title");
    title.innerHTML=data.subject.title;
    var roles=content.querySelector(".roles");
    for(var i=0;i<data.roles.length;i++){
        if(i==data.roles.length-1){
            role+=data.roles[i];
        }else{
            role+=data.roles[i]+"、";
        }
    }
    roles.innerHTML=role;
    var year=content.querySelector(".year");
    year.innerHTML=data.subject.year;
    var genres=content.querySelector(".genres");
    for(var i=0;i<data.subject.genres.length;i++){
        if(i==data.subject.genres.length-1){
            kind+=data.subject.genres[i];
        }else{
            kind+=data.subject.genres[i]+"、";
        }
    }
    genres.innerHTML=kind;
    var rating=content.querySelector(".rating");
    rating.innerHTML=data.subject.rating.average;
    // var longMore=document.getElementById("longMore");
    var clone = document.importNode(content, true);
    $("#worksMore").before(clone);
}

//   下面榜单点击时候跳转的时跳转到指定页面，同时保存对应的值！
$(".bottom-main>li>a").on("click",function(){
    localStorage.title=$(this).html();
    localStorage.urls=$(this).attr("data-url");
    window.location.href="../html/index.html";
});

// 点击时加载更多的照片数据
 $("#photoMore").on("click",function(){
    getSourcePhoto("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople+"/photos",req);
 });

// 点击时加载更多的作品数据
  $("#worksMore").on("click",function(){
    getSourcePhoto("http://api.douban.com/v2/movie/celebrity/"+localStorage.movePeople+"/works",req);
 });


// 判断收起以及展开是的状态
var states = [1,1,1];
$(".Xsmall").on("click",function(){
    var i=$(this).index();
    if(states[i]){
        $(this).html("收起");
        states[i] = 0;
    }else{
        $(this).html("展开");
        states[i] = 1;
    }
});

