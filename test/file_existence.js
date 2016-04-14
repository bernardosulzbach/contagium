/* jshint mocha: true */

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var pkg = require('./../package.json');
var dirs = pkg['h5bp-configs'].directories;

var expectedFilesInArchiveDir = [
    pkg.name + '_v' + pkg.version + '.zip'
];

var expectedFilesInDistDir = [

    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.htaccess',
    '404.html',
    'apple-touch-icon.png',
    'browserconfig.xml',
    'crossdomain.xml',

    'css/', // for directories, a `/` character
            // should be included at the end
        'css/main.css',
        'css/normalize.css',

    'doc/',
        'doc/TOC.md',
        'doc/css.md',
        'doc/extend.md',
        'doc/faq.md',
        'doc/html.md',
        'doc/js.md',
        'doc/misc.md',
        'doc/usage.md',

    'favicon.ico',

    'images/',
        'images/icons',
            'images/icons/android-chrome-144x144.png',
            'images/icons/android-chrome-192x192.png',
            'images/icons/android-chrome-36x36.png',
            'images/icons/android-chrome-48x48.png',
            'images/icons/android-chrome-72x72.png',
            'images/icons/android-chrome-96x96.png',
            'images/icons/apple-touch-icon-114x114.png',
            'images/icons/apple-touch-icon-120x120.png',
            'images/icons/apple-touch-icon-144x144.png',
            'images/icons/apple-touch-icon-152x152.png',
            'images/icons/apple-touch-icon-180x180.png',
            'images/icons/apple-touch-icon-57x57.png',
            'images/icons/apple-touch-icon-60x60.png',
            'images/icons/apple-touch-icon-72x72.png',
            'images/icons/apple-touch-icon-76x76.png',
            'images/icons/apple-touch-icon.png',
            'images/icons/apple-touch-icon-precomposed.png',
            'images/icons/browserconfig.xml',
            'images/icons/favicon-16x16.png',
            'images/icons/favicon-194x194.png',
            'images/icons/favicon-32x32.png',
            'images/icons/favicon-96x96.png',
            'images/icons/favicon.ico',
            'images/icons/manifest.json',
            'images/icons/mstile-144x144.png',
            'images/icons/mstile-150x150.png',
            'images/icons/mstile-310x150.png',
            'images/icons/mstile-310x310.png',
            'images/icons/mstile-70x70.png',
            'images/icons/safari-pinned-tab.svg',

    'index.html',

    'js/',
        'js/main.js',
        'js/plugins.js',
        'js/vendor/',
            'js/vendor/jquery-' + pkg.devDependencies.jquery + '.min.js',
            'js/vendor/modernizr-2.8.3.min.js',

    'LICENSE.txt',
    'robots.txt',
    'tile-wide.png',
    'tile.png'

];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function checkFiles(directory, expectedFiles) {

    // Get the list of files from the specified directory
    var files = require('glob').sync('**/*', {
        'cwd': directory,
        'dot': true,      // include hidden files
        'mark': true      // add a `/` character to directory matches
    });

    // Check if all expected files are present in the
    // specified directory, and are of the expected type
    expectedFiles.forEach(function (file) {

        var ok = false;
        var expectedFileType = (file.slice(-1) !== '/' ? 'regular file' : 'directory');

        // If file exists
        if (files.indexOf(file) !== -1) {

            // Check if the file is of the correct type
            if (file.slice(-1) !== '/') {
                // Check if the file is really a regular file
                ok = fs.statSync(path.resolve(directory, file)).isFile();
            } else {
                // Check if the file is a directory
                // (Since glob adds the `/` character to directory matches,
                // we can simply check if the `/` character is present)
                ok = (files[files.indexOf(file)].slice(-1) === '/');
            }

        }

        it('"' + file + '" should be present and it should be a ' + expectedFileType, function () {
            assert.equal(true, ok);
        });

    });

    // List all files that should be NOT
    // be present in the specified directory
    (files.filter(function (file) {
        return expectedFiles.indexOf(file) === -1;
    })).forEach(function (file) {
        it('"' + file + '" should NOT be present', function () {
            assert(false);
        });
    });

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function runTests() {

    describe('Test if all the expected files, and only them, are present in the build directories', function () {

        describe(dirs.archive, function () {
            checkFiles(dirs.archive, expectedFilesInArchiveDir);
        });

        describe(dirs.dist, function () {
            checkFiles(dirs.dist, expectedFilesInDistDir);
        });

    });

}

runTests();
