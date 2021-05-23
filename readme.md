# Hugo Starter Theme with Tailwind CSS

Starter files for a Hugo theme with Tailwind CSS.

- set up to use [Tailwind CSS](https://tailwindcss.com) - v2.0+
- includes the [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin for styling of markdown content
- use [Hugo Pipes](https://gohugo.io/hugo-pipes/) to build and load css based on `dev` or `build` environment
- purge unused css classes with [PurgeCSS](https://www.purgecss.com) for `build`, but __not__ in `dev`
- works as separate theme repo or as a local theme folder within a Hugo site
- basic template setup with an index page, an about page and a posts category
- responsive navigation header ~~with minimal javascript~~ with pure css to hide the nav on small screens
- to keep that s***er down, the theme features a sticky footer
- included helper partials to show Hugo parameters and Tailwind CSS breakpoints during development

_Live long and code._

## What this theme is NOT

This theme is a starter setup theme to aid in developing Hugo themes using the Tailwind CSS framework. It is ***not*** a standalone theme ready to use.

## Prerequisites

Make sure to install `postcss-cli` and `autoprefixer` globally in your environment, as Hugo Pipe’s PostCSS requires it. This is mentioned in the [Hugo Docs](https://gohugo.io/hugo-pipes/postcss/).

```bash
npm install -g postcss-cli
npm install -g autoprefixer
```

Make sure to use a minimum Hugo version of v0.69.0 and above.

Set the `writeStats` option in your Hugo `config` file, so that purging of CSS classes works in production. See `/exampleSite/config.toml` as a guideline.

```toml
[build]
  writeStats = true
```

## Basic usage to develop a separate Theme repo

- clone and rename the repo

```bash
git clone https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter new-theme-name
```

- to make that theme your own, switch into the newly created folder, remove the git history from this starter repo and initiate a new git repo

```bash
cd new-theme-name
rm -rf .git
git init
```

- now install the necessary node packages

```bash
npm install
```

- edit the `config.toml` file in `exampleSite/` to reflect the `new-theme-name`

```toml
# in config.toml
theme = "new-theme-name" # your new theme name here
```

- start a server to develop with `exampleSite`

```bash
hugo server -s exampleSite --themesDir=../.. --disableFastRender
```

## Usage directly within a Hugo repo as a theme package

- start a new Hugo site

```bash
hugo new site new-site
```

- switch into the theme folder an clone the starter repo

```bash
cd new-site/themes
git clone https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter new-theme-name
```

- switch into the newly created theme folder, remove the git history from this starter repo and install the node packages

```bash
cd new-theme-name
rm -rf .git
npm install
```

- edit the `config.toml` file in `new-site/` to reflect the new-theme-name

```toml
# in config.toml
theme = "new-theme-name" # your new theme name here
```

- switch to the root of the new-site repo and start a server to view the index site

```bash
cd new-site
hugo server --disableFastRender
```

Your content should go into `new-site/content`, the development of the site layout is done within `new-site/themes/new-theme-name/layout`.

## Helpers

Included are the following helpers for the development phase (not visible in production):

- `/partials/dev-parameters.html`, which shows basic Hugo page parameters
- `/partials/dev-size-indicator.html`, which displays a floating circle in the upper right corner to indicate the Tailwind CSS responsive breakpoints

If you don't need any of these helpers anymore, just delete the corresponding line from `/layouts/_default/baseof.html`.

## Deploy to Netlify

If you use this starter theme and want to deploy your site to [Netlify](https://www.netlify.com/), you *MAY* encounter a build error which contains the following line:

```bash
ERROR {your deploy time here} error: failed to transform resource: POSTCSS: failed to transform "css/styles.css" (text/css): PostCSS not found; install with "npm install postcss-cli". See https://gohugo.io/hugo-pipes/postcss/
```

That is, Netlify doesn't know the `npm` dependencies of this starter theme yet. For this to fix, please add a `package.json` file to the root of your repo with the content:

```json
{
    "name": "my-site",
    "version": "0.0.1",
    "description": "that is my-site",
    "repository": "https://github.com/you/my-site",
    "license": "MIT",
    "devDependencies": {
        "@fullhuman/postcss-purgecss": "^3.1.3",
        "@tailwindcss/typography": "^0.3.1",
        "autoprefixer": "^10.2.0",
        "postcss": "^8.2.3",
        "postcss-cli": "^8.3.1",
        "postcss-import": "^14.0.0",
        "tailwindcss": "^2.0.2"
    },
    "browserslist": [
        "last 1 version",
        "> 1%",
        "maintained node versions",
        "not dead"
    ]
}
```

This introduces the dependencies Tailwind CSS and PostCSS need, Netlify will run the installation automatically on deploy.

### Environment variables

Set environment variable `NODE_VERSION` to `12` (or higher)  on `Settings` → `Build & deploy` → `Environment` as TailwindCSS ^2.0 requirement.

To make the distinction between `development` and `production` environments work, add an environment variable `HUGO_ENV = "production"` to your site settings under `Settings` → `Build & deploy` → `Environment`.

Or use a `netlify.toml` for a [file-based configuration](https://docs.netlify.com/configure-builds/file-based-configuration/).

## How does that work anyway?

Within `postcss.config.js` a `purgecss` function is defined, which is only called based on the environment variable `HUGO_ENVIRONMENT === 'production'`.

```js
const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: ['./hugo_stats.json'],
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
})

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [themeDir]
            }), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('autoprefixer')({
            path: [themeDir],
            grid: true
        }),
        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
    ]
}
```

During the build process Hugo Pipes checks this variable too and build the `styles.css` with some additional minification. This snippet is located in `/layouts/partials/head.html`.

```html
{{ $styles := resources.Get "css/styles.css" | postCSS (dict "config" "./assets/css/postcss.config.js") }}
{{ if .Site.IsServer }}
    <link rel="stylesheet" href="{{ $styles.RelPermalink }}">
{{ else }}
    {{ $styles := $styles| minify | fingerprint | resources.PostProcess }}
    <link rel="stylesheet" href="{{ $styles.Permalink }}" integrity="{{ $styles.Data.Integrity }}">
{{ end }}
```

## Reference

Documentation for Hugo's [PostCSS setup](https://gohugo.io/hugo-pipes/postprocess/).
