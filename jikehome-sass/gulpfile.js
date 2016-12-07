var gulp = require('gulp'),
	compass = require('gulp-compass'),
	mincss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	// concat = require('gulp-concat');
	htmlmin = require('gulp-htmlmin');
	rev = require('gulp-rev');
	revCollector = require('gulp-rev-collector');

gulp.task('html', function(){
	gulp.src('./index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build/'));

});

gulp.task('css',function(){
	//编译、压缩 css
	gulp.src('./sass/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'css',
			sass: 'sass'
		}))
		.pipe(mincss())
		.pipe(rev())
		.pipe(gulp.dest('./build/css'))
		.pipe(rev.manifest({
			merge: true
		}))//- 生成一个rev-manifest.json
        .pipe(gulp.dest('./build/rev'));
});
gulp.task('rev', function(){
	gulp.src(['./build/rev/*.json', './build/*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./build/'));
});
gulp.task('js',function(){
	//js压缩
	gulp.src('./js/index.js')
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./build/js'))
		.pipe(rev.manifest({
			merge: true//这里不知道为什么不能合并
		}))//- 生成一个rev-manifest.json
		.pipe(gulp.dest('./build/rev'));
});

gulp.task('img',function(){
	gulp.src(['./image/*.png','./image/*.jpg','./image/*.gif'])
		.pipe(gulp.dest('./build/image'));
});

gulp.task('watch',function(){
	gulp.watch('./sass/*.scss',['css']);
});

gulp.task('default', ['watch','js','rev','css','html','rev','img'], function() {
  // 将你的默认的任务代码放在这
});