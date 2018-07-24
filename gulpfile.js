let gulp = require('gulp');
let ts = require('gulp-typescript');
let nodemon = require('gulp-nodemon');

const tsProject = ts.createProject("./tsconfig.json");

gulp.task("scripts", () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./build'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch("./src/**/*.ts", ['start']);
});

gulp.task('start', ['scripts'], () => {
    nodemon({
        script: "build/server.js",
        ext: "js"
    })
});

gulp.task('default', ['watch']);