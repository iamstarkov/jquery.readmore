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
	 * All sentences separators from this page:
	 * http://en.wikipedia.org/wiki/Punctuation
	 *
	 * comma
	 * ellipsis
	 * exclamation mark
	 * period
	 * question mark
	 * semicolon
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
		sentences_number: 3,
		readmore_text: 'Read more.',
		readmore_toggle_text: 'Read less.',
		readmore_wrap_class: 'readmore_link_wrap',
		readmore_class: 'readmore_link',
		bidirectional: false
	}, options);
	// console.log('settings', settings);

	return this.each(function(index) {

		var text = $(this),
			
			// replace default settings with per text data attributes
			sentences_number     = text.data('sentences_number')     || settings.sentences_number,
			readmore_text        = text.data('readmore_text')        || settings.readmore_text,
			readmore_toggle_text = text.data('readmore_toggle_text') || settings.readmore_toggle_text,
			readmore_wrap_class  = text.data('readmore_wrap_class')  || settings.readmore_wrap_class,
			readmore_class       = text.data('readmore_class')       || settings.readmore_class,
			bidirectional        = text.data('bidirectional')        || settings.bidirectional;
			
			link = get_link(readmore_wrap_class, readmore_class, readmore_text),
			first_p = get_first_p(text, sentences_number);
			// console.log('link', link.text());
			// console.log('first_p', first_p.text());


		/*
		Copy first paragraph
		Save only first `sentences_number` sentences
		Add link `read more`
		Hide Original paragraphs
		On click on `read more` link delete rirst extra paragraph
		Show original paragraphs
		if bidirectional
			add 'readless' link to whole text
			On click to it delete it and run readmore again (go to 1 step)
		 */
		text.find('p').hide();

		link
			.appendTo(first_p)
			.on('click', function(event) {
				first_p.remove();
				text.find('p').show();
				

				if (bidirectional) {
					get_link(readmore_wrap_class, readmore_class, readmore_toggle_text)
						.appendTo(text)
						.on('click', function(event) {
							$(this).remove();
							text.readmore();

							event.preventDefault();
						});
				}
				
				event.preventDefault();
			});


		console.log('first_p', first_p);
		text.prepend(first_p);
	});
};

($('.readmore').length !== 0) && $('.readmore').readmore();

// end of jquery plugin wrap
})( jQuery, window, document );