function numbaClick(e){
	
	let numba = document.getElementsByClassName('numba');
	let hLines = document.getElementsByClassName('hLines');
	let bText = document.getElementsByClassName('bText');

	// remove selected
	for (let a=0; a<numba.length; a++){
		numba[a].classList.remove('selected');
		hLines[a].classList.add('hideit');
		bText[a].classList.add('hideit');
}
// add selected to clicked
hLines[e.dataset.num].classList.remove('hideit');
bText[e.dataset.num].classList.remove('hideit');
e.classList.toggle('selected');
}
