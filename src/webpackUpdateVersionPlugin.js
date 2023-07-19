/* eslint-disable no-unused-vars */

const fs = require( 'fs' );
const readline = require( 'readline' );

// plugin that increments package.json version number.
class WebpackUpdateVersionPlugin {

	/**
   * Constructor,
   * called on webpack config load
   */
	constructor() { }

	/**
   * Webpack apply call,
   * when webpack is initialized and plugin has been called by webpack
   *
   * @protected
   *
   * @param compiler
   */
	apply( compiler ) {
		//add variable to do the updating only once
		let updated = false;

		compiler.hooks.beforeCompile.tapPromise(
			'WebpackUpdateVersionPlugin',
			( params ) => {
				return new Promise( ( resolve, reject ) => {

					if( updated ) return resolve();

					const str = [];

					// we could read the file as JSON and replace the version property,
					// however when we try to write the JSON back to the file it changes the format,
					// so we read it line by line and replace only the version line.
					var lineReader = readline.createInterface( {
						input: fs.createReadStream( './package.json' )
					} );

					lineReader.on( 'line', function ( line ) {
						const trimmed = line.trim();
						if( trimmed.startsWith( '"version":' ) ) {

							//split property name and value
							const vs = trimmed.split( ':' );

							//get version number with regex
							const oldVersion = vs[1].match( /"([^"]+)"/ )[1];

							//increment major version
							const v = oldVersion.split( '.' );
							v[0] = `${ Number( v[0] ) + 1 }`;

							//join version number
							const newVersion = v.join( '.' );

							// push whole line
							str.push( `${ line.split( ':' )[0] }: "${ newVersion }",` );
						} else {
							//push line as is
							str.push( line );
						}
					} );

					lineReader.on( 'close', function () {

						//write file
						fs.writeFileSync( './package.json', str.join( '\n' ) );

					} );

					updated = true;

					resolve();
				} );
			} );
	}
}

module.exports = WebpackUpdateVersionPlugin;