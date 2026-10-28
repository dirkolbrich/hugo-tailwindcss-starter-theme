# Hugo Starter Theme with Tailwind CSS

Starter files for a Hugo theme with Tailwind CSS.

- set up to use [Tailwind CSS](https://tailwindcss.com) v4+
- includes the official Tailwind CSS plugins
  - [Typography](https://tailwindcss.com/docs/typography-plugin) for styling of markdown content
  - [Forms](https://github.com/tailwindlabs/tailwindcss-forms) for basic resets for form styles
- uses Hugo's built-in [`css.TailwindCSS`](https://gohugo.io/functions/css/tailwindcss/) function to build and load css, minified and fingerprinted for `build`
- no need to purge unused css, as Tailwind only builds the classes found in Hugo's `hugo_stats.json`
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

- Hugo v0.158.0 or newer (developed and tested with v0.168.0)
- Node.js and npm, as Hugo runs the Tailwind CSS CLI from your `node_modules`. Since Hugo v0.161.0 the standalone Tailwind CSS binary is no longer supported, so the CLI has to be installed via `npm`
- a modern browser: Tailwind CSS v4 targets Safari 16.4+, Chrome 111+ and Firefox 128+. If you need to support older browsers, stay on Tailwind CSS v3 and use version 0.5.9 of this package see-the `tailwindcss-v3` branch

Hugo looks for the Tailwind CSS CLI in the `node_modules` of the *site* it builds, so the node packages must be installed next to the site's `hugo.toml` (`exampleSite/` while developing the theme, the site root when the theme is used in a site), not in the theme folder.

The Hugo site configuration needs the `[build]`, `[module]` and `[security]` sections shown in [`exampleSite/hugo.toml`](exampleSite/hugo.toml). They enable `hugo_stats.json`, tell Hugo to rebuild the css when it changes, and allow Hugo to run the Tailwind CSS CLI. See the [Hugo docs](https://gohugo.io/functions/css/tailwindcss/) for details.

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

- edit the `hugo.toml` file in `exampleSite/` to reflect the `new-theme-name`

```toml
# in hugo.toml
theme = "new-theme-name" # your new theme name here
```

- install the necessary node packages in `exampleSite/`

```bash
cd exampleSite
npm install
cd ..
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

- switch into the theme folder and clone the starter repo, then remove the git history from this starter repo

```bash
cd new-site/themes
git clone https://github.com/dirkolbrich/hugo-tailwindcss-starter-theme new-theme-name
cd new-theme-name
rm -rf .git
```

- install the node packages in the root of `new-site/`

```bash
cd ../..
npm install --save-dev tailwindcss @tailwindcss/cli @tailwindcss/typography @tailwindcss/forms
```

- edit the `hugo.toml` file in `new-site/` to reflect the new-theme-name and add the `[build]`, `[module]` and `[security]` sections from [`exampleSite/hugo.toml`](exampleSite/hugo.toml)

```toml
# in hugo.toml
theme = "new-theme-name" # your new theme name here
```

- start a server in the root of the new-site repo to view the index site

```bash
hugo server --disableFastRender
```

Your content should go into `new-site/content`, the development of the site layout is done within `new-site/themes/new-theme-name/layouts`.

## Tailwind CSS configuration

Tailwind CSS v4 is configured in CSS, not in a `tailwind.config.js`. The entry file is [`assets/css/styles.css`](assets/css/styles.css).

- imports Tailwind CSS and enables the Typography and Forms plugins
- adds `hugo_stats.json` as a source, as Tailwind CSS ignores files listed in `.gitignore`
- defines the `dark` variant to follow a `dark` class on the `html` element, which is what the color theme switcher toggles
- is the place for site specific styles and theme values (see [`@theme`](https://tailwindcss.com/docs/theme))

## Helpers

Included are some helpers for the development phase (not visible in production):

- `/_partials/dev/parameters.html` shows basic Hugo page parameters
- `/_partials/dev/size-indicator.html` displays a floating circle in the upper right corner to indicate the current Tailwind CSS responsive breakpoint
- `/_partials/dev/container-indicator.html` shows the container area as a color filled background

If you don't need any of these helpers anymore, just delete the `{{- partial "dev/dev-tools.html" . -}}` line from `/layouts/baseof.html`.

## Reference

- documentation for Hugo's [`css.TailwindCSS`](https://gohugo.io/functions/css/tailwindcss/) function
- Tailwind CSS [upgrade guide from v3 to v4](https://tailwindcss.com/docs/upgrade-guide)
- Hugo's [template system overview](https://gohugo.io/templates/new-templatesystem-overview/) (`_partials`, `home.html`, ...)
