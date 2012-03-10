/*global module, test, equal, ok, jQuery */
(function ($) {
    "use strict";

    /* If there is no delegation support, forcibly reset the plugin between
     * test runs
     */
    function resetPlugin() {
        if (!$.fn.on && !$.fn.delegate && !$.fn.live) {
            $.fn.example.boundClassNames = [];
        }
    }

    module("Basic usage", {
        setup: function () {
            $('#basic1').example('Test');
            $('#basicform').submit(function (e) {
                e.preventDefault();
            });
        },
        teardown: resetPlugin
    });
    test("should have an example set", function () {
        equal($('#basic1').val(), "Test", "The example should read 'Test'.");
        ok($('#basic1').hasClass('example'), "The class should be 'example'.");
    });
    test("should be cleared on focus", function () {
        $('#basic1').focus();

        equal($('#basic1').val(), "", "The example should be cleared.");
        ok(!$('#basic1').hasClass('example'), "The class should no longer be 'example'.");
    });
    test("should reappear on blur if empty", function () {
        $('#basic1').focus().blur();

        equal($('#basic1').val(), "Test", "The example should read 'Test'.");
        ok($('#basic1').hasClass('example'), "The class should be 'example'.");
    });
    test("should not be populated with an example on blur if user input is present", function () {
        $('#basic1').focus();
        $('#basic1').val("My own value");
        $('#basic1').blur();

        equal($('#basic1').val(), "My own value", "The example should not be cleared.");
        ok(!$('#basic1').hasClass('example'), "The class should not be 'example'.");
    });
    test("should not be populated with an example on focus if user input is present", function () {
        $('#basic1').focus().val("My own value").blur().focus();

        equal($('#basic1').val(), "My own value", "The example should not be cleared.");
        ok(!$('#basic1').hasClass('example'), "The class should not be 'example'.");
    });
    test("should be cleared on form submit", function () {
        $('#basicform').submit();

        equal($('#basic1').val(), "", "The example should be cleared.");
    });
    test("shouldn't clear user inputs on form submit", function () {
        $('#basic2').focus().val("User input");
        $('#basicform').triggerHandler('submit');

        equal($('#basic2').val(), "User input", "The user input should be intact.");
    });

    module("Using custom classes", {
        setup: function () {
            $('#custom1').example("Test", {className: "notExample"});
        },
        teardown: resetPlugin
    });
    test("should have an example set", function () {
        equal($('#custom1').val(), "Test", "The example should be set.");
        ok($('#custom1').hasClass('notExample'), "The class should be the specified one.");
        ok(!$('#custom1').hasClass('example'), "The class should not be 'example'.");
    });
    test("should be cleared on focus", function () {
        $('#custom1').focus();

        equal($('#custom1').val(), "", "The example should be cleared.");
        ok(!$('#custom1').hasClass('notExample'), "The class should not be the specified one.");
    });
    test("should be reappear on blur", function () {
        $('#custom1').focus().blur();

        equal($('#custom1').val(), "Test", "The example should reappear.");
        ok($('#custom1').hasClass('notExample'), "The class should be the specified one.");
    });

    module("Multiple forms", {
        setup: function () {
            $('#multipleform1, #multipleform2').submit(function (e) {
                e.preventDefault();
            });
            $('#mf1').example('Test');
            $('#mf2').example('Test');
        },
        teardown: resetPlugin
    });
    test("should only clear examples in that form", function () {
        $('#multipleform1').submit();

        equal($('#mf1').val(), "", "The example should be cleared.");
        equal($('#mf2').val(), "Test", "An example in another form should not be cleared.");
    });

    module("Simple callback", {
        setup: function () {
            $('#callback1').example(function () { return "Callback Test"; });
        },
        teardown: resetPlugin
    });
    test("should have an example set", function () {
        equal($('#callback1').val(), "Callback Test", "The example should read 'Callback Test'.");
        ok($('#callback1').hasClass('example'), "The class should be 'example'.");
    });
    test("should be cleared on focus", function () {
        $('#callback1').focus();

        equal($('#callback1').val(), "", "The example should be cleared.");
        ok(!$('#callback1').hasClass('example'), "The class should no longer be 'example'.");
    });
    test("should reappear on blur if empty", function () {
        $('#callback1').focus().blur();

        equal($('#callback1').val(), "Callback Test", "The example should read 'Callback Test'.");
        ok($('#callback1').hasClass('example'), "The class should be 'example'.");
    });

    module("More complicated callback", {
        setup: function () {
            $('#callback2').example(function () {
                return $(this).attr('title');
            });
        },
        teardown: resetPlugin
    });
    test("should have an example set", function () {
        equal($('#callback2').val(), "Starting", "The example should read 'Starting'.");
        ok($('#callback2').hasClass('example'), "The class should be 'example'.");
    });
    test("should be cleared on focus", function () {
        $('#callback2').focus();

        equal($('#callback2').val(), "", "The example should be cleared.");
        ok(!$('#callback2').hasClass('example'), "The class should no longer be 'example'.");
    });
    test("should reappear on blur if empty", function () {
        $('#callback2').focus().blur();

        equal($('#callback2').val(), "Starting", "The example should read 'Starting'.");
        ok($('#callback2').hasClass('example'), "The class should be 'example'.");
    });
    test("should run the callback every time instead of caching it", function () {
        $('#callback2').attr('title', 'Another');
        $('#callback2').focus().blur();

        equal($('#callback2').val(), "Another", "The example should read 'Another'.");
        ok($('#callback2').hasClass('example'), "The class should be 'example'.");
    });

    module("Metadata plugin", {
        setup: function () {
            $('#m1').example();
        },
        teardown: resetPlugin
    });
    test("should have an example set", function () {
        equal($('#m1').val(), "Something", "The example should read 'Something'.");
        ok($('#m1').hasClass('m1'), "The class should be 'm1'.");
    });
    test("should be cleared on focus", function () {
        $('#m1').focus();

        equal($('#m1').val(), "", "The example should be cleared.");
        ok(!$('#m1').hasClass('m1'), "The class should no longer be 'm1'.");
    });
    test("should reappear on blur if empty", function () {
        $('#m1').focus().blur();

        equal($('#m1').val(), "Something", "The example should read 'Something'.");
        ok($('#m1').hasClass('m1'), "The class should be 'm1'.");
    });
    test("should be overridden by arguments", function () {
        $('#m2').example('Precedence', {className: 'o1'});

        equal($('#m2').val(), "Precedence", "The example in the arguments should take precedence");
        ok($('#m2').hasClass('o1'), "The class should be 'o1'.");
    });

    module("On page load", {
        teardown: resetPlugin
    });
    test("should not set an example if a value is already set", function () {
        $('#load1').example("Test");

        equal($('#load1').val(), "Already filled in", "The example should not be set.");
        ok(!$('#load1').hasClass('example'), "The class should not be 'example'.");
    });
    test("should not clear a field with a value even when using a callback", function () {
        $('#load2').example(function () {
            return "Nope";
        });

        equal($('#load2').val(), "Default", "The value should be the default.");
        ok(!$('#load2').hasClass('example'), "The class should not be 'example'.");
    });

    module("Changing values by Javascript", {
        setup: function () {
            $('#f1').example('Example');
        },
        teardown: resetPlugin
    });
    test("should set example", function () {
        equal($('#f1').val(), "Example", "The example should read 'Example'.");
        ok($('#f1').hasClass('example'), "The example class should be set.");
    });

    test("should remove example class when changed", function () {
        $('#f1').val("New value");
        $('#f1').change();

        equal($('#f1').val(), "New value", "Value should be changed to 'New value'.");
        ok(!$('#f1').hasClass('example'), "The example class should no longer be set.");

        /* Clear the field between test runs. */
        $('#f1').val('');
    });

    module("Clearing values when loaded from cache", {
        teardown: resetPlugin
    });
    test("value should be set to default value", function () {

        /* Fake loading from cache by setting the example to be different to
         * the recorded defaultValue.
         */
        $('#c1').val('Cached example').example('Cached example');
        equal($('#c1').val(), "Filled in", "Value should have been reset to 'Filled in'.");
    });
    test("value should be cleared and set to the example if without default", function () {
        $('#c2').val('Cached example').example('Cached example');
        equal($('#c2').val(), 'Cached example', "Value should have been emptied.");
        ok($('#c2').hasClass('example'), 'The example class should be set.');
    });
    test("value is not touched if it doesn't match the example", function () {
        $('#c3').val('Some user input').example('Test');
        equal($('#c3').val(), 'Some user input', 'Value should not have been modified.');
        ok(!$('#c3').hasClass('example'), 'The example class should not be set.');
    });
    test('value is always cleared if the example is a callback', function () {
        $('#c4').val('Some user input').example(function () {
            return 'Test';
        });
        equal($('#c4').val(), 'Test', 'The cached value is overridden.');
        ok($('#c4').hasClass('example'), 'The example class should be set.');
    });
    test('value is not touched if it is the default', function () {
        $('#c5').val('Some default').example('Test');
        equal($('#c5').val(), 'Some default', 'Value should not have been modified.');
        ok(!$('#c5').hasClass('example'), 'The example class should not be set.');
    });

    module('Custom events', {
        teardown: resetPlugin
    });
    test('a specific form is cleared when calling example:resetForm on it', function () {
        $('#ce1, #ce2').example('Testing');
        $('#custom').trigger('example:resetForm');
        equal($('#ce1').val(), '', 'The value should have been cleared.');
        ok(!$('#ce1').hasClass('example'), 'The example class should not be set.');
        equal($('#ce2').val(), 'Testing', 'The value should not have been cleared.');
        ok($('#ce2').hasClass('example'), 'The example class should be set.');
    });
    test('triggering example:resetForm on a field will bubble to the form', function () {
        $('#ce1').example('Testing');
        $('#ce1').trigger('example:resetForm');
        equal($('#ce1').val(), '', 'The value should have been cleared.');
        ok(!$('#ce1').hasClass('example'), 'The example class should not be set.');
    });
}(jQuery));
