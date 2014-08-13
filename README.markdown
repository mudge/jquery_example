jQuery Form Example Plugin 1.6.1 [![Build Status](https://secure.travis-ci.org/mudge/jquery_example.png?branch=master)](http://travis-ci.org/mudge/jquery_example)
======================================

This is a jQuery plugin to populate form inputs with example text that
disappears on focus.

Basic usage revolves around the use of the `example` function like so:

    $('input#name').example('Bob Smith');

This will then put the example text "Bob Smith" into the input with the ID
"name". When a user then focuses on this input, the example text will
disappear, allowing them to enter their data. If they then click elsewhere
*without entering any information*, the example will re-appear.

By default, example text is given the class `example`, allowing you to style
it with CSS like so:

    .example { color: #666; }

If this class name conflicts with one you already use, you can override it
with the `className` option like so:

    $('input#name').example('Bob Smith', { className: 'hint' });

The above example would then be given the class `hint` instead of `example`.

If you plan to use the same options repeatedly, it is possible to override the
plugin's defaults directly:

    $.fn.example.defaults.className = 'notExample';

This will cause any uses of the plugin after this point to use the new
defaults.

As well as supplying the example text via a string, a callback function can be
used instead to determine the value at runtime:

    $('input#name').example(function() {
       return $(this).attr('title'); 
    });

The above example will set the example text to the `title` attribute of the
input. The callback is executed within the context of the input field so, as
in the example above, `$(this)` will return the input itself.

It is worth noting that the callback is evaluated every time the example text
needs to be inserted and *is not cached*. This makes it possible to
dynamically change the example text of a field after page load like so:

    $('input#name').example(function() {
        var text = $(this).attr('title');
        $(this).attr('title', 'Not the original title anymore');
        return text;
    });

The plugin also supports the jQuery Metadata plugin which allows you to 
specify metadata in elements themselves. You can specify the example text and any options like so:

    <input id="m1" class="{example: 'An example', className: 'abc' }" />

Please note that metadata will be overridden by arguments, e.g.

    <input id="m1" class="{example: 'An example'}" />
    $('#m1').example('Another example');

The example will be set to "Another example" instead of "An example".

All events are namespaced with `.example` so they can be selectively unbound with
`unbind('.example')`. The full list is as follows:

* `unload.example` on the `window`;
* `submit.example` on any affected `form`s;
* `focus.example` on affected inputs;
* `change.example` on affected inputs;
* `blur.example` on affected inputs.

As of 1.6.0, if you wish to manually trigger clearing examples from a form (e.g. because you wish to override a form's `submit` event in some way) then you can trigger a special custom event, `example:resetForm` to do so:

```javascript
$('#myform').trigger('example:resetForm');
```

Note that, due to event bubbling, triggering `example:resetForm` on a specific field will actual propagate up to its parent form and reset all examples.

```javascript
/* This will actually bubble up to trigger on #myform. */
$('#myform input.name').trigger('example:resetForm');
```

Downloading
-----------

[Download jQuery Example 1.6.1](https://github.com/mudge/jquery_example/zipball/v1.6.1).

Or use [Bower](http://bower.io/):

```console
$ bower install pacta
```

Testing
-------

As of 1.4, this plugin now comes with a QUnit test suite that you can find
in the test/ directory and run by opening index.html in your browser.

Compatibility
-------------

This plugin has been tested with jQuery 1.6 to 1.7.0 and should work in all
browsers supported by jQuery itself (it has been tested with Safari 5.1.1,
Google Chrome 15.0.874.121, Mozilla Firefox 3.6, Mozilla Firefox 8, Opera 11.52 and
Internet Explorer 6).

Author
------

This plugin was written by and is maintained by Paul Mucur aka "mudge". Please
do not hesitate to contact me with comments and bug reports through GitHub:
https://github.com/mudge/jquery_example/issues

You can view the latest source code (and fork the entire project if you wish)
at http://github.com/mudge/jquery_example

Contributors
------------

The code to support the Metadata plugin was contributed by DeLynn Berry (http://github.com/delynn).

Licensing
---------

Copyright (c) Paul Mucur (http://mudge.name), 2007-2014.

Dual-licensed under the BSD (BSD-LICENSE.txt) and GPL (GPL-LICENSE.txt)
Licenses.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

Donations
---------

[Donations are accepted using Pledgie](http://www.pledgie.com/campaigns/1517)

