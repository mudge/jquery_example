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
(function(A){A.fn.example=function(E,D){var C=A.extend({},A.fn.example.defaults,D);var B=A.data(document.body,"example")||[];if(A.inArray(C.class_name,B)==-1){A(window).unload(function(){A("."+C.class_name).val("");});A(this).parents("form:first").submit(function(){A("."+C.class_name).val("");});B.push(C.class_name);A.data(document.body,"example",B);}return this.each(function(){var F=A(this);if(F.val()==""){F.addClass(C.class_name);F.val(E);}if(C.hide_label){A("label[@for="+F.attr("id")+"]").next("br").andSelf().hide();}F.focus(function(){if(A(this).hasClass(C.class_name)){A(this).val("");A(this).removeClass(C.class_name);}});F.blur(function(){if(A(this).val()==""){A(this).addClass(C.class_name);A(this).val(E);}});});};A.fn.example.defaults={class_name:"example",hide_label:false};})(jQuery);