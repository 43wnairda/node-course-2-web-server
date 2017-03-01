const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log)
  fs.appendFile('server log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server log');
    }
  });
  next();
});

// app.use((req, res, next) => {                 //IMPORTANT.  app.use is executed according to the order it appears
//   res.render('maintenance.hbs');              //on the page...hence this block is executed first.
// });                                           //app.use is how you register Middleware

hbs.registerHelper('getCurrentYear',() => {           //register Helper
  return new Date().getFullYear()
});

hbs.registerHelper('ScreamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {              //using Handlebars to inject values into a static web page
          pageTitle: 'Home page',
          bodyTitle: 'Welcome',
          welcomeMessage: 'Welcome to Bermude, have a nice day'
          //currentYear: new Date().getFullYear()               replaced by a register helper
        });

  //res.send('<h1>Hello express</h1>');     //Not using Handlebars to create web page.
  // res.send({
  //     Name: 'Adrian',
  //     Likes: [
  //         'windsurfing',
  //         'skating',
  //         'etc'
  //           ]
  //   })
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
          bodyTitle: 'About page'
          //currentYear: new Date().getFullYear()       replaced by a register helprt
        });
})

app.get('/bad', (req, res) => {
  res.send({
    ErrorMessage: 'Bad request'
  })
})


app.listen(3000, () => {
  console.log('Servder is up on port 3000');
});
