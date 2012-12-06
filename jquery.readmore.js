/*!
 * jQuery 'best options' plugin boilerplate
 * Author: @cowboy
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

function getLink(wrapClass, innerClass, linkText ) {
	return $('<a/>')
				.addClass(wrapClass)
				.prop('href', '#')
				.html(
					$('<span/>')
						.addClass(innerClass)
						.text(linkText)
					);
}

function getFirstParagraph(text, sentences_number) {
	var paragraph = text.find('p:first-child').clone();

	/**
	 * All sentences separators from this page: http://en.wikipedia.org/wiki/Punctuation
	 *		ellipsis, exclamation mark, period, question mark, semicolon
	 */
		
	var sentence_separators = /\…|\!|\.|\?|\;/gm;
	return paragraph
			.text(
				paragraph
					.text().split(sentence_separators, sentences_number)
					.join('. ') + '. '
			);

}

	$.fn.readmore = function ( custom_options ) {

		options = $.extend( {}, $.fn.readmore.options, custom_options );

		return this.each(function () {

			var elem = $(this);
			var o = $.extend( {}, options, elem.data('readmore') );

			var link = getLink(o.wrapClass, o.innerClass, o.linkText),
				toggleLink = getLink(o.wrapClass, o.innerClass, o.toggleLinkText),
				first_p = getFirstParagraph(elem, o.sentences),
				last_p = elem.find('p').last();

		/*
		Copy first paragraph
		Save only first `sentences_number` sentences
		Add `read more` link
		Hide Original paragraphs
		On click on `read more` link delete rirst extra paragraph
		Show original paragraphs
		if readmore_bidirectional
			add 'readless' link to whole text
			On click to it delete it and run readmore again (go to 1 step)
		 */
		elem.find('p').hide();
		elem.prepend(first_p);

		console.log(o);
		
		link
			[(!!o.inline) ? 'appendTo' : 'insertAfter' ](first_p)
			.on('click', function(event) {
				link.remove();
				first_p.remove();
				elem.find('p').show();
				if (!!o.bidirection) {
					toggleLink
						.insertAfter(last_p)
						.on('click', function(event) {
							$(this).remove();
							elem.readmore(custom_options);

							event.preventDefault();
						});
				}
				
				event.preventDefault();
			});


		});
	};

	$.fn.readmore.options = {
		sentences      : 3,
		inline         : true,
		linkText       : 'Read more',
		toggleLinkText : 'Read less',
		wrapClass      : 'readmore__wrap',
		innerClass     : 'readmore__link',
		bidirection    : false
	};
	

	(function () {
		var a = $('.js_readmore');
		if (!a[0]) return -1;
		a.readmore();
	})();

})( jQuery, window, document );