/** ****************************************************************************************************
 * File: index.js
 * Project: CRC32
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 10-Oct-2015
 *******************************************************************************************************/
'use strict';

const
    { readFile } = require( 'fs' ),
    { extname }  = require( 'path' ),
    CRC32        = require( './CRC32' );


class nodeCRC32 extends CRC32
{
    constructor( fn, opts )
    {
        let buffer = null;

        if( !fn ) {
            throw new Error( 'Argument Error - `fn` is a required parameter' );
        } else if( fn === '' + fn && ( extname( fn ) && ( /(\/|^|.)\.[^\/\.]/g ).test( fn ) ) ) {
            buffer = new Promise(
                ( res, rej ) => readFile( fn,
                    ( e, buf ) => e ? rej( e ) : res( buf )
                )
            );
        } else if( Buffer.isBuffer( fn ) ) {
            buffer = Promise.resolve( fn );
        } else {
            throw new TypeError( 'TypeError - `fn` must be typeof String or Buffer' );
        }

        return Promise.resolve( buffer )
            .then( buf => super( buf, opts ) )
            .catch( console.error );
    }
}

module.exports = nodeCRC32;
