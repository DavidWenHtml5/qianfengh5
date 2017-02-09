//引入 gulp
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');

//js 压缩
gulp.task('minjs',function(){
	gulp.src('libs/js/*.js').pipe(uglify()).pipe(gulp.dest('libs/dist/js'));
})

//css 压缩
gulp.task('mincss',function(){
	gulp.src('libs/css/*.css').pipe(minify()).pipe(gulp.dest('libs/dist/css'));
})

//图片压缩
gulp.task('imagemin',function(){
	gulp.src(['libs/images/*.+(jpg|png|jpeg|gif)']).pipe(imagemin()).pipe(gulp.dest('libs/dist/images'));
})

//检查脚本
gulp.task('lint',function(){
	gulp.src(['libs/js/*.js','libs/es6js/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
})

//合并压缩js
gulp.task('allminjs',function(){
	gulp.src('libs/js/*.js')
	.pipe(concat('jqall.js'))
	.pipe(gulp.dest('libs/dist/js'))
	.pipe(rename('jqall.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('libs/dist/js'));
})

//合并压缩css
gulp.task('allmincss',function(){
	gulp.src('libs/css/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('libs/dist/css'))
	.pipe(rename('all.min.css'))
	.pipe(minify())
	.pipe(gulp.dest('libs/dist/css'));
})

//使用connect启动一个Web服务器
gulp.task('connect',function(){
	connect.server({
		root:'',
		port:8070,
		livereload:true
	})
})

//scss转换css
gulp.task('sass',function(){
	gulp.src('libs/scss/*.scss').pipe(sass()).pipe(gulp.dest('libs/css'));
})

//es6
gulp.task('es6',function(){
	gulp.src('libs/es6js/*.js')
	.pipe(babel())
	.pipe(gulp.dest('libs/dist/es6js'))
	.pipe(webpack({
		output:{
			filename:'all.js'
		},
		stats:{
			color:true
		},
		module:{
			loaders:[{test:/\.js$/,loaders:['babel']}]
		}		
	}))
	.pipe(gulp.dest('libs/dist/es6js'));
})

//更新网页
gulp.task('html',function(){
	gulp.src('*.html').pipe(connect.reload());
})

//创建watch任务
gulp.task('watch',function(){
	gulp.watch(['*.html'],['html']);
	gulp.watch(['libs/dist/js/*.js'],['html']);	
	gulp.watch(['libs/es6js/*.js'],['es6']);
	gulp.watch(['libs/js/*.js'],['minjs']);
	gulp.watch(['libs/js/*.js'],['allminjs']);
	gulp.watch(['libs/scss/*.scss'],['sass']);
	gulp.watch(['libs/dist/css/*.css'],['html']);
	gulp.watch(['libs/css/*.css'],['mincss']);
	gulp.watch(['libs/css/*.css'],['allmincss']);
	gulp.watch(['libs/images/*.+(jpg|png|jpeg|gif)'],['imagemin']);
})

//默认操作
gulp.task('default',function(){
	gulp.run('watch','connect','sass','es6','imagemin');
})
