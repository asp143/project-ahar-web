const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to DB', +config.database);
});


mongoose.connection.on('error', (err) => {
  console.log('DB error', +err);
});

const app = express();

const port = 3001; 

const users = require('./routes/users');
const logs = require('./routes/logs');
const report = require('./routes/reports');

app.use(cors()); //cors middleware

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); //bodyParser middleware

//passport middleware
app.use(passport.initialize()); //initialize
app.use(passport.session()); //session

require('./config/passport')(passport); 

app.use('/users', users);
app.use('/logs', logs);
app.use('/report',report)

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname), 'public/index.html')
});

app.listen(port, () => {
  console.log('Server started on port ' +port);
});
