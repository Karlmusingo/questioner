	

	if(document.getElementById('create') !== null){
		document.getElementById('create').style.display = "block";

	}
	

function operation(evt, oper) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(oper).style.display = "block";
	evt.currentTarget.className += " active";
}

function comment(clicked){
	prompt();
}
comments = document.getElementsByClassName('comments');
for (i = 0; i < comments.length; i++) {
	comments[i].style.display = 'none';
	console.log(comments[i]);
}
function dropdownComments(ulComments){
	console.log(ulComments);
	
	comments = document.getElementById(ulComments);

	if(comments.style.display === 'none'){
		comments.style.display = 'block';
	}else if(comments.style.display === 'block') {
		comments.style.display = 'none'
	}
}
