/** ****************************************************************************************************
 * File: index.js
 * Project: CRC32
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Oct-2015
 *******************************************************************************************************/
'use strict';

const
    { readFile } = require( 'fs' ),
    CRC32        = require( './CRC32' );

function read( fn ) {
    return new Promise(
        ( res, rej ) => readFile( fn,
            ( e, d ) => e ? rej( e ) : res( d )
        )
    );
}

module.exports              = CRC32;
module.exports.read         = read;
module.exports.loadFromFile = ( file, opts ) => read( file ).then( buf => new CRC32( buf, opts ) );