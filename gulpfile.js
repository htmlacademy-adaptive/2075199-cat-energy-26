import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'gulp-csso';
import squoosh from 'gulp-squoosh';
import libSquoosh from 'gulp-libsquoosh';
import scripts from 'gulp-terser';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import svgstore from 'gulp-svgstore';
import svgo from 'gulp-svgo';
import rename from 'gulp-rename';


// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

// Sctipts

const script = () => {
  return gulp.src('source/js/*.js')
    .pipe(scripts())
    .pipe(gulp.dest('build/js'))
}
// Images

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

// WebP

const createWebP = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(
      libSquoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest('build/img'))
}

// SVG

const optSvg = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img'))
 }

// Sprite

 const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
 }

 // Copy

 const copy = (done) => {
   gulp.src([
     'source/fonts/*.{woff2,woff}',
     'source/*.ico,'
   ], {
     base: 'source'
   })
   .pipe(gulp.dest('build'))
  done();
 }

 // Clean

// Server

function server(done) {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(
  copy,
  images,
  gulp.parallel (
    styles,
    html,
    script,
    createWebP,
    optSvg,
    sprite
  )
)

export default gulp.series(
  copy, html, styles, server, watcher
);
