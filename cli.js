#!/usr/bin/env node

const CRC32 = require( './index.js' );

/*****************************************************************************************************************
 *
 * COMMAND LINE INTERFACE, ONLY BASIC ERROR CHECKING
 *
 *****************************************************************************************************************/

if ( !process.argv[ 2 ] ) {
    console.log( "Arugument Error - Please specify a file..." );
    process.exit( 1 );
}

new CRC32( process.argv[ 2 ] )
    .then( crcVals => console.log( `CRC - Unsigned decimal printed values:\n%j`, crcVals ) )
    .catch( err => console.error( "ERROR: " + err, err ) );
