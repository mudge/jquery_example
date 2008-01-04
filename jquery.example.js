/*
 * jQuery Example Plugin 1.0.1
 * Adds example text that disappears on focus to form inputs.
 *
 * e.g.
 *  $('input#name').example('Bob Smith');
 *  $('textarea#message').example('Type your message here', {
 *		class_name: 'example_text',
 *		hide_label: true
 *	});
 *
 * Copyright (c) Paul Mucur (http://mucur.name), 2007-2008.
 * Licensed under the BSD License (LICENSE.txt).
 */
(function($) {
	
	$.fn.example = function(text, args) {
		
		/* Load the default options. */
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
		
			/* If the option is set, hide the associated label (and its line-break if it 
				* has one).
				*/
			if (options.hide_label) {
				$('label[@for=' + $this.attr('id') + ']').next('br').andSelf().hide();
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
		hide_label: false
	};
	
})(jQuery);
