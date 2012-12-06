jquery.readmore
===============

Defaults:
------

Default settings:

	$.fn.readmore.options = {
		sentences      : 3,
		inline         : true,
		linkText       : 'Read more',
		toggleLinkText : 'Read less',
		wrapClass      : 'readmore__wrap',
		innerClass     : 'readmore__link',
		bidirection    : false
	};


	<div class="biography js_readmore"
		data-readmore='{
			"inline": false,
			"bidirection": true
		}'>
			<!-- tons of text -->
	</div>