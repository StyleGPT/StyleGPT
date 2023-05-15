const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'StyleGPT'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true },
});

const Users = mongoose.model('users', userSchema);

// Data Model for UserStyles
const userStylesSchema = new Schema({
  username: { type: String, required: true},
  cssStyles: {type: String, required: true},
  timestamp: { type: Date, required: true },
  prompt: { type: String },
  description: { type: String},
})
  // username field - string, required
  // CSS styles - string, required
    // note: will need to clean/encode/minify the CSS styles potentially when saving and then unclean the CSS when querying the database and returning to the frontend for display
  // timestamp field - date type, required
  // prompt field - string
  // description field - string

  const UserStyles = mongoose.model('userStyles', userStylesSchema)

module.exports = {
    Users,
    UserStyles,
};