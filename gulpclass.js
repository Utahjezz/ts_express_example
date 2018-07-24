"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Decorators_1 = require("gulpclass/Decorators");
var gulp = require("gulp");
var del = require("del");
var shell = require("gulp-shell");
var replace = require("gulp-replace");
var mocha = require("gulp-mocha");
var chai = require("chai");
var tslint = require("gulp-tslint");
var stylish = require("tslint-stylish");
var Gulpfile = /** @class */ (function () {
    function Gulpfile() {
    }
    // -------------------------------------------------------------------------
    // General tasks
    // -------------------------------------------------------------------------
    /**
     * Cleans build folder.
     */
    Gulpfile.prototype.clean = function (cb) {
        return del(["./build/**"], cb);
    };
    /**
     * Runs typescript files compilation.
     */
    Gulpfile.prototype.compile = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell(["tsc"]));
    };
    // -------------------------------------------------------------------------
    // Packaging and Publishing tasks
    // -------------------------------------------------------------------------
    /**
     * Publishes a package to npm from ./build/package directory.
     */
    Gulpfile.prototype.npmPublish = function () {
        return gulp.src("package.json", { read: false })
            .pipe(shell([
            "cd ./build/package && npm publish"
        ]));
    };
    /**
     * Copies all files that will be in a package.
     */
    Gulpfile.prototype.packageFiles = function () {
        return gulp.src("./build/compiled/src/**/*")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Change the "private" state of the packaged package.json file to public.
     */
    Gulpfile.prototype.packagePreparePackageFile = function () {
        return gulp.src("./package.json")
            .pipe(replace("\"private\": true,", "\"private\": false,"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will replace all typescript code blocks in the README (since npm does not support typescript syntax
     * highlighting) and copy this README file into the package folder.
     */
    Gulpfile.prototype.packageReadmeFile = function () {
        return gulp.src("./README.md")
            .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * This task will copy typings.json file to the build package.
     */
    Gulpfile.prototype.copyTypingsFile = function () {
        return gulp.src("./typings.json")
            .pipe(gulp.dest("./build/package"));
    };
    /**
     * Creates a package that can be published to npm.
     */
    Gulpfile.prototype.package = function () {
        return [
            "clean",
            "compile",
            ["packageFiles", "packagePreparePackageFile", "packageReadmeFile", "copyTypingsFile"]
        ];
    };
    /**
     * Creates a package and publishes it to npm.
     */
    Gulpfile.prototype.publish = function () {
        return ["package", "npmPublish"];
    };
    // -------------------------------------------------------------------------
    // Run tests tasks
    // -------------------------------------------------------------------------
    /**
     * Runs ts linting to validate source code.
     */
    Gulpfile.prototype.tslint = function () {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
    };
    /**
     * Runs unit-tests.
     */
    Gulpfile.prototype.unit = function () {
        chai.should();
        chai.use(require("sinon-chai"));
        return gulp.src("./build/compiled/test/unit/**/*.js")
            .pipe(mocha());
    };
    /**
     * Compiles the code and runs tests.
     */
    Gulpfile.prototype.tests = function () {
        return ["clean", "compile", "tslint", "unit"];
    };
    __decorate([
        Decorators_1.Task('clean')
    ], Gulpfile.prototype, "clean");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "compile");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "npmPublish");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "packageFiles");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "packagePreparePackageFile");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "packageReadmeFile");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "copyTypingsFile");
    __decorate([
        Decorators_1.SequenceTask()
    ], Gulpfile.prototype, "package");
    __decorate([
        Decorators_1.SequenceTask()
    ], Gulpfile.prototype, "publish");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "tslint");
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "unit");
    __decorate([
        Decorators_1.SequenceTask()
    ], Gulpfile.prototype, "tests");
    Gulpfile = __decorate([
        Decorators_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
