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
			var $this = $(this);

			/* Support the Metadata plugin. */
			var options = $.meta ? $.extend({}, main_options, $this.data()) : main_options;
			
			/* Clear fields that are still examples before the form is submitted
			 * otherwise those examples will be sent along as well.
			 */
			$this.parents('form').submit(function() {
				if ($this.hasClass(options.class_name)) {
					$this.val('');
				}
			});
			
			/* Initially place the example text in the field if it is empty. */
			if ($this.val() == '') {
				$this.addClass(options.class_name);
				$this.val(text);
			}
		
			/* If the option is set, remove the associated label (and its line-break if it has one). */
			if (options.remove_label) {
				$('label[@for=' + $this.attr('id') + ']').next('br').andSelf().remove();
			}
		
			/* Make the example text disappear when someone focuses.
			 *
			 * To determine whether the value of the field is an example or not,
			 * check for the example class name only; comparing the actual value
			 * seems wasteful and can stop people from using example values as real 
			 * input.
			 */
			$this.focus(function() {
				if ($(this).hasClass(options.class_name)) {
					$(this).val('');
					$(this).removeClass(options.class_name);
				}
			});
		
			/* Make the example text reappear if the input is blank on blurring. */
			$this.blur(function() {
				if ($(this).val() == '') {
					$(this).addClass(options.class_name);
					$(this).val(text);
				}
			});
		});
	};

	$.fn.example.defaults = {
		class_name: 'example',
		remove_label: false
	};
	
})(jQuery);
