$(function(){ // After the page load Run the javascript
$('#password, #confirm_password').on('keyup', function () {
	console.log('password key entered');
	var length = $('#password').val().length;
	if(length > 0){
	  if ($('#password').val() == $('#confirm_password').val()) {
		$('#message').html('Matching').css('color', 'green');
	  } else {
		$('#message').html('Not Matching').css('color', 'red');
	  }
	}
	else{
		$('#message').html('');
	}
});



}); //document load