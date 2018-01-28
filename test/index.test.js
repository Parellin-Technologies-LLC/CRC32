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
    chai           = require( 'chai' ),
    chaiAsPromised = require( 'chai-as-promised' ),
    expect         = chai.expect;

chai.use( chaiAsPromised );

describe( 'crc32', () => {
    it( `CRC32 of test/crcs.txt should equal [ '213881d1' ]`, () => {
        expect( new CRC32( path.resolve( fpath ) ) ).to.eventually.eql( [ '213881d1' ] );
    } );

    it( `<Buffer 61> should equal [ '79637f4c' ]`, () => {
        expect( new CRC32( new Buffer( 'a' ) ) ).to.eventually.eql( [ '79637f4c' ] );
    } );
} );
