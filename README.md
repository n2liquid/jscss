JSCSS
=====

JSCSS is a [PEG.js](http://pegjs.majda.cz) grammar and accompanying JavaScript for generating CSS files intermixed with JavaScript statements.

Example JSCSS stylesheet:

	var $box_size = $('#box').width();

	rule #example {
		width: {10 + $box_size}px;
	}

Given a `#box` element of computed width 10px, the stylesheet above will be transformed into:

	#example {
		width: 20px;
	}

Copying
-------

![](https://www.gnu.org/graphics/lgplv3-147x51.png)

JSCSS is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Exclusion of warranty
---------------------

JSCSS is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

A copy of the LGPLv3 can be found in [COPYING.LESSER.](COPYING.LESSER)

The LGPLv3 supplements the GPLv3. A copy of the GPLv3 can be found in [COPYING.](COPYING)
