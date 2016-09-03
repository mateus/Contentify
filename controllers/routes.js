var express = require('express');
var request = require('request');
var validator = require('validator');
var router = express.Router();

var contentify = require('./contentify');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contentify' });
});

router.get('/reader', function(req, res, next) {
  var urlTarget = req.param('url');
  var apiURL = req.headers.host + '/scrape?url=';
  var data = null;
  var showReader = false;

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    var validatorOptions = {
      protocols: ['http', 'https'],
      require_protocol: true,
      allow_underscores: true
    }

    if (validator.isURL(urlTarget, validatorOptions)) {
      var options = {
        url: 'https://contentify.herokuapp.com/scrape?url=' + urlTarget,
      }

      request.get(options, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          console.log(response);
          res.render('reader', { title: 'Contentify - Reader', data: JSON.parse(html)});
        }else{
          res.render('reader', { title: 'Contentify - Reader', error: 2});
        }
      });
    }else{
      res.render('reader', { title: 'Contentify - Reader', error: 1});
    }
  }else{
    res.render('reader', { title: 'Contentify - Reader', error: 0});
  }
});

router.get('/scrape', function(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");

  var urlTarget = req.param('url');
  var result = {};

  if (typeof urlTarget !== "undefined" && urlTarget !== null && urlTarget.length > 0) {
    result.url = urlTarget;

    var validatorOptions = {
      protocols: ['http', 'https'],
      require_protocol: true,
      allow_underscores: true
    }

    if (validator.isURL(result.url, validatorOptions)){
      var options = {
        url: urlTarget,
        followAllRedirects: true,
        jar: true,
        timeout: 10000
      }

      request.get(options, function(error, response, html){
        if (!error && response.statusCode == 200) {
          if (contentify.isContentTypeText(response.headers['content-type'])) {
            result.result = {};
            result.sourceCode = {};
            result.request = {};

            contentify.setPageHTML(html);

            // Page status code ===
            result.statusCode = response.statusCode;

            // Headers ===
            result.request.headers = response.headers;

            // HTML ===
            var pageHTML = contentify.getHTML();
            if (pageHTML.length > 0) {
              result.sourceCode.html = pageHTML;
            }
            var pageBody = contentify.getBody();
            if (pageBody.length > 0) {
              result.sourceCode.body = pageBody;
            }
            var pageHead = contentify.getHead();
            if (pageHead.length > 0) {
              result.sourceCode.head = pageHead;
            }

            // Scrape Result ===
            var pageTitle = contentify.getTitle();
            if (pageTitle.length > 0) {
              result.result.title = pageTitle;
            }
            var pageDescription = contentify.getDescription();
            if (pageDescription.length > 0) {
              result.result.description = pageDescription;
            }
            var pageLang = contentify.getLang();
            if (pageLang.length > 0) {
              result.result.language = pageLang;
            }
            var pageAuthor = contentify.getAuthor();
            if (pageAuthor.length > 0) {
              result.result.author = pageAuthor;
            }
            var pageOGTags = contentify.getOGTags();
            if (Object.keys(pageOGTags).length > 0) {
              result.result.openGraph = pageOGTags;
            }
            var pageTwitterCards = contentify.getTwitterCards();
            if (Object.keys(pageTwitterCards).length > 0) {
              result.result.twitterCards = pageTwitterCards;
            }

            var pageScrapeContent = contentify.scrapeContent();
            result.result.scrapedContent = pageScrapeContent.content;
            result.result.scrapedNode = pageScrapeContent.node;

            res.send(result);
          }else{
            result.error = 'Invalid call! We only support Content-Type: text/html';
            res.send(result);
          }
        }else{
          result.statusCode = 404;
          result.error = error;
          res.send(result);
        }
      });
    } else {
      result.error = 'Invalid URL! Looking for something like [http://|https://].example.com';
      res.send(result);
    }
  }else{
    result.error = 'No URL specified';
    res.send(result);
  }
});

module.exports = router;
