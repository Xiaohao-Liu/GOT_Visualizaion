var douban = [9.4,9.5,9.5,9.6,9.3,9.5,9.3,6.4];
var imdb =[9.12,9.04,9.11,9.33,8.9,9.12,9.17,6.56];
var rottentomatoes = [9.1,9.6,9.6,9.7,9.3,9.4,9.3,5.2];
var container = d3.select("#svg-b-b-b");
var icons = d3.select("#svg-b-icon-icon");
var ranks = {"douban":{0:douban, 1:"豆瓣"},
            "imdb":{0:imdb, 1:"IMDb"},
            "rottentomatoes":{0:rottentomatoes, 1:"烂番茄"}};
var ranks_ = ["douban", "imdb", "rottentomatoes"];
var ranks2index = {"douban":0, "imdb":1, "rottentomatoes":2};
var h = window.innerHeight;
var w = window.innerWidth;
h -= 100;
w *=.8;
var averages = new Array(3);

var step = 10;
var rectW = w / 8 - 2*step;

var multipy = (h - 20)/10;

// svg.selectAll("rect").data(douban).enter().append("rect").attr("x", function(d,i){
//     return i * (rectW + 2*step) + step;
// }).attr("y", function(d,i){
//     return h-d*multipy;
// }).attr("width", rectW).attr("height", function(d, i){
//     return d*multipy;
// }).attr("fill","#666");
// svg.selectAll("text").data(douban).enter().append("text").attr("x", function(d,i){
//     return (i+.5) * (rectW + 2*step) ;
// }).attr("y", function(d,i){
//     return h-d*multipy+15;
// }).attr("text-anchor", "middle").attr("fill","white").text(function(d){return d});
// var ave = 0;
// for(var i = 0; i < 8; i++){
//     ave += douban[i];
// }
// document.getElementById("average-line").style.bottom = ave + "px";
var ind = 0;
function hist(data, rank){
    var svg = container.append("svg")
        .attr("height", h)
        .attr("width", w);
    svg.selectAll("rect").data(data).enter().append("rect").attr("x", function(d,i){
        return i * (rectW + 2*step) + step;
    }).attr("y", function(d,i){
        return h-d*multipy;
    }).attr("width", rectW).attr("height", function(d, i){
        return d*multipy;
    }).attr("fill","#666");
    svg.selectAll("text").data(data).enter().append("text").attr("x", function(d,i){
        return (i+.5) * (rectW + 2*step) ;
    }).attr("y", function(d,i){
        return h-d*multipy+15;
    }).attr("text-anchor", "middle").attr("fill","white").text(function(d){return d});
    var ave = 0;
    for(var i = 0; i < 8; i++){
        ave += data[i];
    }
    averages[ranks2index[rank]] = (ave * multipy)/10;

    icons.select("ul").append("li").html(function(){
        console.log("<div class='icon' style='background-image:url("+rank+".svg)'></div><p>"+ranks[rank][1]+"</p>");
        return "<div class='icon' style='background-image:url("+rank+".svg)'></div><p>"+ranks[rank][1]+"</p>";
    });

    // ave/=10;
    // ave *= multipy;
    //
    //
    // document.getElementById("icon").style.backgroundImage = "url("+ranks[ranks_[index]][1]+".svg)";

}


function slideTo(index){
    container.style("left", "calc(-"+index*100+"% - "+index*100+"px)");
    icons.style("left", "calc(-"+index*100+"% - "+index*100+"px)");
    document.getElementById("average-line").style.bottom = averages[index] + "px";
}
var slide_flag = true;
d3.selectAll(".rank_").on("mouseover", function(){
    var index = parseInt(this.getAttribute("rank"));
    slideTo(index);
    slide_flag = false;
});


var _index  = 0;
function autoslide(){
    if(_index == 3){_index = 0;}
    slideTo(_index);
    _index +=1;
    if(slide_flag == true){
        setTimeout(function(){autoslide();},2000);
    }
}

window.onload = function(){
    hist(ranks["douban"][0],"douban")
    hist(ranks["imdb"][0],"imdb")
    hist(ranks["rottentomatoes"][0],"rottentomatoes")
    document.getElementById("average-line").style.bottom = averages[0] + "px";
    autoslide();
};
