# Hugo Starter Theme with Tailwind CSS

Starter files for a Hugo theme with Tailwind CSS.

- set up to use [Tailwind CSS](https://tailwindcss.com) v3.0+
- includes the official Tailwind CSS plugins
  - [Typography](https://tailwindcss.com/docs/typography-plugin) for styling of markdown content
  - [Forms](https://github.com/tailwindlabs/tailwindcss-forms) for basic resets for form styles
  - [Aspect Ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio) to give elements a fixed aspect ratio
  - [Line Clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp) for truncating text
- use [Hugo Pipes](https://gohugo.io/hugo-pipes/) to build and load css based on `dev` or `build` environment
- purge unused css classes with [PurgeCSS](https://www.purgecss.com) for `build`, but __not__ in `dev`
- works as separate theme repo or as a local theme folder within a Hugo site
- basic template setup with an index page, an about page and a posts category
- responsive navigation header ~~with minimal javascript~~ with pure css to hide the nav on small screens
- to keep that s***er down, the theme features a sticky footer
- included development helper partials to show Hugo parameters and Tailwind CSS breakpoints during development

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
git clone https://github.com/dirkolbrich/hugo-tailwindcss-starter-theme new-theme-name
```

- make the theme your own by removing the git history from the cloned starter repo and initiate a new git repo

```bash
cd new-theme-name
rm -rf .git
git init
```

- install the necessary node packages

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
git clone https://github.com/dirkolbrich/hugo-tailwindcss-starter-theme new-theme-name
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

Included are some helpers for the development phase (not visible in production):

- `/partials/dev/parameters.html` shows basic Hugo page parameters
- `/partials/dev/size-indicator.html` displays a floating circle in the upper right corner to indicate the current Tailwind CSS responsive breakpoint
- `/partials/dev/container-indicator.html` shows the container area as a color filled backgroud

If you don't need any of these helpers anymore, just delete the `{{- partial "dev/dev-tools.html" . -}}` line from `/layouts/_default/baseof.html`.

## How does that work anyway?

Within `postcss.config.js` a `purgecss` function is defined, which is only called based on the environment variable `HUGO_ENVIRONMENT === 'production'`.

```js
const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: [
        './hugo_stats.json',
        themeDir + '/hugo_stats.json',
        'exampleSite/hugo_stats.json',
    ],
    safelist : [ /type/ ], // this helps to not purge type attributes, this is needed for the Typography plugin
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
})

module.exports = {    
    plugins: [
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('autoprefixer')({
            path: [themeDir]
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
