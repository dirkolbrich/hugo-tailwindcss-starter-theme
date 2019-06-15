// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

const themeDir = __dirname + '/../../';

module.exports = {    
    plugins: [        
        require('postcss-import')({
            path: [themeDir]
            }), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),   
        require('@fullhuman/postcss-purgecss')({
            content: ['layouts/**/*.html'],
            extractors: [
            {
                extractor: TailwindExtractor,
                extensions: ['html']
            }], 
            fontFace: true
        }),    
        require('autoprefixer')({
            grid: true
        }),
        require('postcss-reporter'),
    ]
}
