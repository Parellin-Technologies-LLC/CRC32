/** ****************************************************************************************************
 * File: index.test.js
 * Project: CRC32
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Jan-2018
 *******************************************************************************************************/
'use strict';

const
    CRC32          = require( '../index.js' ),
    path           = require( 'path' ),
    fpath          = './test/crcs.txt',
    test           = new CRC32( path.resolve( fpath ) ),
    chai           = require( 'chai' ),
    chaiAsPromised = require( 'chai-as-promised' ),
    expect         = chai.expect;

chai.use( chaiAsPromised );

describe( 'crc32', () => {
    it( `should equal [ '213881d1' ]`, () => {
        expect( test ).to.eventually.eql( [ '213881d1' ] );
    } );
} );
