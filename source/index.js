(function(w) {
	
	$$lib/L.js$$
	$$lib/Ltags.js$$	
	$$lib/Lgradients.js$$	
    $$lib/Lanimate.js$$	
    // ---
	$$lib/functions.js$$
	$$lib/Element.js$$
	
	var Leonardo = function (w, h, attrs) {
		if (!w || !h) 
			return {
				ERROR : 'width or height not given!'
			};
		return new L(w, h, attrs);
	};
	Leonardo.import = L.import;
	Leonardo.getqs = L.getqs;

	w.Leonardo = Leonardo;
})(window);