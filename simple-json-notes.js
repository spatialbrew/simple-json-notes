/*
	Some Teaching Notes
	//Module Pattern
	//DOM Manipulation
	//JSON
	//Controlling Styles via JavaScript
	//Events
	//Liquid Layout
	//Gotchas:  In Internet Explorer versions prior to IE 9, you have to use attachEvent rather than the standard addEventListener (consult MDN)
*/
var simpleNotes = (function(window, document, undefined) {
	//defaults
	var config = {
		version: 'alpha',
		title: 'Simple Slideshow',
		notes: [{
			title: 'Configure via JSON',
			slide: 'Keeping it simple...'
		}, {
			title: 'Use HTML',
			slide: '<strong>Example:  </strong> Hey I just used a strong tag.'
		}, {
			title: 'Something Here',
			slide: 'Whatever, yo'
		}]
	};

	var srcNodeRef;  //REMARK:  This particular widget isn't really designed for passing in a DOM node.  

	function _init() {
		var div = document.createElement('div');
		div.id = 'alphaeasyConfigWizard';
		div.style.margin = '0 auto';
		div.style.position = 'absolute';
		div.style.left = '0';
		div.style.right = '0';
		div.style.width = '60%';
		div.style.height = '600px';
		div.style.borderRadius = '10px';
		div.style.zIndex = 99999;
		div.style.backgroundColor = '#306091';

		//close button
		var x = document.createElement('div');
		x.style.position = 'absolute';
		x.style.top = '1%';
		x.style.right = '1%';
		x.style.fontSize = '1.5em';
		x.style.margin = '5px';
		x.innerHTML = 'X';
		x.style.cursor = 'pointer';
		x.addEventListener('click', function(evt) {
			document.body.removeChild(div);
		});

		//Title
		var title = document.createElement('h1');
		title.style.textAlign = 'center';
		title.style.paddingTop = '2%';
		title.innerHTML = config.title;

		//Notes
		var par = document.createElement('p');
		par.style.textAlign = 'center';
		par.style.fontSize = '2em';
		par.style.marginTop = '14%';
		par.style.marginLeft = '10px';
		par.style.marginRight = '10px';
		par.innerHTML = config.notes[0].slide;
		var index = 0;

		//Previous and Next
		var controls = document.createElement('div');
		controls.style.position = 'absolute';
		controls.style.bottom = '2%';
		controls.style.margin = '0 auto';
		controls.style.left = '0';
		controls.style.right = '0';
		controls.style.width = '65px';
		var next = document.createElement('span');
		var prev = document.createElement('span');
		next.innerHTML = ' -->';
		prev.innerHTML = '<-- ';
		next.style.cursor = 'pointer';
		prev.style.cursor = 'pointer';

		next.addEventListener('click', function(evt) {
			if (index === config.notes.length - 1) {
				index = 0;
			} else {
				index++;
			}

			par.innerHTML = config.notes[index].slide;
			title.innerHTML = config.notes[index].title;
		});
		prev.addEventListener('click', function(evt) {
			if (index === 0) {
				index = config.notes.length - 1;
			} else {
				index--;
			}

			par.innerHTML = config.notes[index].slide;
			title.innerHTML = config.notes[index].title;
		});
		controls.appendChild(prev);
		controls.appendChild(next);
		div.appendChild(controls);
		div.appendChild(x);
		div.appendChild(title);
		div.appendChild(par);

		if(srcNodeRef === undefined){
			document.body.appendChild(div);
		}
		else{
			var containerNode = document.getElementById(srcNodeRef);
			containerNode.appendChild(div);
		}
	}
	//Public API
	return {
		setOptions: function(options, nodeRef) {
			config = options.config;
			srcNodeRef = nodeRef;  //all that positioning CSS is going to make this seem strange, probably.  I'm not using srcNodeRef for this widget
		},
		startup: function() {
			_init();
		}
	};
}(this, this.document));