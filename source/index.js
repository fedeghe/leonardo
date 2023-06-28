const Leonardo = (function(w) {
	
	$$lib/L.js$$
	$$lib/Lstatic.js$$
	$$lib/Lutilities.js$$
	$$lib/Ltags.js$$	
	$$lib/Lgradients.js$$	
	$$lib/Lfilters.js$$	
    $$lib/Lanimate.js$$	
    $$lib/Lextra.js$$	
    // ---
	$$lib/functions.js$$
	$$lib/Element.js$$
	
	var Leo = function (w, h, attrs) {
		if (!w || !h) 
			throw 'width or height not given!';
		return new L(w, h, attrs);
	};
	Leo.import = L.import;
	Leo.getqs = L.getqs;
    return Leo;
})();
(typeof exports === 'object') && (module.exports = Leonardo);