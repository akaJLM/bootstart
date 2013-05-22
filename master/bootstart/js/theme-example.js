jQuery(document).ready(function ($) {

/* 
	Necessary for all tooltip theme (Fire first before any js content)
*/
	$("[rel='tooltip']").tooltip({
		delay: {
			show: 100,
			hide: 100
		}
	});
		
			
/*
	chat.html - Chat Bot
*/
	/* Bot */
	$('#message').focus(function(){
		
		var oldMessages = $('#chat-zone .active').html();
		var botThumb = '<img class="img-polaroid" width="40" height="40" alt="User" src="img/av1.jpg">';
		var botMessages = ["Donec ullamcorper nulla ?", "Etiam porta sem malesuada ?", "Good!", "Great!", "Awesome!", "Super!", "Nice!"];
		
		function getMessage() {
		   return botMessages[Math.floor(Math.random() * botMessages.length)];
		};
		
		var botMessage = getMessage();
		
		$('#chat-zone .active').html('<div class="message"><ul><li><a href="#"> ' + botThumb + '</a></li><li>Bot say: ' + botMessage + '</li></ul></div>' + oldMessages);
		$('#chat-zone .active .message:first-child').hide().fadeIn(800);
	});
	
	/* Message */
	$('#send-message').click(function(e){
		
		e.preventDefault();
		
		var userMessage = $('#message').val();
		var oldMessages = $('#chat-zone .active').html();
		var userThumb = '<img class="img-polaroid" width="40" height="40" alt="User" src="img/av2.jpg">';
		
		if(userMessage !== "")
		{
			$('#chat-zone .active').html('<div class="message"><ul><li><a href="#"> ' + userThumb + '</a></li><li>Admin say: ' + userMessage + '</li></ul></div>' + oldMessages);
			$('#chat-zone .active .message:first-child').hide().fadeIn(800);
			$('#message').val("");
		}
	});
});