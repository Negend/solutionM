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
	countDown(22,12,2017)

	},900)

function countDown(dd,mm,yyyy){

	var t1 = new Date();
	var t2 = new Date(yyyy, (mm-1), dd, 0, 0, 0, 0);
	var millisecs = t2.getTime() - t1.getTime();
	var Seconds = Math.floor(millisecs / 1000);
	var minutes = Math.floor(Seconds/60)
	var hours = Math.floor(minutes/60)
	var days = Math.floor(hours/24)
	var hrs = hours-(days*24)
	var mins = (minutes-(hours * 60))
	var secs = Math.floor((Seconds-(minutes*60)))

	timeUpdate('Days',days)
	timeUpdate('Hours',hrs)
	timeUpdate('Mins',mins)
	timeUpdate('Secs',secs)
}


function timeUpdate(unit,amount){
	$('.'+unit).html("<h1 class='tock'>"+amount+"</h1><h6 class ='label'>"+unit+"</h6>")
}


function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}
$('.fa-envelope').click(function(e){
	copyTextToClipboard('chisbeybexnneji@gmail.com')
	alert('email copied to clipboard')
})