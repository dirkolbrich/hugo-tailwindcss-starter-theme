// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

module.exports = {    
    plugins: [        
        require('postcss-import')({
            path: ["assets/css"]
            }), 
        require('tailwindcss')('./assets/css/tailwind.js'),
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
            grid: true,
            browsers: ['>1%']
        }),
    ]
}