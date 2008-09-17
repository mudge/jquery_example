/*
 * jQuery Form Example Plugin 1.4.1
 * Populate form inputs with example text that disappears on focus.
 *
 * e.g.
 *  $('input#name').example('Bob Smith');
 *  $('input[@title]').example(function() {
 *    return $(this).attr('title');
 *  });
 *  $('textarea#message').example('Type your message here', {
 *    className: 'example_text'
 *  });
 *
 * Copyright (c) Paul Mucur (http://mucur.name), 2007-2008.
 * Dual-licensed under the BSD (BSD-LICENSE.txt) and GPL (GPL-LICENSE.txt)
 * licenses.
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
(function(A){A.fn.example=function(E,C){var D=A.isFunction(E);var B=A.extend({},C,{example:E});return this.each(function(){var F=A(this);if(A.metadata){var G=A.extend({},A.fn.example.defaults,F.metadata(),B)}else{var G=A.extend({},A.fn.example.defaults,B)}if(!A.fn.example.boundClassNames[G.className]){A(window).unload(function(){A("."+G.className).val("")});A("form").submit(function(){A(this).find("."+G.className).val("")});A.fn.example.boundClassNames[G.className]=true}if(A.browser.msie&&!F.attr("defaultValue")&&(D||F.val()==G.example)){F.val("")}if(F.val()==""&&this!=document.activeElement){F.addClass(G.className);F.val(D?G.example.call(this):G.example)}F.focus(function(){if(A(this).is("."+G.className)){A(this).val("");A(this).removeClass(G.className)}});F.blur(function(){if(A(this).val()==""){A(this).addClass(G.className);A(this).val(D?G.example.call(this):G.example)}})})};A.fn.example.defaults={className:"example"};A.fn.example.boundClassNames=[]})(jQuery);