Cyclic Redundancy Check - 32-bit
======

A simple CRC32 module that implements the 32-bit cyclic redundancy check, or CRC-32, checksum. This module operates at top performance speed with no dependencies.

#### Installation:

`npm i CRC32`


Usage
---

```js

const
    CRC32 = require( 'crc32' ),
    path  = require( 'path' );

console.log( new CRC32( path.resolve( './test.png' ) ) );

```

`Construction`:
```
const filename = './path/to/file.png';
const options  = {

};

const crc      = new CRC32( filename, options );
```

`Returns`: `Array`

`Values`: `UInt32`, `HEX`, `OCTAL`, `DECIMAL`, ``BINARY`


**Calculation sizes**:

`CRC32.WHOLE` - calculates hash on entire file
`CRC32.B`     - calculates hash on each byte
`CRC32.KB`    - calculates hash on each kilobyte
`CRC32.MB`    - calculates hash on each megabyte
`CRC32.GB`    - calculates hash on each gigabyte

**Calculation outputs**:

`CRC32.BINARY`  = sets output to `binary`
`CRC32.OCTAL`   = sets output to `octal`
`CRC32.DECIMAL` = sets output to `decimal`
`CRC32.HEX`     = sets output to `hex`
`CRC32.INT`     = sets output to `int`


### CLI:
```bash

CRC32 ./path/to/file.png

```
