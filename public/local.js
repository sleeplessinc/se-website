

log("local.js");

function goHash( hash = document.location.hash ) {
	log( "goHash "+hash );
	let el = document.body.find1( hash );
	if( el ) {
		log( " scrolling to "+el );
		el.scrollIntoView();
	}
};

/*
$( document ).ready( evt => {
	log( "doc ready" );

	let hash = document.location.hash;
	if( hash ) {
		let el = document.body.find1( hash );
		if( el ) {
			el.scrollIntoView();
		}
	}


} );
*/

