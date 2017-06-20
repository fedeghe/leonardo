var filter_id = 0;
/**
 * { function_description }
 *
 * @return     {(Object|string)}  { description_of_the_return_value }
 */
L.prototype.filters = function () {
	var self = this,
		defs = null;
	if (this.defs) {
		defs = this.defs;
	} else {
		defs = this.defs = new Element('defs');
		self.add(this.defs);
	}

	function lid() {
		filter_id++;
		return 'leo_id_' + filter_id;
	}

	function lGrad(steps) {
		var id = lid(),
			linearGrad = new Element('linearGradient'),
			i, tmp;

		linearGrad.attrs({
			id : id,
			x1 : "0%",
			y1 : "0%",
			x2 : "100%",
			y2 : "0%"
		});

		for (i in steps) {
			tmp = new Element('stop');
			tmp.attrs({
				offset : i + '%',
				style : "stop-opacity:1;stop-color:" + steps[i]
			});
			linearGrad.add(tmp)
		}
		defs.add(linearGrad);
		return "url(#" + id + ")";
	}

	function rGrad(steps) {
		var id = lid(),
			radialGrad = new Element('radialGradient'),
			i, tmp;
		radialGrad.attrs({id : id});

		for (i in steps) {
			tmp = new Element('stop');
			tmp.attrs({
				offset : i + '%',
				style : "stop-opacity:1;stop-color:" + steps[i]
			});
			radialGrad.add(tmp)
		}
		defs.add(radialGrad);
		return "url(#" + id + ")";
	}


	return {
		lGrad : lGrad,
		rGrad : rGrad
	};
};
