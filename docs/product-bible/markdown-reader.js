/* Support Chinese strong text ending in punctuation directly before a word.
 * Keep this in the inline lexer so code, escapes and HTML sanitization retain
 * their normal handling; never replace stars in raw Markdown or rendered HTML.
 */
/* global marked */
marked.use({extensions:[{
  name:"cjkStrong",
  level:"inline",
  start(src){return src.indexOf("**");},
  tokenizer(src){
    const match = /^\*\*((?:\\[^\n]|(?!\*\*)[^\n\\])+)\*\*(?=[\p{L}\p{N}])/u.exec(src);
    if (!match || /^\s/.test(match[1]) || !/\p{Script=Han}/u.test(match[1]) || !/\p{P}$/u.test(match[1])) return;
    return {type:"cjkStrong",raw:match[0],tokens:this.lexer.inlineTokens(match[1])};
  },
  renderer(token){return `<strong>${this.parser.parseInline(token.tokens)}</strong>`;}
}]});
