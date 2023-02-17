//1. create an audio context
var w=document.documentElement.clientWidth
|| document.body.clientWidth;

var h=document.documentElement.clientHeight
|| document.body.clientHeight;


var AudioContext = window.AudioContext || window.webkitAudioContext

var audio_context=null,
	source=null,
	analyser_node,
	gain_node,
	audio = document.getElementById("GOTAudio"),
	buffer_;

function controlMusic(control){
	var status = control.getAttribute("status");
	if(status == "pause"){
		audio.play();
		control.style.backgroundImage = "url(pics/pause.svg)";
		control.setAttribute("status", "play");
	}
	else{
		audio.pause();
		control.style.backgroundImage = "url(pics/play.svg)";
		control.setAttribute("status", "pause");
	}
}
	//3. create nodes for audio
    audio.addEventListener("play",function(){
        if(audio_context == null){
        	audio_context = new AudioContext()
		    source = audio_context.createMediaElementSource(audio)
		    analyser_node = audio_context.createAnalyser();
			//var dataArray = new Uint8Array(analyser_node.frequencyBinCount)
			//5. connect source to effecets and output it
			source.connect(analyser_node);
			source.connect(audio_context.destination);
        }
    	console.log("create audio context.")
    	document.getElementById("play").style.display = "none";
    	drawBeats();
    })

    audio.addEventListener("ended",function(){
    	document.getElementById("play").style.display = "block";
		document.getElementById("controls").style.backgroundImage = "url(pics/play.svg)";
		document.getElementById("controls").setAttribute("status", "pause");
    })
	//gain_node.connect(audio_context.createMediaStreamDestination());
//End create a audio context
var svg = d3.select("#top_b").append("svg").attr("height", h).attr("width", w).attr("style","background-color:white;");
var paths = [
			{color:"rgba(0,0,0,.15)"},
			{color:"rgba(0,0,0,.15)"},
			{color:"rgba(0,0,0,.15)"},
			{color:"rgba(0,0,0,.15)"},
			{color:"rgba(0,0,0,.15)"},
			{color:"rgba(0,0,0,.15)"}]
svg.selectAll("beat_paths").data(paths).enter().append("path").attr("fill", function(d){return d.color;})
.attr("d", "M 0 "+h+" L "+w+" "+h+" Z")

function drawBeats()
{
	var barray = new Uint8Array(analyser_node.frequencyBinCount)
        analyser_node.getByteFrequencyData(barray);
    var generator = d3.svg.line()
    						.x(function(d, i){
    							return i * (w / 30);
    						})
    						.y(function(d){
    							return h-d/3;
    						})
    						.interpolate("basis")
    var sum = 0;

	svg.selectAll("path").attr("d", function(d, i){
	    var array = new Uint8Array(30);
		for(var j = 0; j < 5; j++){
			array[j] = 0;
		}
		for(var j = 5; j < 25; j++){
			array[j] = barray[num[j] + 100 * i];
		}
		for(var j = 25; j < 30; j++){
			array[j] = 0;
		}
		return generator(array);
	})
	

	if(!audio.ended){
	requestAnimationFrame(drawBeats);}

}
var num = new Array();
for(var i  = 0; i < 30; i++)
{
	num[i] = (parseInt(Math.random()*(100)));
}

