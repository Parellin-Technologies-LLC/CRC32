/** ****************************************************************************************************
 * File: index-test.js
 * @author Nicholas Soggin on 10/6/15
 * @version 1.0.0
 *
 * $Id: index.js 2007 2016-01-27 19:58:18Z julian $
 *******************************************************************************************************/
'use strict';

const
    CRC32   = require( '../index.js' ),
    path    = require( 'path' ),
    chai    = require( 'chai' ),
    chaiAsPromised = require( 'chai-as-promised' );

let expect = chai.expect,
    fpath  = './test/crcs.txt',
    test   = new CRC32( path.resolve( fpath ) );

chai.use( chaiAsPromised );

describe( 'crc32', () => {
    it( `should equal [ '213881d1' ]`, () => {
        expect( test ).to.eventually.eql( [ '213881d1' ] )
            .then( r => console.log( `SUCCESS CRC32 of ${fpath} is equal to ${r[ 0 ].toString( 16 )}` ) )
            .catch( console.error );
    } );
} );

