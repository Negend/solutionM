console.log('Welcome devs, to my site. Still fixing it up so go easy. DONT FORGET TO DOWLOAD MUSIC TOO :-) ')
$(function() {

var playing = false
// t for track number
var cont
var t = 0
track = new Audio()
// var track = document.getElementById('player')
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnkR4xpp3Cc407tH2TCFxmUvNYy-sprUg",
    authDomain: "cbxn-87d55.firebaseapp.com",
    databaseURL: "https://cbxn-87d55.firebaseio.com",
    projectId: "cbxn-87d55",
    storageBucket: "gs://cbxn-87d55.appspot.com/",
    messagingSenderId: "1027649275585"
  };
  firebase.initializeApp(config); 

  var storeroot = firebase.storage().ref()
  var musicroot = storeroot.child('Music')
 //  var standbyref = musicroot.child('C.N/Standby Final.mp3')
 //  var pic = storeroot.child('Pictures/Profile/gents.png')
 //  var standby
 // 	standbyref.getDownloadURL().then(function(url){
 //  standby = url
 //  track.src = url
 //  console.log(standby)
	// })



var tracks = [

	{	
		song : 'Chis/Cheap Guy.mp3',
		cover : 'song/gas.ogg',
		title:'Cheap. Guy. Til I. Die.'
	},

	{	
		song:'song/Prowl O lion.mp3',
		cover : 'song/prowl.mpeg',
		title:"Prowl O' Lion"
	},
	{
		song : 'Chis/Neon Beybe.mpeg',
		cover : 'song/yo.ogg',
		title : 'Neon Guts Freestyle'
	},
	{
		song : 'C.N/Standby.mp3',
		cover : 'song/drunk.mpeg',
		title:'Standby'
	}
]

listTracks()
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

			if(i === t){
				pausePlay()
			}else{
				trackUpdate(i)
				playTrack()
			}
			
		})
	})
}


	
$(".play").click(function(e) { 
	  pausePlay()
})
function pausePlay(){	
  if (playing === false) {
	  playTrack(true)
	} 
	else{
		pauseTrack()
	}
}

function nextSong(){	
	$(".next").click(function(e){
		var cont = false
	// stop whatever is playing 
		if (playing === true){		
			pauseTrack()
			cont = true
		}
	// on to the next source on track list
		t = t + 1
		if (t === tracks.length){
			t = 0
		}
	// insert next track
		trackUpdate(t)
	// if audio was already playing, start playing immediately
		if (cont === true){
			playTrack(false)
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
			playTrack(false)
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



function playTrack(load){ 
	if(load){	
				track.play()
		// console.log('i did try to play straight')
	}else{
		track.onloadeddata = function(){
			track.play()
			 
		}
	}
	playing = true
}

function pauseTrack(){
	track.pause()
	playing = false
}
function buffer(){
	track.onwaiting = function(){
		// console.log('buffering')
	}
	// track.onplay = function(){
	// 	console.log('stopped buffering')
	// }
}
buffer()
function trackUpdate(number){
	t = number
	colorTracker()
	var sameTrack = false
	// insert new disc
	trackName = tracks[number].song
	musicroot.child(trackName).getDownloadURL().then(function(url){
  if(track.src == url){
  	return sameTrack = true
  }
  track.src = url
	$('#download-button').attr('download', tracks[number].title)
	$('#download-button').attr('href', url)
	//FOR NOW JUST TAKE THEM TO SOUNDCLOUD
	var b = tracks[number].title
	c = b.replace(/ /g,'-')
	c = c.replace(/\./g,'')
	$('#share-btn').attr('href', 'https://soundcloud.com/chisbeybexnneji/'+c)
	})
	// song title change
	var title = tracks[number].title
	var cover = tracks[number].cover
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
	for (var i = 0; i < 2000; i++){
		$('.duration').append("<li class='second'></li>")
	}
	$('.second').each(function(i){
		$(this).click(function(){
			maxT = track.duration
			track.currentTime = i * 0.0005 * maxT
		})
	})
}


function progressChange(){
	// colormoving
	track.ontimeupdate = function(){
		var step = track.currentTime/maxT/0.0005
		step = Math.floor(step)		
		var n
		var u = step
		$('.second').each(function(index){
			$(this).removeClass('progress')
			if(index == step ){
				n = index
				for(i=0;i<n;i++){
					$($('.second')[i]).addClass('progress')
				}
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




function buffer(){
	track.onwaiting = function(){
		console.log('buffering')
	}
}
buffer()
})