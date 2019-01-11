# Hugo Theme Tailwindcss Starter

Starter files for a Hugo theme with Tailwindcss.

- set up to use [Tailwindcss](https://tailwindcss.com)
- use [Hugo Pipes](https://gohugo.io/hugo-pipes/) to build and load css based on `dev` or `build` environment
- purge unused css classes with [Purgecss](https://www.purgecss.com) for `build`, but __not__ in `dev`
- works as separate theme repo or as local theme folder within a Hugo site

## Basic Usage to develop a separate Theme Repo

- clone and rename the repo

```bash
git clone https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter new-theme-name
```

- switch into the newly created folder and install the node packages

```bash
cd new-theme-name
npm install
```

- edit the `config.toml` file in `exampleSite/` to reflect the `new-theme-name`

```toml
# in config.toml
theme = "new-theme-name" # your new theme name here
```

- start a server to develop with `exampleSite`

```bash
hugo server -s exampleSite --themesDir=../.. -w --disableFastRender
```

## Usage direcly within a Hugo repo as a theme package

- start a new Hugo site

```bash
hugo new site new-site
```

- switch into the theme folder an clone the starter repo

```bash
cd new-site/themes
git clone https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter new-theme-name
```

- switch into the newly created theme folder and install the node packages

```bash
cd new-theme-name
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
hugo server -w --disableFastRender
```

Your content should go into `new-site/content`, the developement of the site layout is done within `new-site/themes/new-theme-name/layout`.

Happy coding...

## Reference

See the Hugo forum discussion "[Regenerating assets directory for Hugo Pipes](https://discourse.gohugo.io/t/regenerating-assets-directory-for-hugo-pipes-solved/13175)" for the functionality concept.