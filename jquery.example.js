/*
 * jQuery Example Plugin 1.3.1
 * Populate form inputs with example text that disappears on focus.
 *
 * e.g.
 *  $('input#name').example('Bob Smith');
 *  $('input[@title]').example(function() {
 *    return $(this).attr('title');
 *  });
 *  $('textarea#message').example('Type your message here', {
 *    class_name: 'example_text',
 *    hide_label: true
 *  });
 *
 * Copyright (c) Paul Mucur (http://mucur.name), 2007-2008.
 * Dual-licensed under the BSD (BSD-LICENSE.txt) and GPL License
 * (GPL-LICENSE.txt).
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
(function($) {
      
  $.fn.example = function(text, args) {
    
    /* Load the default options. */
    var options = $.extend({}, $.fn.example.defaults, args);
    
    /* The following event handlers only need to be bound once
     * per class name. In order to do this, an array of used
     * class names is stored and checked on each use of the plugin. 
     * If the class name is in the array then this whole section 
     * is skipped. If not, the events are bound and the class name 
     * added to the array.
     */
    var bound_class_names = $.fn.example.bound_class_names;
    
    /* If the class name is *not* in the array. */
    if ($.inArray(options.class_name, bound_class_names) == -1) {
      
      /* Because Gecko-based browsers "helpfully" cache form values
       * but ignore all other attributes such as class, all example
       * values must be cleared on page unload to prevent them from
       * being saved.
       */
      $(window).unload(function() {
        $('.' + options.class_name).val('');
      });
      
      /* Clear fields that are still examples before any form is submitted
       * otherwise those examples will be sent along as well.
       * 
       * Previous to 1.3, this would only be bound to forms that were
       * parents of example fields but this meant that a page with
       * multiple forms would not work correctly.
       */
      $('form').submit(function() {
        
        /* Clear only the fields inside this particular form. */
        $(this).find('.' + options.class_name).val('');
      });
      
      /* Add the class name to the array. */
      bound_class_names.push(options.class_name);
      $.fn.example.bound_class_names = bound_class_names;
    }
    
    return this.each(function() {
      var $this = $(this);
      
      /* Initially place the example text in the field if it is empty. */
      if ($this.val() == '') {
        $this.addClass(options.class_name);
        
        /* The text argument can now be a function; if this is the case,
         * call it, passing the current jQuery object as `this`.
         */
        $this.val($.isFunction(text) ? text.call(this) : text);
      }
    
      /* If the option is set, hide the associated label (and its line-break
        * if it has one).
        */
      if (options.hide_label) {
        var label = $('label[@for=' + $this.attr('id') + ']');
        label.next('br').hide();
        label.hide();
      }
    
      /* Make the example text disappear when someone focuses.
       *
       * To determine whether the value of the field is an example or not,
       * check for the example class name only; comparing the actual value
       * seems wasteful and can stop people from using example values as real 
       * input.
       */
      $this.focus(function() {
        if ($(this).is('.' + options.class_name)) {
          $(this).val('');
          $(this).removeClass(options.class_name);
        }
      });
    
      /* Make the example text reappear if the input is blank on blurring. */
      $this.blur(function() {
        if ($(this).val() == '') {
          $(this).addClass(options.class_name);
          
          /* Re-evaluate the callback function every time the user
           * blurs the field without entering anything. While this
           * is not as efficient as caching the value, it allows for
           * more dynamic applications of the plugin.
           */
          $(this).val($.isFunction(text) ? text.call(this) : text);
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
  
  /* All the class names used are stored in the following array. */
  $.fn.example.bound_class_names = [];
  
})(jQuery);
