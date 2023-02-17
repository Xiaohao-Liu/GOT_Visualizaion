var body = d3.select("body");
var w=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
var h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
var svg = body.append("svg").attr("height",h ).attr("width", w).attr("style", "position:absolute;top:0;left:0;z-index:0;");
var g1 = svg.append("g").attr("height", h).attr("width", w)
var g2 = body.append("div").attr("id","nodes-b").attr("style", "position:absolute;top:0;left:0;z-index:1;overflow:hidden;height:"+(h)+"px;width:"+(w)+"px");

var labels = svg.append("g").attr("height", 200).attr("weight", 200)
document.getElementById("bg").innerHTML = "<div id='info'><div id='info-b'></div><div id='name'></div><div id='arrow_'></div><div id='family-board'></div></div></div>"
// info board --start
var info = body.select("#info");
var info_b = body.select("#info-b");
var info_name = body.select("#name");
var family_board = body.select("#family-board");
var bg = body.select("#bg")
var bg_before_style = body.append("style")
//var info_more = body.select("#info-more");
//info board -- end


var force=d3.layout.force()//layout将json格式转化为力学图可用的格式
        .nodes(data.characters)//设定节点数组
		.links(relations)//设定连线数组
		.size([w,h])//作用域的大小
		.linkDistance(100)
		.charge(-70)//顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
        .start();//开始转换

//绘制
var colormap={"killed":"#ff5b5b", "parents":"#38a1f3", "siblings":"#8d6e63", "serves":"#e1f5fe", "guardianOf":"#ffc107","marriedEngaged":"#8e24aa"}
var colors = ["#ff5b5b", "#38a1f3", "#8d6e63","#e1f5fe","#ffc107","#8e24aa"]
var text = ["killed","parents","siblings", "serves", "guardianOf","marriedEngaged"]
var houseName={"Stark":1,"Martell":2, "Arryn":3,"Targaryen":4, "Greyjoy":5, "Lannister":6, "Tyrell":7, "Tully":8, "Baratheon":9}
labels.selectAll("label_line").data(colors).enter().append("line").attr("x1",50).attr("x2", 100).attr("y1", function(d,i){return i*25 + 20}).attr("y2", function(d,i){return i*25 + 20})
.attr("stroke", function(d){return d}).attr("stroke-width","2px")
labels.selectAll("label_text").data(text).enter().append("text").attr("x",120).attr("y", function(d,i){return i*25 + 25})
.attr("fill", "white").attr("font-size", "14px").text(function(d){return d})


var relationmap={"killed":"url(./relations/kill.png)", "parents":"#38a1f3", "siblings":"#ab47bc"}
var color=d3.scale.category20();


// var line=g1.selectAll(".forceLine")
//          .data(relations)
// 		 .enter()
//   	     .append("line")
// 		 .attr("class","forceLine")
// 		 .style("stroke","#EEE")
// 		 .style("opacity",0.4)
//          .style("stroke-width",1);


// var logos = g1.selectAll(".forceNode")
// 			.data(relations)
// 			 .enter()
// 	  	     .append("circle")
// 			 .attr("class","forceNode")
// 			 .attr("r",10)
// 			 .attr("fill","url(./relations/kill.png)")
// 			 .style("opacity", 0)
// 			 .style("stroke","#EEE")
// 	         .style("stroke-width",1);

// var arrowsL = g1.selectAll(".forcearrow_left")
// 				.data(relations).enter().append("line")
// 				.attr("stroke", "red")
// 				.attr("stroke-width",2)
// var arrowsR = g1.selectAll(".forcearrow_right")
// 				.data(relations).enter().append("line")
// 				.attr("stroke", "red")
// 				.attr("stroke-width",2)

//箭头绘制
var defs = svg.append("defs");//SVG的<defs>元素用于预定义一个元素使其能够在SVG图像中重复使用。
var arrowMarker = defs.selectAll("arrows").data(colors).enter().append("marker")
						.attr("id",function(d){return d.substring(1,d.length)})//?
						.attr("markerUnits","strokeWidth")//标识大小的基准，有两个值：strokeWidth（线的宽度）和userSpaceOnUse（图形最前端的大小）
						.attr("markerWidth","5")
						.attr("markerHeight","5")//标识的大小
						.attr("viewBox","0 0 10 10")//坐标系的区域
						.attr("refX",30)   //实际是radius/strokeWidth
						.attr("refY",5)// viewBox 内的基准点，绘制时此点在直线端点上
						.attr("orient","auto")//绘制方向
						.attr("fill",function(d){return d});

//定义了一条路径，它开始于位置 0 0，到达位置 10 5，然后从那里开始到 1 10，最后在0 0 关闭路径
var arrow_path = "M 0 0 L 10 5 L 0 10 z";

arrowMarker.append("path")
			.attr("d",arrow_path);

//路径创建边
var path=svg.selectAll("path")
			.data(relations)
			.enter()
			.append("path")
			.attr("id",function(d,i){
				return "edgepath"+i;
			})
			.attr("class","edges")
			.attr("marker-end","url(#arrow)")//添加尾端样式为箭头
			.style("stroke","#EEE")
		 	.style("opacity",0.4)
         	.style("stroke-width",1);

//添加边名称
var edges_text=svg.selectAll("g")
				  .data(relations)
				  .enter()
				  .append("text")
				  .append('textPath')
				  .attr("text-anchor","middle")
				  .attr("startOffset","50%")
				  .attr('xlink:href',function(d,i){
					  return "#edgepath"+i;
				  })
				//   .text(function(d){
				// 	  return d.relation;
				//   })
				  .style("opacity", 1).style("font-size","10px");

var circles=g2.selectAll("forceCircle")
           .data(data.characters)//表示使用的数据
		   .enter()
		   .append("div")//?
		   .attr("class","forceCircle")
		   //.style("background-image","url(https://images-na.ssl-images-amazon.com/images/M/MV5BNzI5MDg0ZDAtN2Y2ZC00MzU1LTgyYjQtNTBjYjEzODczZDVhXkEyXkFqcGdeQXVyNTg0Nzg4NTE@._V1_.jpg)")
		   .style("background-color",function(d,i){return color(i);})
		   //.style("border",function(d){if(d.weight>=5){return "5px solid rgba(255, 255, 255, 0.43)"}else{return 0}})
		   .style("background-image",function(d){return "url("+d.characterImageThumb+")"})
		   .call(force.drag)
		   .on("mouseover", nodeMouseOver)
		   .on("mouseout", nodeMouseOut)

 var lable_icon = g2.selectAll(".relation-icon").data(text).enter().append("div")
					.attr("class", "relation-icon")
					.attr("id",function(d){return d;})
					.style("background-image", function(d){return "url(relations/"+(d)+".png)"})
					.style("top", function(d,i){return (i * 25 + 10) +"px"})
					.style("left", "10px")
					.on("mouseover", showRelations)
					.on("mouseout", hiddenRelations)
function nodeMouseOver(d,i){
	var name = d.characterName
	// force.linkDistance(100+d.weight).charge(-70 -d.weight).start()
	// d.weight *= 2
	// var weight = d.weight;
	circles.filter(function(d){if(d.characterName != name)d.weight=0;
		return false;})
	d.weight=30;
	path.filter(function(d){
		if(d.source.characterName == name){
			d.target.weight = 20;
		}
		if(d.target.characterName == name){
			d.source.weight = 20;
		}
		return (d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity", 1).style("stroke", function(d){return colormap[d.relation]}).style("fill", function(d){return colormap[d.relation]}).style("stroke-width",2).attr("marker-end",function(d){return "url("+colormap[d.relation]+")"});

	path.filter(function(d){
		return !(d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity",0);

	edges_text.filter(function(d){
		return (d.source.characterName == name|| d.target.characterName == name)
	}).text(function(d){return d.relation;});

	circles.filter(function(d){
		return d.characterName == name;
	})
	.style("z-index",10)
   	.style("box-shadow","0px 3px 10px -4px")

	info.style("opacity",1).style("z-index",4).style("top",(d.y) + "px").style("left", (d.x + d.weight + 10) + "px");
   	
   	info_b.attr("style","background-image:url("+d.characterImageFull+");")
   	info_name.text(name);
   	if(houseName[d.houseName ]== null){family_board.attr("style","opacity:0")}
   	else family_board.attr("style","background-image:url(familys/"+d.houseName+".jpg)")
    //bg.attr("style","background-image:url("+d.characterImageFull+");")
    if(d.characterImageFull == null){
    bg_before_style.text("#bg:before{background-image:url(bg.jpg);")}
    else
    bg_before_style.text("#bg:before{background-image:url("+d.characterImageFull+");}")
}

function nodeMouseOut(d,i){
	var name = d.characterName
	force.linkDistance(100).charge(-70).start()
	path.filter(function(d){
		return (d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity", .4).style("stroke","#EEE").style("stroke-width",1).attr("marker-end","url(#)");	//？

	path.filter(function(d){
		return !(d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity",.4);

	circles.filter(function(d){
		return d.characterName == name;
	})
   	.style("z-index",0)
   	.style("box-shadow","0px 2px 5px -2px")
	info.style("opacity",0).style("z-index",0);

	edges_text.filter(function(d){
		return (d.source.characterName == name|| d.target.characterName == name)
	}).text("");
}

function showRelations(d){
	var relation_ = d;
	circles.filter(function(d){
		d.weight=0;
		return false;})
	force.linkDistance(120).charge(-100).start()
	path.filter(function(d){return d.relation == relation_}).style("opacity", 1).style("stroke", colormap[relation_]).style("stroke-width",2).attr("marker-end",function(d){return "url("+colormap[d.relation]+")"});
	path.filter(function(d){
		if(d.relation == relation_)
		{
			d.source.weight = 20;
			d.target.weight = 20;
		}
		return d.relation != relation_;
	}).style("opacity",0);//？
}

function hiddenRelations(d){
	var relation_ = d;
	force.linkDistance(100).charge(-70).start()
	path.filter(function(d){return d.relation == relation_}).style("opacity", .4).style("stroke","#EEE").style("stroke-width",1).attr("marker-end","url()");
	path.filter(function(d){
		return d.relation != relation_;
	}).style("opacity",.4);
}
force.on("tick",function(){
    //   path.attr("x1",function(d){return d.source.x;});
    //   path.attr("y1",function(d){return d.source.y;});
    //   path.attr("x2",function(d){return d.target.x;});
	//   path.attr("y2",function(d){return d.target.y;});
	path.attr("d",function(d){
		var dx = d.target.x-d.source.x,
			dy = d.target.y-d.source.y,
			dr = Math.sqrt(dx*dx+dy*dy);
			return "M"+d.source.x+","+d.source.y+"L"+d.target.x+","+d.target.y;
	});//（基于路径绘制时）tick()函数中需要更新路径的数据属性path.d
	
	circles.style("left",function(d){return d.x + "px";});
	circles.style("top",function(d){return d.y + "px";})
	  		.style("height",function(d,i){return d.weight*1.5 + "px";})
   			.style("width",function(d,i){return d.weight*1.5 + "px";})//？
});
