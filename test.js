/** ****************************************************************************************************
 * File: test.js
 * Project: CRC32
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Jan-2018
 *******************************************************************************************************/
'use strict';




CRC32.WHOLE   = 0;
CRC32.B       = 1;
CRC32.KB      = 1024;
CRC32.MB      = 1048576;
CRC32.GB      = 1073741824;
CRC32.BINARY  = 2;
CRC32.OCTAL   = 8;
CRC32.DECIMAL = 10;
CRC32.HEX     = 16;
CRC32.INT     = 32;

// const buf = fs.readFileSync( './test/crcs.txt' );

// new CRC32( buf, { chunkSize: CRC32.B } )
new CRC32( './test/crcs.txt', { chunkSize: CRC32.B } )
    .then( console.log )
    .catch( console.error );
