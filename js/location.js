var cityName=document.getElementById("cityName").innerHTML;



// 通过百度API来获取用户的所在的城市
(function(){
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	var city = document.getElementById("cityName");
	map.centerAndZoom(point,12);

	function myFun(result){
		cityName = result.name;
		map.setCenter(cityName);
		city.innerHTML = cityName;
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
})();
