# SMS Non-headless Starter Theme

## Production Environment

On your production server, be sure that the SMS_ENVIRONMENT variable is set to "production". This will allow critical-css and minified assets to be used.

## Handling Assets

Assets are included in WP via `./inc/assets.php`. You will find a few asset arrays. If you need to remove or add library assets do it here. Be sure to include the CDN and the name of the local file (and make sure that local file exists within the `./assets` directory).

## Custom Scss/CSS and JS

These are compiled via gulp. Available commands:

Development/Watch mode: `npm run start` or `yarn start`
Create Production build: `npm run build` or `yarn build`

### gulpconfig.json

This is the entry point for your custom assets. Please note that each JS file to be included needs to be do so here, whereas only the entry scss files need to be included (subsequent style includes are handeled within those files).

### Critical CSS

Be sure that anything that's "Critical css" is included within the `./src/styles/critical.scss` file. These are typically styles such as header, marquee, etc (or variables used in those files as well). They are always loaded first in production. All other styles should be included within `./src/styles/app.scss`. The `critical.scss` file is also included here, don't remove it. There is some caching going on with critical styles and if you remove this then critical styles sometimes will not be included.

## ACF

There are already some pre-built acf fields. To activate them go to the ACF admin page and `sync` the fields you want.

## Includes

There are several includes already, and they're all included directly within the `./functions.php` file. Some are not included but left in the `./inc` directory in an as-needed basis.

### Client Logo for Admin Login

Replace the image `/src/images/logo.svg` with the client's logo. It will then be used (instead of the WP logo) when the client visits the admin login.

### HAPPY CODING
