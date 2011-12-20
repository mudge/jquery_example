/*global window, document, jQuery */

/*
 * jQuery Form Example Plugin 1.5.2
 * Populate form inputs with example text that disappears on focus.
 *
 * e.g.
 *    $('input#name').example('Bob Smith');
 *    $('input[@title]').example(function () {
 *        return $(this).attr('title');
 *    });
 *    $('textarea#message').example('Type your message here', {
 *        className: 'example_text'
 *    });
 *
 * Copyright (c) Paul Mucur (http://mudge.name), 2007-2011.
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.    See the
 * GNU General Public License for more details.
 */
(function ($) {
    "use strict";

    $.fn.example = function (text, args) {

        var isCallback = $.isFunction(text),
            options    = $.extend({}, args, {example: text});

        return this.each(function () {

            var o, clearExamples, $this = $(this);

            /* Merge the plugin defaults with the given options and, if present,
             * any metadata.
             */
            if ($.metadata) {
                o = $.extend({}, $.fn.example.defaults, $this.metadata(), options);
            } else {
                o = $.extend({}, $.fn.example.defaults, options);
            }

            clearExamples = function () {
                $(this).find('.' + o.className).val('');
            };

            /* The following event handlers only need to be bound once
             * per class name. In order to do this, an array of used
             * class names is stored and checked on each use of the plugin.
             * If the class name is in the array then this whole section
             * is skipped. If not, the events are bound and the class name
             * added to the array.
             */
            if (!$.fn.example.boundClassNames[o.className]) {

                /* Because Gecko-based browsers cache form values
                 * but ignore all other attributes such as class, all example
                 * values must be cleared on page unload to prevent them from
                 * being saved.
                 */
                $(window).bind('unload.example', function () {
                    $('.' + o.className).val('');
                });

                /* Clear fields that are still examples before any form is submitted
                 * otherwise those examples will be sent along as well.
                 *
                 * Where possible, attempt to delegate this event handler so that
                 * all forms are bound now and in the future.
                 */
                if ($.fn.on) {
                    $('body').on('submit.example', 'form', clearExamples);
                } else if ($.fn.delegate) {
                    $('body').delegate('form', 'submit.example', clearExamples);
                } else if ($.fn.live) {
                    $('form').live('submit.example', clearExamples);
                } else {
                    $('form').bind('submit.example', clearExamples);
                }

                /* Add the class name to the array. */
                $.fn.example.boundClassNames[o.className] = true;
            }

            /* Several browsers will cache form values even if they are cleared
             * on unload, so this will clear any value that matches the example
             * text and hasn't been specified in the value attribute.
             *
             * If a callback is used, it is not possible or safe to predict
             * what the example text is going to be so all non-default values
             * are cleared. This means that caching is effectively disabled for
             * that field.
             *
             * Many thanks to Klaus Hartl for helping resolve this issue.
             */
            if ($this.val() !== this.defaultValue && (isCallback || $this.val() === o.example)) {
                $this.val(this.defaultValue);
            }

            /* Initially place the example text in the field if it is empty
             * and doesn't have focus yet.
             */
            if ($this.val() === '' && !$this.is(':focus')) {

                /* The text argument can now be a function; if this is the case,
                 * call it, passing the current element as `this`.
                 */
                $this.addClass(o.className).val(isCallback ? o.example.call(this) : o.example);
            }

            /* Make the example text disappear when someone focuses.
             *
             * To determine whether the value of the field is an example or not,
             * check for the example class name only; comparing the actual value
             * seems wasteful and can stop people from using example values as real
             * input.
             */
            $this.bind('focus.example', function () {

                if ($(this).is('.' + o.className)) {
                    $(this).val('').removeClass(o.className);
                }

            }).bind('change.example', function () {

                if ($(this).is('.' + o.className)) {
                    $(this).removeClass(o.className);
                }

            }).bind('blur.example', function () {

                if ($(this).val() === '') {

                    /* Re-evaluate the callback function every time the user
                     * blurs the field without entering anything. While this
                     * is not as efficient as caching the value, it allows for
                     * more dynamic applications of the plugin.
                     */
                    $(this).addClass(o.className).val(isCallback ? o.example.call(this) : o.example);
                }

            });
        });
    };

    /* Users can override the defaults for the plugin like so:
     *
     *     $.fn.example.defaults.className = 'not_example';
     */
    $.fn.example.defaults = {
        className: 'example'
    };

    /* All the class names used are stored as keys in the following array. */
    $.fn.example.boundClassNames = [];

}(jQuery));
