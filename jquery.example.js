/*
 * jQuery Example Plugin 1.1
 * Populate form inputs with example text that disappears on focus.
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
		var options = $.extend({}, $.fn.example.defaults, args);
		
		/* The following event handlers only need to be bound once
		 * per class name. In order to do this, an array of used
		 * class names is stored in the document body and is checked
		 * on each use of the plugin. If the class name is in the
		 * array then this whole section is skipped. If not, the
		 * events are bound and the class name added to the array.
		 */
		var bound_class_names = $.data(document.body, 'example') || [];
		
		if ($.inArray(options.class_name, bound_class_names) == -1) {
			
			/* Because Gecko-based browsers "helpfully" cache form values
			 * but ignore all other attributes such as class, all example
			 * values must be cleared on page unload to prevent them from
			 * being saved.
			 */
			$(window).unload(function() {
				$('.' + options.class_name).val('');
			});
			
			/* Clear fields that are still examples before the form is submitted
			 * otherwise those examples will be sent along as well.
			 */
			$(this).parents('form:first').submit(function() {
				$('.' + options.class_name).val('');
			});
			
			/* Add the class name to the array. */
			bound_class_names.push(options.class_name);
			$.data(document.body, 'example', bound_class_names);
		}
		
		return this.each(function() {
			var $this = $(this);

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
  
  /* Users can override the defaults for the plugin like so:
   *
   *   $.fn.example.defaults.class_name = 'not_example';
   *   $.fn.example.defaults.hide_label = true;
   */
	$.fn.example.defaults = {
		class_name: 'example',
		hide_label: false
	};
	
})(jQuery);
