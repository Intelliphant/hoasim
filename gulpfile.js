var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var fs = require('fs');
var merge = require('merge2');
var electron = require('gulp-electron');

var backendProject = ts.createProject('src-backend/tsconfig.json');
var frontendProject = ts.createProject('src-frontend/tsconfig.json');
var electronProject = ts.createProject('src-electron/tsconfig.json');


//main tasks
gulp.task('build', ['move-backend-definition', 'build-frontend', 'build-electron']);

gulp.task('test', ['clean-tests']);


//backend
gulp.task('build-backend', function () {
    var tsResult = backendProject.src().pipe(sourcemaps.init()).pipe(backendProject())
    return merge(
        tsResult.js.pipe(sourcemaps.write('.', { sourceRoot: '../src-backend', includeContent: false })).pipe(gulp.dest("bin/")),
        tsResult.dts.pipe(gulp.dest("."))
    );
});
gulp.task('move-backend-definition', ['build-backend'], function () {
    return merge(
        gulp.src('src-backend/*.d.ts').pipe(gulp.dest('ref/')),
        del('src-backend/*.d.ts')
    );
});

//frontend
gulp.task('build-frontend', ['copy-html-files', 'copy-css-files'], function () {
    var tsResult = frontendProject.src().pipe(sourcemaps.init()).pipe(frontendProject())
    return tsResult.js.pipe(sourcemaps.write('.', { sourceRoot: '../../src-frontend', includeContent: false })).pipe(gulp.dest("bin/www-root"));
});
gulp.task('copy-html-files', function () {
    return gulp.src('src-frontend/**/*.html').pipe(gulp.dest('bin/www-root/'));
});
gulp.task('copy-css-files', function () {
    return gulp.src('src-frontend/**/*.css').pipe(gulp.dest('bin/www-root/'));
});

//electron
gulp.task('build-electron', ['copy-package-file'], function () {
    var tsResult = electronProject.src().pipe(sourcemaps.init()).pipe(electronProject())
    return tsResult.js.pipe(sourcemaps.write('.', { sourceRoot: '../src-electron', includeContent: false })).pipe(gulp.dest("bin/"));
});
gulp.task('copy-package-file', function () {
    return gulp.src('package.json').pipe(gulp.dest('bin/'));
});
gulp.task('clean-old-release', function () {
    return del('release/'); 
});
gulp.task('package', ['clean-old-release', 'build'], function () {
    var packageJson = require('./bin/package.json');
    gulp.src("")
    .pipe(electron({
        src: './bin',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v1.4.14',
        packaging: true,
        // token: 'abc123...',
        platforms: ['darwin-x64','win32-x64','linux-x64'],
        platformResources: {
            darwin: {
                CFBundleDisplayName: packageJson.name,
                CFBundleIdentifier: packageJson.name,
                CFBundleName: packageJson.name,
                CFBundleVersion: packageJson.version,
                icon: 'house.icns' //icon from http://www.iconarchive.com/show/oldies-icons-by-archigraphs/Old-House-icon.html
            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version,
                "icon": 'house.ico' //icon from http://www.iconarchive.com/show/oldies-icons-by-archigraphs/Old-House-icon.html
            }
        }
    }))
    .pipe(gulp.dest(""));
});


//testing
gulp.task('build-tests', function () {
    var tests = ts.createProject('./test-backend/tsconfig.json', { outFile: 'test-backend.js'  });
    return tests.src()
        .pipe(sourcemaps.init())
        .pipe(tests())
        .js
        .pipe(sourcemaps.write('.', { sourceRoot: '', includeContent: false }))
        .pipe(gulp.dest('./test-backend/'));
});

var mocha = require('gulp-mocha');
gulp.task('run-tests', ['build-tests'], function () {
    return gulp.src('./test-backend/test-backend.js', { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha());
});

gulp.task('clean-tests', ['run-tests'], function () {
    return del('./test-backend/test-backend.*');
});