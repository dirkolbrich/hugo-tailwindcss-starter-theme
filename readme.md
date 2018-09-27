# Hugo Theme Tailwindcss Starter

Starter files for a Hugo theme with Tailwindcss.

- set up to use [Tailwindcss](https://tailwindcss.com)
- use [Hugo Pipes](https://gohugo.io/hugo-pipes/) to build and load css based on `dev` or `build` environment
- purge unused css classes with [Purgecss](https://www.purgecss.com) for `build`, but __not__ in `dev`

## Basic Usage

- clone and rename the repo

```bash
git clone https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter new-theme-name
```

- edit config.toml in `exampleSite/` to reflect new theme name

```toml
theme = "new-theme-name" # your new theme name here
```

- start server to develop with exampleSite

```bash
hugo server -s exampleSite --themesDir=../.. -w --disableFastRender
```

## Reference

See the Hugo forum discussion "[Regenerating assets directory for Hugo Pipes](https://discourse.gohugo.io/t/regenerating-assets-directory-for-hugo-pipes-solved/13175)" for the functionality concept.