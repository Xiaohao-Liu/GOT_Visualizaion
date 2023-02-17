
var words=[{text:'Aerys II Targaryen',size:2},
            {text:'Alliser Thorne',size:1},
            {text:'Amory Lorch',size:1},
            {text:'Arya Stark',size:11},
            {text:'Black Walder Rivers',size:1},
            {text:'Bowen Marsh',size:1},
            {text:'Brienne of Tarth',size:3},
            {text:'Bronn',size:3},
            {text:'Catelyn Stark',size:1},
            {text:'Cersei Lannister',size:7},
            {text:'Daario Naharis',size:6},
            {text:'Daenerys Targaryen',size:13},
            {text:'Doreah',size:1},
            {text:'Drogon',size:3},
            {text:'Eddard Stark',size:4},
            {text:'Ellaria Sand',size:2},
            {text:'Euron Greyjoy',size:3},
            {text:'Gendry',size:2},
            {text:'Ghost',size:1},
            {text:'Gregor Clegane',size:7},
            {text:'Grenn',size:1},
            {text:'Grey Wind',size:1},
            {text:'Grey Worm',size:2},
            {text:'Hodor',size:1},
            {text:'Howland Reed',size:1},
            {text:'Ilyn Payne',size:1},
            {text:'Jaime Lannister',size:5},
            {text:'Janos Slynt',size:1},
            {text:'Jaqen Hghar',size:3},
            {text:'Joffrey Baratheon',size:1},
            {text:'Jon Snow',size:13},
            {text:'Jorah Mormont',size:3},
            {text:'Karl Tanner',size:1},
            {text:'Khal Drogo',size:2},
            {text:'Lem Lemoncloak',size:1},
            {text:'Lothar Frey',size:1},
            {text:'Lysa Arryn',size:1},
            {text:'Maester Cressen',size:1},
            {text:'Mag the Mighty',size:3},
            {text:'Meera Reed',size:2},
            {text:'Melisandre',size:4},
            {text:'Meryn Trant',size:1},
            {text:'Mirri Maz Duur',size:1},
            {text:'Mossador',size:1},
            {text:'Obara Sand',size:2},
            {text:'Olenna Tyrell',size:1},
            {text:'Olly',size:2},
            {text:'Osha',size:2},
            {text:'Othell Yarwyck',size:1},
            {text:'Petyr Baelish',size:3},
            {text:'Podrick Payne',size:2},
            {text:'Polliver',size:1},
            {text:'Pyat Pree',size:2},
            {text:'Ramsay Snow',size:9},
            {text:'Rast',size:1},
            {text:'Rhaegal',size:2},
            {text:'Rickard Karstark',size:2},
            {text:'Robb Stark',size:2},
            {text:'Robert Baratheon',size:1},
            {text:'Roose Bolton',size:1},
            {text:'Samwell Tarly',size:2},
            {text:'Sandor Clegane',size:14},
            {text:'Selyse Baratheon',size:1},
            {text:'Smalljon Umber',size:1},
            {text:'Stannis Baratheon',size:2},
            {text:'Styr',size:1},
            {text:'Summer',size:1},
            {text:'The Night King',size:3},
            {text:'The Tickler',size:1},
            {text:'The Waif',size:1},
            {text:'Theon Greyjoy',size:5},
            {text:'Tommen Baratheon',size:1},
            {text:'Tormund Giantsbane',size:2},
            {text:'Tyene Sand',size:2},
            {text:'Tyrion Lannister',size:2},
            {text:'Viserion',size:2},
            {text:'White Walker',size:1},
            {text:'Ygritte',size:4}];
var w=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
var h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
            

var wc=d3.layout.cloud()
      .size([w*.8, 400])
      .words(words)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("underneath")
      .fontSize(function(d) { return d.size*8; })
      .on("end", draw)
      .start();

function draw(words) {
d3.select("body").select("#big_board").append("div").attr("class","b").style("height","400px").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .append("g")
    .attr("transform", "translate("+w*.4+",200)")
  .selectAll("text")
    .data(words)
  .enter().append("text")
  // .transition()
  // .duration(1000)
  // .ease("bounce")
  // .delay(2000)
  
// .attrTween("font-size",bigerText)
    .attr("font-size", function(d) { console.log(d);return d.size + "px"; })
    .style("font-family", "underneath")
    .style("fill", function(d, i) { return "rgba(0,0,0,"+(d.size/(14*8) + .5) +")"; })
    .style("transition", "ease .5s")
    .style("cursor","pointer")
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; })
    .on("mouseover",function(){
        d3.select(this).style("text-shadow", "0px 0px 10px #000")
    })
    .on("mouseout",function(){
        d3.select(this).style("text-shadow", "0px 0px 0px #000")
    })
    // function bigerText(d){
    //     var i = d3.interpolate({size:0},d);
    //     return function(t){return i(t).size;}
    // }
}

