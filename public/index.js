// fix styling on netlify login link
window.onload = function() {
   let identity = document.getElementsByClassName('netlify-identity-button');
   identity[0].classList.add('nav-link');
};

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

//NETLIFY IDENTITY CODE
const user = netlifyIdentity.currentUser();

// Bind to events
netlifyIdentity.on('init', () => console.log('init', user));
netlifyIdentity.on('login', () => console.log('login', user));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed', user));

// Unbind from events
netlifyIdentity.off('login'); // to unbind all registered handlers
netlifyIdentity.off('login', handler); // to unbind a single handler

// Close the modal
netlifyIdentity.close();

// Log out the user
netlifyIdentity.logout();

// Refresh the user's JWT
// Call in on('login') handler to ensure token refreshed after it expires (1hr)  
// Note: this method returns a promise.
netlifyIdentity.refresh().then((jwt)=>console.log(jwt))

// Change language
netlifyIdentity.setLocale('en');

