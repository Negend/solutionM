console.log('Welcome devs, to my site. Still fixing it up so go easy. DONT FORGET TO DOWLOAD MUSIC TOO :-) ')
$(function() {

var playing = false
// t for track number
var t = 0
var track = new Audio()
// var track = document.getElementById('player')

var tracks = [
	{
		song : 'song/yo.ogg',
		cover : 'song/yo.webp',
		title : 'Welcome'
	},
	
	{
		song:'song/drunk.mpeg',
		cover : 'song/drunk.mpeg',
		title:'Drunk Loving'
	},
	
	{	
		song:'song/gas.ogg',
		cover : 'song/gas.ogg',
		title:'Gassed'
	},

	{	
		song:'song/prowl.mpeg',
		cover : 'song/prowl.mpeg',
		title:"Prowl O' Lion"
	}
]

listTracks()
pausePlay()
nextSong()
prevSong()
chooseTrack()
oncePlaying()
trackUpdate(t)
$($('.track')[0]).addClass('selected')
createTimer()
duration()
autoPlay()
keys()

function listTracks(){
	for (var i = 0; i < tracks.length; i++){
		var list = tracks[i].title
		$('#playlist').append("<h6 class='track track"+i+"'>"+list+"</h6>")
	}
}

function chooseTrack(){
	$('.track').each(function(i){
		$('.track'+i).click(function(e){
			trackUpdate(i)
			playTrack()
		})
	})
}



function pausePlay(){	
	$(".play").click(function(e) { 
	  if (playing === false) {
		  playTrack()
		} 
		else{
			pauseTrack()
		}
	})
}



function nextSong(){	
	$(".next").click(function(e){
		var con = false
	// stop whatever is playing 
		if (playing === true){		
			pauseTrack()
			con = true
		}
	// on to the next source on track list
		t = t + 1
		if (t === tracks.length){
			t = 0
		}
	// insert next track
		trackUpdate(t)

	// if audio was already playing, start playing immediately
		if (con === true){
			playTrack()
		}
		colorTracker()
	})
}



function prevSong(){
	$(".previous").click(function(e){	
		var cont = false
// stop whatever is playing 
		if (playing === true){		
			pauseTrack()
			cont = true
		}
	// on to the previous source on track list or reset current	
		if (track.currentTime < 5)
		t = t - 1
		if (t < 0){
			t = 0
		}		
	// update track and title 
		trackUpdate(t)
	// if audio was already playing, start playing immediately
		if (cont === true){
			playTrack()
		}
		colorTracker()
	})
}




// function countDown(T){
// 	var timer= new Array(T)
// 	$($('.stats')[2]).html(timer.length)
// 	timerId = setInterval(function(){	
// 		timer.pop()
// 		$($('.stats')[2]).html(timer.length)
// 		if (timer.length===0){
// 			quit()
// 		}
// 	},1000)
// }



function playTrack(){
	track.play()
	playing = true
}

function pauseTrack(){
	track.pause()
	playing = false
}

function trackUpdate(number){
	t = number
	// insert new disc
	track.src = tracks[number].song
	$('#download-button').attr('download', tracks[number].title)
	$('#download-button').attr('href', tracks[number].song)
var title = tracks[number].title
	var cover = tracks[number].cover
	// song title change
	$("#track-name").html(title)
	$(".music-cover").css('background-image',"url("+cover+")")
	// $(".music-cover").css('background-image',"url("+cover+")")
}

function colorTracker(){
	$('.track').each(function(index){
		$(this).removeClass('selected')
	})
	$('.track'+ t).addClass('selected')
}

function oncePlaying(){
	track.onplay = function(e){
	 	colorTracker()		
	}
}

function duration(){
	track.ondurationchange = function(){
		maxT = track.duration
		progressChange()
	}
}
// create function that creates clickable event listeners for each tiny div relating current time an maxtime

function createTimer(){
	for (var i = 0; i < 100; i++){
		$('.duration').append("<li class='second m-0 p-0'></li>")
	}
	$('.second').each(function(i){
		$(this).click(function(){
			maxT = track.duration
			track.currentTime = i * 0.01 * maxT
		})
	})
}


function progressChange(){
	// colormoving
	track.ontimeupdate = function(){
		var step = track.currentTime/maxT/0.01
		step = Math.floor(step)		
		var n
		var u = 0.1
		u = step
		$('.second').each(function(index){
			$(this).removeClass('progress')
			if(index == step ){
				n = index
			}
			for(i=0;i<n;i++){
				$($('.second')[i]).addClass('progress')
			}
		})
	}
}

function autoPlay(){
	track.onended = function(){
		if (t+1 === tracks.length){
			t=0
		}else{
			t=t+1
		}
		pauseTrack()
		trackUpdate(t)
		playTrack()
	}
}
function keys(){
	$(document).keydown(function(e){
	  if (e.keyCode == 32) { 
	     $('.play').click()     
	  }else if (e.keyCode == 39){
	  	$('.next').click()
	  }else if (e.keyCode == 37){
	  	$('.previous').click()
	  }
	})
}
function lyrics(){
	$('#subtitles').click(function(){
		$('.lyrics').toggleClass('subtitles')
	})
}
lyrics()

})