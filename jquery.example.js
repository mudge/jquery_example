/*
 * Adds example text to form inputs that disappear once data is entered.
 *
 * e.g.
 *  $('input#name').example('Type your message here', {
 *		class_name: 'example_text', 
 *		remove_label: true 
 *	});
 *
 * Copyright (c) Paul Mucur, 2007.
 */
(function($) {
	
	$.fn.example = function(text, args) {
	
		var main_options = $.extend({}, $.fn.example.defaults, args);
	
		return this.each(function() {
			$this = $(this);
			
			/* Support the Metadata plugin. */
			var options = $.meta ? $.extend({}, main_options, $this.data()) : main_options;
					
			/* Initially place the example text in the field. */
			$this.val(text);
			$this.addClass(options.class_name);

			/* If the option is set, remove the associated label (and its line-break if it has one). */
			if (options.remove_label) {
				$('label[@for=' + $this.attr('id') + ']').next('br').remove();
				$('label[@for=' + $this.attr('id') + ']').remove();
			}
		
			/* Make the example text disappear when someone focuses. */
			$this.focus(function() {
				if ($(this).val() == text) {
					$(this).val('');
					$(this).removeClass(options.class_name);
				}
			});
		
			/* Make the example text reappear if the input is blank on blurring. */
			$this.blur(function() {
				if ($(this).val() == '') {
					$(this).val(text);
					$(this).addClass(options.class_name);
				}
			});
		});
	};

	$.fn.example.defaults = {
		class_name: 'example',
		remove_label: false
	};
	
})(jQuery);