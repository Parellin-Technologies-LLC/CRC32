#!/usr/bin/env node
'use strict';

const
    { readFile }         = require( 'fs' ),
    { resolve, extname } = require( 'path' ),
    CRC32                = require( './index.js' ),
    acceptedEncoding     = [ 'BINARY', 'OCTAL', 'DECIMAL', 'HEX', 'INT' ],
    acceptedChunkSize    = [ 'WHOLE', 'B', 'KB', 'MB', 'GB' ];

if( process.argv.includes( '-h' ) || process.argv.includes( '--help' ) ) {
    console.log( '  ' );
    console.log( '  CRC32' );
    console.log( '  faster-crc32 - Perform a 32bit Cyclic Redundancy Check' );
    console.log( '  ' );
    console.log( '  Use:' );
    console.log( '      crc32 [file_name] [encoding?] [chunk_size?]' );
    console.log( '  ' );
    console.log( '  Options:' );
    console.log( '      -h, --help' );
    console.log( '      -e, --encoding    format to output (BINARY, OCTAL, DECIMAL, HEX, INT)' );
    console.log( '      -c, --chunk_size  chunk size of file to hash (WHOLE, B, KB, MB, GB)' );
    console.log( '  ' );
    console.log( '  Example:' );
    console.log( '      crc32 ./README.md -c whole -e hex' );
    console.log( '  ' );
    process.exit( 0 );
}

if( !process.argv[ 2 ] || ( !extname( process.argv[ 2 ] ) && !( /(\/|^|.)\.[^\/\.]/g ).test( process.argv[ 2 ] ) ) ) {
    console.log( 'Argument Error - Please specify a file...' );
    process.exit( 1 );
}

process.argv[ 2 ] = resolve( process.argv[ 2 ] );

const opts = {};

if( process.argv[ 3 ] ) {
    const args = process.argv.splice( 3 );

    args.forEach(
        ( item, i ) => {
            if( i % 2 !== 0 ) {
                return;
            }

            const
                isEncoding  = item.match( /--encoding/i ) || item.match( /-e/i ),
                isChunkSize = item.match( /--chunk_size/i ) || item.match( /-c/i );

            if( i + 1 >= args.length && ( isEncoding || isChunkSize ) ) {
                console.error(
                    [
                        `Unaccepted Parameter: "undefined" for option ${ isEncoding ? '--encoding' : '--chunk_size' }`,
                        `  Accepted: ${ isEncoding ? 'BINARY, OCTAL, DECIMAL, HEX, INT' : 'WHOLE, B, KB, MB, GB' }`
                    ].join( '\n' )
                );

                process.exit( 1 );
            }

            const input = args[ i + 1 ].toUpperCase();

            if( isEncoding && !isChunkSize && acceptedEncoding.includes( input ) ) {
                opts.encoding = CRC32[ input ];
            } else if( isChunkSize && !isEncoding && acceptedChunkSize.includes( input ) ) {
                opts.chunkSize = CRC32[ input ];
            } else {
                console.error(
                    [
                        `Unaccepted Output Type: "${ input }" for option ${ isEncoding ? '--encoding' : '--chunk_size' }`,
                        `  Accepted: ${ isEncoding ? 'BINARY, OCTAL, DECIMAL, HEX, INT' : 'WHOLE, B, KB, MB, GB' }`
                    ].join( '\n' )
                );

                process.exit( 1 );
            }
        }
    );
}

function read( fn ) {
    return new Promise(
        ( res, rej ) => {
            readFile( fn,
                ( e, d ) => e ? rej( e ) : res( d )
            );
        }
    );
}

read( process.argv[ 2 ] )
    .then( buffer => new CRC32( buffer, opts ) )
    .then( d => console.log( JSON.stringify( d ) ) )
    .catch( err => console.error( 'Error: ' + err, err ) );
