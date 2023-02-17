//1. create an audio context
var AudioContext = window.AudioContext || window.webkitAudioContext

var audio_context = new AudioContext(),
	source=null,
	analyser_node,
	gain_node,
	audio = document.getElementById("GOTAudio"),
	buffer_,
	array = new Uint8Array(20);


	source = audio_context.createMediaElementSource(audio)
	//3. create nodes for audio
	analyser_node = audio_context.createAnalyser();
	//var dataArray = new Uint8Array(analyser_node.frequencyBinCount)
	//5. connect source to effecets and output it
	source.connect(analyser_node);
	analyser_node.connect(audio_context.destination);
	source.buffer = buffer_;
	//gain_node.connect(audio_context.createMediaStreamDestination());
//End create a audio context
var svg = d3.select("#top_b").append("svg").attr("height", 600).attr("width", 1000).attr("style","margin-left:calc((100% - 1000px)/2);background-color:white;")

function drawBeats()
{
	var barray = new Uint8Array(analyser_node.frequencyBinCount)
        analyser_node.getByteFrequencyData(barray);
        var sum = 0;
        for(var i  =0; i < 20; i++)
        {
        	array[i] = barray[num[i]]/3;
        	sum+=array[i];
        }
	svg.selectAll("circle")
	.data(array)
	.attr("r", function(d, i){return d})
	.attr("fill", function(d,i){return "rgba("+(230-i*11)+",89,131,1)"});

	var offset_b = sum/(20*5) + 1,
		offset_f = offset_b;

	d3.select("#front").attr("style", "top:calc((100% - 100px)/2 - "+offset_f+"px);left:calc((100% - 200px)/2 - "+offset_f+"px);");
	d3.select("#behind").attr("style", "top:calc((100% - 100px)/2 + "+offset_b+"px);left:calc((100% - 200px)/2 + "+offset_b+"px);");
	requestAnimationFrame(drawBeats);

}
var num = new Array();
for(var i  = 0; i < 20; i++)
{
	num[i] = (parseInt(Math.random()*1024));
}
svg.selectAll("beats")
  	.data(array).enter().append("circle")
  	.transition()
  	.duration(100)
  	.attr("cy", 300)
  	.attr("cx", function(d, i){return 100+i*40})
  	.attr("r", function(d, i){return d})
  	.attr("fill", "#EEE");

window.load = drawBeats();