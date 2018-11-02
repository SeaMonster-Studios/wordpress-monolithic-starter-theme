import gulp from 'gulp'
import gutil from 'gulp-util'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import browserSync from 'browser-sync'
const bSync = browserSync.create()
import plumber from 'gulp-plumber'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import eslint from 'gulp-eslint'
import rucksack from 'gulp-rucksack'
import cssnano from 'gulp-cssnano'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import stylelint from 'stylelint'
import reporter from 'postcss-reporter'
import syntaxScss from 'postcss-scss'
import stylelintConfig from './.stylelintrc.json'
import imagemin from 'gulp-imagemin'
import conf_file from './gulpconfig.json'
let conf = conf_file
import consolidate from 'gulp-consolidate'
import bust from 'gulp-cache-bust'
import eslintConfig from './.eslintrc.json'
import concat from 'gulp-concat'
import browserify from 'browserify'
import fs from 'fs'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

gulp.task('config:set', () => {
	conf = JSON.parse(fs.readFileSync('gulpconfig.json'))
	return gulp.src('gulpconfig.json')
})

gulp.task('env:set', () => {
	return gutil.env.production
		? process.env.NODE_ENV = 'production'
		: process.env.NODE_ENV = 'development'
})

gulp.task('scripts:lint', () => {
	return gulp.src(conf.scriptsToLint)
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(`\n\n${error.name}: ${error.message}`), gutil.colors.yellow(`\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`))
			this.emit('end')
		}))
		.pipe(eslint(eslintConfig))
		.pipe(eslint.format())
})

// https://medium.com/@zymnytskiy/how-to-setup-gulp-with-es7-and-react-41b0dcb73d65
// gulp.task('scripts:react-app', () => {
// 	let main = browserify({
// 		entries: `${conf.reactApp}index.js`,
// 		debug: true,
// 	})
// 		.transform('babelify',
// 			{
// 				presets: ['latest', 'stage-0', 'react'],
// 				plugins: ['transform-runtime'],
// 			}
// 		)
// 		.bundle()
// 		.on('error', function(error) {
// 			gutil.log(gutil.colors.red(`\n\n${error.name}: ${error.message}`), gutil.colors.yellow(`\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`))
// 			this.emit('end')
// 		})
// 		.pipe(source('react-app.bundle.js'))
// 		.pipe(buffer())

// 	return process.env.NODE_ENV === 'production'
// 		? main
// 			.pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
// 			.pipe(uglify())
// 			.pipe(rename('react-app.bundle.min.js'))
// 			.pipe(sourcemaps.write('.')) // write .map files near scripts
// 			.pipe(gulp.dest(conf.dist))
// 		: main
// 			.pipe(sourcemaps.init({ loadMaps: true })) // load browserify's sourcemaps
// 			.pipe(concat('react-app.bundle.js'))
// 			.pipe(sourcemaps.write('.')) // write .map files near scripts
// 			.pipe(gulp.dest(conf.dist))
// 			.pipe(bSync.stream())

// })

gulp.task('scripts', ['scripts:lint'], () => {
	let main = gulp.src(conf.scripts) // dev
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(`\n\n${error.name}: ${error.message}`), gutil.colors.yellow(`\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`))
			this.emit('end')
		}))
		.pipe(babel({
			presets: ['es2015', 'env', 'stage-0']
		}))

	return process.env.NODE_ENV === 'production'
		? main
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(concat('app.min.js'))
			.pipe(uglify())
			.pipe(bust())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.dist))
		: main
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(concat('app.js'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.dist))
			.pipe(bSync.stream())
})



gulp.task('styles:lint', () => {
	const processors = [
		stylelint(stylelintConfig),
		reporter({
			clearMessages: true,
			throwError: true,
		})
	]

	return gulp.src(conf.sassFilesToLint)
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(`\n\n${error.name}: ${error.message}`), gutil.colors.yellow(`\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`))
			this.emit('end')
		}))
		.pipe(postcss(processors, { syntax: syntaxScss }))
})

gulp.task('styles', () => {
	let main = gulp.src(conf.sassIndex) // dev
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(`\n\n${error.name}: ${error.message}`), gutil.colors.yellow(`\nPlugin: ${error.plugin}\nFile Name: ${error.fileName}\n`))
			this.emit('end')
		}))

	return process.env.NODE_ENV === 'production'
		? main
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass())
			.pipe(rucksack({
				autoprefixer: true,
			}))
			.pipe(cssnano())
			.pipe(rename((path) => path.basename += '.min'))
			.pipe(bust())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.dist))
		: main
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass())
			.pipe(rucksack({
				autoprefixer: true,
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(conf.dist))
			.pipe(bSync.stream())
})



gulp.task('watch', ['scripts', 'styles'], () => {
// gulp.task('watch', ['scripts', 'scripts:react-app', 'styles'], () => {
	// Serve files from this project's virtual host that has been configured with the server rendering this site
	bSync.init({
		files: [
			{
				options: {
					ignored: '.*',
				},
			},
		],
		port: 8181,
		logPrefix: conf.vhost,
		notify: false,
		proxy: conf.vhost,
		reloadOnRestart: true
	})

	gulp.watch(['gulpconfig.json'], ['config:set', 'scripts'])
	gulp.watch(['src/scripts/**'], ['scripts'])
	// gulp.watch(['react-app/**'], ['scripts:react-app'])
	gulp.watch(['src/styles/**'], ['styles'])
	gulp.watch(['src/images/**'], ['images'])
	gulp.watch(['src/fonts/**'], ['fonts'])
	gulp.watch([conf.watchedViews]).on('change', bSync.reload)
})

gulp.task('fonts', () => {
	return gulp.src('src/fonts/**')
		.pipe(gulp.dest(conf.dist + 'fonts/'))
})

gulp.task('images', () => {
	return gulp.src('src/images/**')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }]
		}))
		.pipe(gulp.dest(conf.dist + 'images/'))
})

gulp.task('default', ['env:set', 'images', 'fonts', 'scripts', 'styles', 'watch'])
gulp.task('build', ['env:set', 'images', 'fonts', 'scripts', 'styles'])

// gulp.task('default', ['env:set', 'images', 'fonts', 'scripts', 'scripts:react-app', 'styles', 'watch'])
// gulp.task('build', ['env:set', 'images', 'fonts', 'scripts', 'scripts:react-app', 'styles'])
