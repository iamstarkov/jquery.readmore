;(function ( $, window, document, undefined ) {
	
$.fn.readmore = function (options) {
	var settings = $.extend({
		sentences_number: 3,
		readmore_class: 'readmore_link',
		readmore_text: 'Read more.'
	}, options);
	// console.log('settings', settings);

	return this.each(function(index) {
		/*
		Copy first paragraph
		Save only first `sentences_number` sentences
		Add link `read more`
		Hide Original paragraphs
		On click on `read more` link delete rirst extra paragraph
		Show original paragraphs
		 */

		var text = $(this),
			
			// replace deafult settings with per text data attributes
			sentences_number = text.data('sentences_number') || settings.sentences_number,
			readmore_text = text.data('readmore_text') || settings.readmore_text,
			readmore_class = text.data('readmore_class') || settings.readmore_class,
			
			first_p = text.find('p:first-child').clone();

		text.find('p').hide();
		
		first_p.text(
			first_p
				.text().split('.', sentences_number)
				.join('. ') + '. '
		);

		$('<a/>')
			.text(readmore_text)
			.addClass(readmore_class)
			.prop('href', '#')
			.appendTo(first_p)
			.on('click', function(event) {
				first_p.remove();
				text.find('p').show();

				event.preventDefault();
			});

		text.prepend(first_p);
	});
};

$('.readmore').readmore();
// end of jquery plugin wrap
})( jQuery, window, document );