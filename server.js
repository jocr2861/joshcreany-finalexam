/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'review_db',
	user: 'postgres',
	password: 'database123#'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



//-----------GET/POST REQUESTS-----------//
// home page 
app.get('/home', function(req, res) {
	res.render('pages/main',{
        my_title:"Home Page",
        results:''
	});
});

// clicking on review page 
app.get('/reviews', function(req, res) {
    var reviewQuery = `select * from reviews;`;
    db.task('get-everything', task => {
        return task.batch([
            task.any(reviewQuery)
        ]);
    })
    .then(info => {
    	res.render('pages/reviews',{
            my_title:"Review Page",
            results:info[0]
        });
    })
    .catch(err => {
        console.log('error', err);
        res.render('pages/reviews',{
            my_title:"Review Page",
            results:''
        });
    });
});

// posting a review, then redirecting to reviews page 
app.post('/reviews', function(req, res) {
    console.log(req);
    var addreviewQuery = `INSERT INTO reviews(title, review, review_date) VALUES('${req.body.bookName}','${req.body.reviewMessage}',GETDATE());`;
    var reviewQuery = `select * from reviews;`;
    db.task('get-everything', task => {
        return task.batch([
            task.any(addreviewQuery),
            task.any(reviewQuery)
        ]);
    })
    .then(info => {
    	res.render('pages/reviews',{
            my_title:"Review Page",
            results:info[0]
        });
    })
    .catch(err => {
        console.log('error', err);
        res.render('pages/reviews',{
            my_title:"Review Page",
            results:''
        });
    });
});


//app.listen(3000);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});