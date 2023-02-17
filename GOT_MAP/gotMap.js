var Map = function(){
  this.body = d3.select("body");
  this.svg = null;
  this.controls = null;
  this.projection = null;
  this.path = null;
  this.defaultCenter = [-34.5461141456036,40.793001213624];
}

    var h = window.innerHeight
    var w = window.innerWidth

Map.prototype = {
  constructor:Map,
  _init:function(){

    this.svg = this.body.append("svg").attr("id", "got-map").attr("height", h).attr("width", w).style("background-color","#317386");
    this.controls = this.body.append("div").attr("id", "map-controls");
    this.projection = d3.geo.mercator().center(this.defaultCenter).scale(600).translate([w/2,h/2]);
    this.path = d3.geo.path().projection(this.projection);
    this.processJson(this.body,this.svg,this.projection,this.path,"./sources/lands-of-ice-and-fire.json");
  },
  processJson:function(body,svg,projection,path,json_url){
    var that = this;
    d3.json(json_url, function(error, topology){
      if(error) return console.log(error);
      //console.log(topology);
      var g_land = svg.append("g").attr("id", "lands").style("transition", "ease .5s");
      function drawLand(){
        var land_data = topojson.feature(topology, topology.objects.land)
        console.log(land_data)
        g_land.selectAll("land_path").data(land_data.features).enter()
              .append("path").attr("fill","#cbc495").attr("class","land").attr("d", path)
      }

      var g_country = svg.append("g").attr("id", "countries")
      function drawCountry(){
        var country_data = topojson.feature(topology, topology.objects.countries)
        //console.log(country_data)
        g_country.selectAll("land_path").data(country_data.features).enter()
              .append("path").attr("id", function(d,i){return "conutry" + d.id})
              .attr("stroke","#eee")
              .attr("fill", function(d,i){
                if( d.id == 363 || d.id == 12) return "rgba(0,0,0,0)";
                return "#cbc495"
              })
              .attr("class","country").attr("d", path)
      }


      var g_places = body.append("div").attr("id", "places");
      function drawPlace(){
        var place_data = topojson.feature(topology, topology.objects.places)
        //console.log(place_data)
        g_places.selectAll("land_path").data(place_data.features).enter()
              .append("div")
              .attr("class","place")
              // .style("background-image",function(d){return "url(./sources/"+d.properties.type+".svg)"})
              .style("top",function(d){return projection(d.geometry.coordinates)[1]})
              .style("left",function(d){return projection(d.geometry.coordinates)[0]})
              .on("click",refresh)
              .on("mouseover", showInfo)
              .on("mouseout", hiddenInfo)
              ;
        function showInfo(d){
          this.innerHTML="<div class='place-name'>"+d.properties.name+"</div>";
          var top_ = parseFloat(this.style.top.split("px")[0])
          this.style.top = (top_ + 4)+"px";
          this.style.zIndex = 2;
        }
        function hiddenInfo(d){
          this.innerHTML="";
          var top_ = parseFloat(this.style.top.split("px")[0])
          this.style.top = (top_ - 4) + "px";
          this.style.zIndex = 1;
        }
        function refresh(d){
          // this.style("top", projection(d.geometry.coordinates)[1] +4 )
          that.refreshMap(g_places, g_land,d.geometry.coordinates, 300);
        }
      }


      drawLand();
      //drawCountry();
      drawPlace();
    });
  },
  refreshMap:function(places, lands, center,scale){
    var projection = d3.geo.mercator().center(center).scale(600).translate([w/2,h/2]);
    var path = d3.geo.path().projection(projection);
    var that = this;
    function renewLand(){
      lands.style("transform",function(){
        var top_ = projection(center)[1] - that.projection(center)[1];
        var left_ = projection(center)[0] - that.projection(center)[0];
        return "translate("+left_+"px,"+top_+"px)";
      })
    }

    function renewPlace(){
      places.selectAll(".place")
            .style("top",function(d){return projection(d.geometry.coordinates)[1]})
            .style("left",function(d){return projection(d.geometry.coordinates)[0]})
    }

    renewLand();
    renewPlace();
    this.defaultCenter = center
  }
}

var map = new Map();
window.onload = map._init();