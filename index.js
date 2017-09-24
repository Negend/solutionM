var navOffset = 55; //This should be 56, but 56 is putting the visuals a pixel off.

$(".navbar li a[href^='#']").on('click', function(event) {
    var target = this.hash;
  
    event.preventDefault();
  
    return $('html, body').animate({
      scrollTop: $(this.hash).offset().top - navOffset
    }, 800, function() {
      return window.history.pushState(null, null, target);
    });
  });


	timerId = setInterval(function(){	
	countDown(02,05,2018)

	},900)

function countDown(dd,mm,yyyy){

	var t1 = new Date();
	var t2 = new Date(yyyy, mm, dd, 0, 0, 0, 0);
	var dif = t2.getTime() - t1.getTime();

	var Seconds_from_T1_to_T2 = dif / 1000;
	var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
	var minutes = Math.floor(Seconds_Between_Dates/60)
	var hours = Math.floor(minutes/60)

	var days = Math.floor(hours/24)
	var hrs = hours-(days*24)
	var mins = (minutes-(hours * 60))
	var secs = Math.floor((Seconds_Between_Dates-(minutes*60)))

	timeUpdate('day',days)
	timeUpdate('hrs',hrs)
	timeUpdate('min',mins)
	timeUpdate('sec',secs)
}


function timeUpdate(unit,amount){
	$('.'+unit).html("<h1 class='tock'>"+amount+"</h1><h6 class ='label'>"+unit+"</h6>")
}