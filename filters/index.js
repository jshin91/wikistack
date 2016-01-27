module.exports = function(swig) { //passes the swig library in in app.js

  var pageLink = function (page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };

  pageLink.safe = true; //????

  swig.setFilter('pageLink', pageLink);

};