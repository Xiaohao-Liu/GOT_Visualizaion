var body = d3.select("body");
var w=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
var h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
var svg = body.append("svg").attr("height",h ).attr("width", w).attr("style", "position:absolute;top:0;left:0;z-index:0;");
var g1 = svg.append("g").attr("height", h).attr("width", w)
var g2 = body.append("div").attr("id","nodes-b").attr("style", "position:absolute;top:0;left:0;z-index:1;overflow:hidden;height:"+(h)+"px;width:"+(w)+"px");

var labels = svg.append("g").attr("height", 200).attr("weight", 200)
document.getElementById("bg").innerHTML = "<div id='info'><div id='info-b'><div id='name'></div></div><div id='arrow_'></div></div></div>"
// info board --start
var info = body.select("#info");
var info_b = body.select("#info-b");
var info_name = body.select("#name");
//var info_more = body.select("#info-more");
//info board -- end


var force=d3.layout.force()
        .nodes(data.characters)
		.links(relations)
		.size([w,h])
		.linkDistance(100)
		.charge(-70)
        .start();

//绘制
var colormap={"killed":"#ff5b5b", "parents":"#38a1f3", "siblings":"#8d6e63", "serves":"#e1f5fe", "guardianOf":"#ffc107","marriedEngaged":"#8e24aa"}
var colors = ["#ff5b5b", "#38a1f3", "#8d6e63","#e1f5fe","#ffc107","#8e24aa"]
var text = ["killed","parents","siblings", "serves", "guardianOf","marriedEngaged"]
labels.selectAll("label_line").data(colors).enter().append("line").attr("x1",50).attr("x2", 100).attr("y1", function(d,i){return i*25 + 20}).attr("y2", function(d,i){return i*25 + 20})
.attr("stroke", function(d){return d}).attr("stroke-width","2px")
labels.selectAll("label_text").data(text).enter().append("text").attr("x",120).attr("y", function(d,i){return i*25 + 25})
.attr("fill", "white").attr("font-size", "14px").text(function(d){return d})



var relationmap={"killed":"url(./relations/kill.png)", "parents":"#38a1f3", "siblings":"#ab47bc"}
var color=d3.scale.category20();




var lines=g1.selectAll(".forceLine")
         .data(relations)
		 .enter()
  	     .append("line")
		 .attr("class","forceLine")
		 .style("stroke","#EEE")
		 .style("opacity",0.4)
         .style("stroke-width",1);
         



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
var defs = svg.append("defs");
var arrowMarker = defs.selectAll("arrows").data(colors).enter().append("marker")
						.attr("id",function(d){return d.substring(1,d.length)})
						.attr("markerUnits","strokeWidth")
						.attr("markerWidth","5")
						.attr("markerHeight","5")
						.attr("viewBox","0 0 10 10")
						.attr("refX",30)   //实际是radius/strokeWidth
						.attr("refY",5)
						.attr("orient","auto")
						.attr("fill",function(d){return d});


var arrow_path = "M 0 0 L 10 5 L 0 10 z";


arrowMarker.append("path")
			.attr("d",arrow_path);

var circles=g2.selectAll("forceCircle")
           .data(data.characters)
		   .enter()
		   .append("div")
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
	lines.filter(function(d){
		if(d.source.characterName == name){
			d.target.weight = 20;
		}
		if(d.target.characterName == name){
			d.source.weight = 20;
		}
		return (d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity", 1).style("stroke", function(d){return colormap[d.relation]}).style("fill", function(d){return colormap[d.relation]}).style("stroke-width",2).attr("marker-end",function(d){return "url("+colormap[d.relation]+")"});
    

	lines.filter(function(d){
		return !(d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity",0);
    
   
	circles.filter(function(d){
		return d.characterName == name;
	})
	.style("z-index",10)
   	.style("box-shadow","0px 3px 10px -4px")

	info.style("opacity",1).style("z-index",4).style("top",(d.y) + "px").style("left", (d.x + d.weight + 10) + "px");
   	
   	info_b.attr("style","background-image:url("+d.characterImageFull+");")
   	info_name.text(name);

}

function nodeMouseOut(d,i){
	var name = d.characterName
	force.linkDistance(100).charge(-70).start()
	lines.filter(function(d){
		return (d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity", .4).style("stroke","#EEE").style("stroke-width",1).attr("marker-end","url(#)");	

	lines.filter(function(d){
		return !(d.source.characterName == name|| d.target.characterName == name)
	}).style("opacity",.4);
    
	circles.filter(function(d){
		return d.characterName == name;
	})
   	.style("z-index",0)
   	.style("box-shadow","0px 2px 5px -2px")
	info.style("opacity",0).style("z-index",0);
}	 	

function showRelations(d){
	var relation_ = d;
	circles.filter(function(d){
		d.weight=0;
		return false;})
	force.linkDistance(120).charge(-100).start()
	lines.filter(function(d){return d.relation == relation_}).style("opacity", 1).style("stroke", colormap[relation_]).style("stroke-width",2).attr("marker-end",function(d){return "url("+colormap[d.relation]+")"});
	lines.filter(function(d){
		if(d.relation == relation_)
		{
			d.source.weight = 20;
			d.target.weight = 20;
		}
		return d.relation != relation_;
	}).style("opacity",0);
}

function hiddenRelations(d){
	var relation_ = d;
	force.linkDistance(100).charge(-70).start()
	lines.filter(function(d){return d.relation == relation_}).style("opacity", .4).style("stroke","#EEE").style("stroke-width",1).attr("marker-end","url()");
	lines.filter(function(d){
		return d.relation != relation_;
	}).style("opacity",.4);
}
force.on("tick",function(){
      lines.attr("x1",function(d){return d.source.x;});
      lines.attr("y1",function(d){return d.source.y;});
      lines.attr("x2",function(d){return d.target.x;});
      lines.attr("y2",function(d){return d.target.y;});	  

	  circles.style("left",function(d){return d.x + "px";});
	  circles.style("top",function(d){return d.y + "px";})
	  		.style("height",function(d,i){return d.weight*1.5 + "px";})
   			.style("width",function(d,i){return d.weight*1.5 + "px";})
});
