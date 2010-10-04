(function($, undefined) {

  // Helper for copying CSS values between elements.
  var copyCSS = function(from, to, properties) {
    for (var property in properties) {
      to.css(properties[property], from.css(properties[property]));
    }
  };

  $.fn.example = function(text) {
    return this.each(function() {
      var exampleText = $.isFunction(text) ? text.call(this) : text;
      var field = $(this);
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

      var addBorderWidthToMargin = function(side) {
        return function(index, value) {
          return parseFloat(value) +
              parseFloat(field.css('border-' + side + '-width'));
        }
      };

      // Copy the background and font styling.
      copyCSS(field, example, ['background-image', 'background-attachment',
          'background-origin', 'background-clip', 'background-color',
          'background-position', 'background-repeat', 'font-style', 'font-variant',
          'font-weight', 'font-size', 'line-height', 'font-family',
          'border-top-left-radius', 'border-top-right-radius',
          'border-bottom-right-radius', 'border-bottom-left-radius',
          '-moz-border-radius-topleft', '-moz-border-radius-topright',
          '-moz-border-radius-bottomleft', '-moz-border-radius-bottomright',
          'width', 'height', 'padding-top', 'padding-right',
          'padding-bottom', 'padding-left', 'margin-top', 'margin-left',
          'margin-bottom', 'margin-right']);

      example.css({
        'display':        'inline-block',
        'position':       'relative',
        'left':           field.position().left - example.position().left,
        'margin-top':     addBorderWidthToMargin('top'),
        'margin-right':   addBorderWidthToMargin('right'),
        'margin-bottom':  addBorderWidthToMargin('bottom'),
        'margin-left':    addBorderWidthToMargin('left'),
        'z-index':        function(index, value) {
          var currentIndex = parseFloat(field.css('z-index'));
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
