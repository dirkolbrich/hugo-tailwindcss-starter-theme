# Hugo Starter Theme with Tailwind CSS

Starter files for a Hugo theme with Tailwind CSS.

- set up to use [Tailwind CSS](https://tailwindcss.com) v3.0+
- includes the official Tailwind CSS plugins
  - [Typography](https://tailwindcss.com/docs/typography-plugin) for styling of markdown content
  - [Forms](https://github.com/tailwindlabs/tailwindcss-forms) for basic resets for form styles
  - [Aspect Ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio) to give elements a fixed aspect ratio
  - [Line Clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp) for truncating text
- use [Hugo Pipes](https://gohugo.io/hugo-pipes/) to build and load css based on `dev` or `build` environment
- ~purge unused css classes with [PurgeCSS](https://www.purgecss.com) for `build`, but __not__ in `dev`~
- no need to purge via PurgeCSS anymore, as the TailwindCSS JIT compiler only builds the necessary CSS classes
- works as separate theme repo or as a local theme folder within a Hugo site
- basic template setup with an index page, an about page and a posts category
- responsive navigation header to hide the nav on small screens
- to keep that s***er down, the theme features a sticky footer
- color theme switcher for `light`, `dark` or `system` preferred color scheme
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

Make sure to use a minimum Hugo version of v0.88.0 and above.

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
- `/partials/dev/container-indicator.html` shows the container area as a color filled background

If you don't need any of these helpers anymore, just delete the `{{- partial "dev/dev-tools.html" . -}}` line from `/layouts/_default/baseof.html`.

## Reference

- documentation for Hugo's [PostCSS setup](https://gohugo.io/hugo-pipes/postprocess/)
- inspiration to make TailwindCSS v3 JIT-compiler work with Hugo in dev and production mode via a [blog post by Bryce Wray](https://www.brycewray.com/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/)
