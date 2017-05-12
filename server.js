// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
// const RedisStore = require('connect-redis')(session);
const flash    = require('connect-flash');

const app = express();

require('./server/config/passport')(passport)

// Parsers for POST data
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({ 
	name: 'JSESSION',
	secret: '321sessionverysecretsecret123',
	resave: false,
  	saveUninitialized: false,
  	// USE FOR SHARING SESSIONS BETWEEN INSTANCES WITH REDIS
	// store: new RedisStore({
	// 	url: '[REDIS URL HERE]',
	// 	logErrors: true
	// })
	// USE WHEN ONLY NEEDING 1 INSTANCE
	store: new MemoryStore()
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/lib', express.static(path.join(__dirname, './node_modules')));
app.use('/assets', express.static(path.join(__dirname, './src/assets')));

// Get our API routes
const api = require('./server/routes/api')(app, passport);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Running on localhost:${port}`));