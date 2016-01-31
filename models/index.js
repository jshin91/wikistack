var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
var marked = require('marked');


var Schema = mongoose.Schema;


var pageSchema = new Schema({
  title:    { type: String, required: true },
  urlTitle: { type: String, required: true },
  content:  { type: String, required: true },
  status:   { type: String, enum: ['open', 'closed'] },
  date:     { type: Date, default: Date.now },
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags:     { type: [String]}
});


pageSchema.pre('validate', function(next) {
  if (this.title) {
     this.urlTitle = this.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    this.urlTitle = Math.random().toString(36).substring(2, 7);
  }
  next();
});

pageSchema.virtual('route').get(function() { //getter function
  return '/wiki/' + this.urlTitle;
})

pageSchema.virtual('renderedContent').get(function() {
  return marked(this.content);
})


pageSchema.statics.findByTag = function(tag) {
  return Page.find({ 
    tags: {
      $in: [tag]
    }
  }).exec() // returns a promise, promise resolves to list of pages
}

pageSchema.methods.findSimilar = function() {
  return Page.find({
    tags: {
      $in: this.tags
    },
    _id: {
      $ne: this._id
    }
  }).exec();
}


var userSchema = new Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unqiue: true }
});

userSchema.statics.findOrCreate = function(userInfo) {
  
  var self = this;

  return self.findOne({ email: userInfo.email }).exec()
  .then(function(user) {
    if(user === null) {
      return self.create(userInfo);
    } else {
      return user;
    }
  });
}

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};





















