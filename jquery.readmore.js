;(function ( $, window, document, undefined ) {

function get_link(readmore_wrap_class, readmore_class, readmore_text ) {
	return $('<a/>')
				.addClass(readmore_wrap_class)
				.prop('href', '#')
				.html(
					$('<span/>')
						.addClass(readmore_class)
						.text(readmore_text)
					);
}

function get_first_p(text, sentences_number) {
	var paragraph = text.find('p:first-child').clone();

	/**
	 * All sentences separators from this page: http://en.wikipedia.org/wiki/Punctuation
	 *		comma, ellipsis, exclamation mark, period, question mark, semicolon
	 */
		
	var sentence_separators = /\,|\…|\!|\.|\?|\;/gm;
	return paragraph
			.text(
				paragraph
					.text().split(sentence_separators, sentences_number)
					.join('. ') + '. '
			);

}

$.fn.readmore = function (options) {
	var settings = $.extend({
			sentences      : 3,
			inline         : true,
			linkText       : 'Read more',
			toggleLinkText : 'Read less',
			wrapClass      : 'readmore_link_wrap',
			innerClass     : 'readmore_link',
			bidirectional  : false
		}, options);
	console.log('settings', settings);

	return this.each(function(index) {

		console.log($(this).data());
		var text = $(this),
			
			// replace default settings with per text data attributes
			sentences      = (text.data('readmore-sentences') !== null)      ? text.data('readmore-sentences')      : settings.sentences,
			inline         = (text.data('readmore-inline') !== null)         ? text.data('readmore-inline')         : settings.inline,
			linkText       = (text.data('readmore-linkText') !== null)       ? text.data('readmore-linkText')       : settings.linkText,
			toggleLinkText = (text.data('readmore-toggleLinkText') !== null) ? text.data('readmore-toggleLinkText') : settings.toggleLinkText,
			wrapClass      = (text.data('readmore-wrapClass') !== null)      ? text.data('readmore-wrapClass')      : settings.wrapClass,
			innerClass     = (text.data('readmore-innerClass') !== null)     ? text.data('readmore-innerClass')     : settings.innerClass,
			bidirectional  = (text.data('readmore-bidirectional') !== null)  ? text.data('readmore-bidirectional')  : settings.bidirectional;
			
			link = get_link(wrapClass, innerClass, linkText),
			first_p = get_first_p(text, sentences);
		/*
		Copy first paragraph
		Save only first `sentences_number` sentences
		Add link `read more`
		Hide Original paragraphs
		On click on `read more` link delete rirst extra paragraph
		Show original paragraphs
		if readmore_bidirectional
			add 'readless' link to whole text
			On click to it delete it and run readmore again (go to 1 step)
		 */
		text.find('p').hide();
		
		console.log(
			sentences,
			inline,
			linkText,
			toggleLinkText,
			wrapClass,
			innerClass,
			bidirectional
		);

		$(link)
			[(inline) ? 'appendTo' : 'insertAfter'](first_p)
			.on('click', function(event) {
				first_p.remove();
				text.find('p').show();
				

				if (readmore_bidirectional) {
					get_link(wrapClass, innerClass, toggleLinkText)
						.appendTo(text)
						.on('click', function(event) {
							$(this).remove();
							text.readmore();

							event.preventDefault();
						});
				}
				
				event.preventDefault();
			});

		text.prepend(first_p);
	});
};

(function () {
	var a = $('.js_readmore');
	if (!a[0]) return -1;
	a.readmore();

})();

// end of jquery plugin wrap
})( jQuery, window, document );