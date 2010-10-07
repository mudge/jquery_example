(function($, undefined) {

  // Helper for copying CSS values between elements.
  var copyCSS = function(from, to, properties) {
    for (var property in properties) {
      to.css(properties[property], from.css(properties[property]));
    }
  };

  $.fn.example = function(text) {
    return this.each(function() {
      var field = $(this);
      var exampleText = $.isFunction(text) ? text.call(this) : text;
      var example = $('<span>' + exampleText + '</span>').insertAfter(field);

      /* Retain the original background of the element so it can
       * restored on blur.
       */
      var originalBackground = {
        'background-image':       field.css('background-image'),
        'background-attachment':  field.css('background-attachment'),
        'background-origin':      field.css('background-origin'),
        'background-clip':        field.css('background-clip'),
        'background-color':       field.css('background-color'),
        'background-position':    field.css('background-position'),
        'background-repeat':      field.css('background-repeat')
      };

      // Copy styling from the field to the example.
      copyCSS(field, example, [

        // Background.
        'background-image', 'background-attachment', 'background-origin',
        'background-clip', 'background-color', 'background-position',
        'background-repeat',

        // Font styling.
        'font-style', 'font-variant', 'font-weight', 'font-size', 'line-height',
        'font-family',

        // Borders.
        'border-top-left-radius', 'border-top-right-radius',
        'border-bottom-right-radius', 'border-bottom-left-radius',
        '-moz-border-radius-topleft', '-moz-border-radius-topright',
        '-moz-border-radius-bottomleft', '-moz-border-radius-bottomright',
        'border-top-width', 'border-right-width', 'border-bottom-width',
        'border-left-width', 'border-top-style', 'border-right-style',
        'border-bottom-style', 'border-left-style',

        // Padding.
        'padding-top', 'padding-bottom',

        // Dimensions.
        'height',

        // Margins.
        'margin-top', 'margin-left', 'margin-bottom', 'margin-right'
      ]);

      example.css({
        'display':        'inline-block',
        'position':       'relative',
        'border-color':   'transparent',
        'width':          field.width() - 2,
        'left':           field.offset().left - example.offset().left,
        'padding-right':  parseInt(field.css('padding-right'), 10) + 1,
        'padding-left':   parseInt(field.css('padding-left'), 10) + 1,
        'z-index':        function(index, value) {
          var currentIndex = parseInt(field.css('z-index'), 10);
          if (isNaN(currentIndex)) {
            return -1;
          } else {
            return currentIndex - 1;
          }
        }
      });

      if (field != document.activeElement) {

        // As long as the element isn't already focused.
        if ('' == $(this).val()) {
          field.css('background', 'transparent');
        }
      }

      field.focus(function() {
        example.hide();
        field.css(originalBackground);
      }).blur(function() {
        if ('' == field.val()) {
          field.css('background', 'transparent');
          example.show();
        }
      });
    });
  };
})(jQuery);
