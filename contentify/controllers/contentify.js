var cheerio = require('cheerio');

var Contentify = (function(){
  function Contentify(){
    this.pageHTML = '';
    this.$;
  }

  Contentify.prototype.hasURLProtocol = function(url){
    return url.match(/^http:\/\/|https:\/\//) !== null;
  }

  Contentify.prototype.setPageHTML = function(html){
    this.pageHTML = html;
    this.loadHTML();
  }

  Contentify.prototype.loadHTML = function(){
    this.$ = cheerio.load(this.pageHTML);
  }

  Contentify.prototype.hasTag = function(tagName){
    return this.$(tagName).length > 0;
  }

  Contentify.prototype.getHTML = function(){
    return this.pageHTML.trim();
  }

  Contentify.prototype.getHead = function(){
    var head = '';
    if (this.hasTag('head')) {
      head = this.$('head').html();
    }
    return head.trim();
  }

  Contentify.prototype.getBody = function(){
    var body = '';
    if (this.hasTag('body')) {
      body = this.$('body').html();
    }
    return body.trim();
  }

  Contentify.prototype.getTitle = function(){
    var title = '';
    if (this.hasTag('title')) {
      title = this.$('title').text();
    }
    return title.trim();
  }

  Contentify.prototype.getDescription = function(){
    var description = '';
    if (this.hasTag('meta')) {
      description = this.$('meta[name=description]').attr('content');
    }
    return description.trim();
  }

  Contentify.prototype.getAuthor = function(){
    var author = '';
    if (this.hasTag('meta')) {
      author = this.$('meta[name=author]').attr('content');
    }
    return author.trim();
  }

  Contentify.prototype.getLang = function(){
    var lang = '';
    if (this.hasTag('html')) {
      lang = this.$('html').attr('lang');
    }
    return lang.trim();
  }

  Contentify.prototype.getOGTags = function(){
    var ogTags = {};

    if (this.hasTag('meta')) {
      var meta = this.$('meta');
      var keys = Object.keys(meta);

      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:type'){
          ogTags.type = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:title'){
          ogTags.title = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:description'){
          ogTags.description = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image'){
          ogTags.image = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:url'){
          ogTags.url = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:site'){
          ogTags.site = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:site_name'){
          ogTags.siteName = meta[key].attribs.content;
        }
      });
    }
    return ogTags;
  }

  Contentify.prototype.getTwitterCards = function(){
    var tcTags = {};

    if (this.hasTag('meta')) {
      var meta = this.$('meta');
      var keys = Object.keys(meta);

      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:card'){
          tcTags.card = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:site'){
          tcTags.site = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:url'){
          tcTags.url = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:title'){
          tcTags.title = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:description'){
          tcTags.description = meta[key].attribs.content;
        }
      });
      keys.forEach(function(key){
        if (meta[key].attribs && meta[key].attribs.name && meta[key].attribs.name === 'twitter:image'){
          tcTags.image = meta[key].attribs.content;
        }
      });
    }
    return tcTags;
  }

  return Contentify;
})();

var contentify = new Contentify();

module.exports = contentify;
