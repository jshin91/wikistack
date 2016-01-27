var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;


var pageSchema = new Schema({
  title:    { type: String, required: true },
  urlTitle: { type: String, required: true },
  content:  { type: String, required: true },
  status:   { type: String, enum: ['open', 'closed'] },
  date:     { type: Date, default: Date.now },
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

pageSchema.pre('validate', function(next) {
  this.urlTitle = generateUrlTitle(this.title);
  console.log(this);
  next();
});

pageSchema.virtual('route').get(function() { //maybe this is wrong
	return '/wiki/' + this.urlTitle;
})


var userSchema = new Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unqiue: true }
});


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};








