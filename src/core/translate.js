/*
* Function translate()
* @param content - words to translate
* @param language - language type
* @param middleware - render middleware
*                   - beforeRender
*                   - afterRender
* */

const languageMap = {};

const middleware = {};

const translate = (content,language) => {
    if (!content) {
        return '';
    }
    if (!language) {
        throw new Error('you should define specific language type!');
    }
    // beforeRender middleware
    if(middleware.beforeRender) content = middleware.beforeRender(content);
    // translate words
    if (language && languageMap[language]) {
        languageMap[language][content] && (content = languageMap[language][content]);
    }
    // afterRender middleware
    if(middleware.afterRender) content = middleware.afterRender(content);
    return content;
}

export {
    languageMap,
    middleware,
    translate
}