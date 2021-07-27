var gulp = require('gulp');
var cmdPack = require('gulp-cmd-pack');
var replace = require('gulp-replace');
var eslint = require('gulp-eslint'),
    cache = require('gulp-cached'),
    gulpIf = require('gulp-if'),
    path = require('path'),
    resolve = path.resolve;

function isFixed(file) {
    return file.eslint != null && file.eslint.fixed;
}

gulp.task('quotation', function() {
    gulp.src('./pages/underwriting/quotation/quotationNewAppDev/**')
        .pipe(gulp.dest('./pages/underwriting/quotation/quotationNewApp/'));
});
gulp.task('quotation1', function() {
    gulp.src('./pages/underwriting/quotation/quotationNewApp/util/quotationMain.js')
        .pipe(cmdPack({
            mainId: './pages/underwriting/quotation/quotationNewApp/dist/quotationMain.js', //初始化模块的id   
            base: '.',
            tmpExtNames: ['.html']
        }))
        .pipe(gulp.dest('pages/underwriting/quotation/quotationNewApp/dist/')); //输出到目录 

    gulp.src(['./pages/underwriting/quotation/quotationNewApp/components/main/mainInfoIndex.js'])
        .pipe(replace('../../util/quotationMain', '../../dist/quotationMain'))
        .pipe(gulp.dest('pages/underwriting/quotation/quotationNewApp/components/main/'));
        
    gulp.src(['./pages/underwriting/quotation/quotationNewApp/index.config.js'])
        .pipe(replace('pages/underwriting/quotation/quotationNewAppDev/pages', 'pages/underwriting/quotation/quotationNewApp/pages'))
        .pipe(gulp.dest('pages/underwriting/quotation/quotationNewApp/'));
});


gulp.task('registration', function() {
    gulp.src('./pages/claim/registration/registrationApp/registrationMain.js')
        .pipe(cmdPack({
            mainId: './pages/claim/registration/registrationApp/dist/registrationMain.js', //初始化模块的id   
            base: '.',
            tmpExtNames: ['.html']
        }))
        .pipe(gulp.dest('pages/claim/registration/registrationApp/dist/')); //输出到目录 
    gulp.src(['./pages/claim/registration/registrationApp/index.js'])
        .pipe(replace('./registrationMain', '../../dist/registrationMain'))
        .pipe(gulp.dest('pages/claim/registration/registrationApp/'));
});


gulp.task('dev', function() {
    gulp.src(['./pages/underwriting/quotation/quotationFirstApp/pages/quotationNext/index.js'])
        .pipe(replace('../../dist/quotationNextMain', './quotationNextMain'))
        .pipe(gulp.dest('pages/underwriting/quotation/quotationFirstApp/pages/quotationNext/'));
    gulp.src(['./pages/claim/registration/registrationApp/index.js'])
        .pipe(replace('./registrationMain', '../../dist/registrationMain'))
        .pipe(gulp.dest('pages/claim/registration/registrationApp/'));
});


gulp.task('cached-lint', function() {
    return gulp
        // .src(['./app.config.js', 'app.js', 'app.router.js', './pages/sys/**/*.js'], {base: '.'})
        .src(['./pages/underwriting/riskAccumulation/**/*.js'], { base: '.' })
        .pipe(cache('eslint'))
        .pipe(eslint({ fix: true }))
        .pipe(gulpIf(isFixed, gulp.dest('./')))
        .pipe(eslint.formatEach())
        .pipe(eslint.result(function(result) {
            if (result.warningCount > 0 || result.errorCount > 0) {
                // If a file has errors/warnings remove uncache it
                delete cache.caches.eslint[resolve(result.filePath)];
            }
        }));
});

// Run the "cached-lint" task initially...
gulp.task('cached-lint-watch', ['cached-lint'], function() {
    // ...and whenever a watched file changes
    return gulp
        // .watch(['./app.config.js', 'app.js', 'app.router.js', './pages/sys/**/*.js'], ['cached-lint'], function (event) {
        .watch(['./pages/underwriting/riskAccumulation/**/*.js'], ['cached-lint'], function(event) {
            if (event.type === 'deleted' && cache.caches.eslint) {
                // remove deleted files from cache
                delete cache.caches.eslint[event.path];
            }
        });
});

gulp.task('eslint', function() {
    gulp.src(['./app.config.js', 'app.js', 'app.router.js', './pages/sys/**/*.js'], { base: '.' })
        .pipe(eslint({ fix: true }))
        .pipe(gulpIf(isFixed, gulp.dest('./')))
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError())
        .on('error', function(error) {
            console.log('eslint校验不通过')
        });
});


gulp.task('default', ['dev']);

gulp.task('build', ['qutation', 'registration']);


// gulp.task('build-test', gulp.parallel('qutation', (done) => done()));