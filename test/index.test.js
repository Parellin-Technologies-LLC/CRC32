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
    const
        b61   = new Buffer( 'a' ),
        b6162 = new Buffer( 'ab' );

    it( 'CRC32 of test/crcs.txt should equal [ "213881d1" ]', () => {
        expect( new CRC32( path.resolve( fpath ) ) ).to.eventually.eql( [ '213881d1' ] );
    } );

    it( '<Buffer 61> should equal [ "79637f4c" ]', () => {
        expect( new CRC32( b61 ) ).to.eventually.eql( [ '79637f4c' ] );
    } );

    it( '<Buffer 61> with BINARY option should return binary formatted CRC', () => {
        expect( new CRC32( b61, { encoding: CRC32.BINARY } ) ).to.eventually.eql( [ '1111001011000110111111101001100' ] );
    } );

    it( '<Buffer 61> with OCTAL option should return binary formatted CRC', () => {
        expect( new CRC32( b61, { encoding: CRC32.OCTAL } ) ).to.eventually.eql( [ '17130677514' ] );
    } );

    it( '<Buffer 61> with DECIMAL option should return binary formatted CRC', () => {
        expect( new CRC32( b61, { encoding: CRC32.DECIMAL } ) ).to.eventually.eql( [ '2036563788' ] );
    } );

    it( '<Buffer 61> with HEX option should return binary formatted CRC', () => {
        expect( new CRC32( b61, { encoding: CRC32.HEX } ) ).to.eventually.eql( [ '79637f4c' ] );
    } );

    it( '<Buffer 61> with INT option should return binary formatted CRC', () => {
        expect( new CRC32( b61, { encoding: CRC32.INT } ) ).to.eventually.eql( [ 2036563788 ] );
    } );

    it( '<Buffer 61 62> with BYTE chunkSize option should return byte chunked CRC', () => {
        expect( new CRC32( b6162, { encoding: CRC32.BINARY, chunkSize: CRC32.B } ) )
            .to.eventually.eql( [ '1111001011000110111111101001100', '11110111111011000111100010101111' ] );
    } );

    it( '<Buffer 61 62> with BYTE chunkSize option should return byte chunked CRC', () => {
        expect( new CRC32( b6162, { encoding: CRC32.HEX, chunkSize: CRC32.B } ) )
            .to.eventually.eql( [ '79637f4c', 'f7ec78af' ] );
    } );

    it( '<Buffer 61 62> with KB chunkSize option should return byte chunked CRC', () => {
        expect( new CRC32( b6162, { encoding: CRC32.INT, chunkSize: CRC32.KB } ) )
            .to.eventually.eql( [ 1699357312 ] );
    } );
} );
