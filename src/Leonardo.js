(function(w) {
	
	$$lib/L.js$$
	$$lib/Ltags.js$$	
	$$lib/Lfilters.js$$	
	$$lib/Lanimate.js$$	
	$$lib/functions.js$$
	$$lib/Element.js$$
	
	w.Leonardo = function (w, h, attrs) {
		if (!w || !h) 
			return {
				ERROR : 'width or height not given!'
			};
		return new L(w, h, attrs);
	};
})(window);