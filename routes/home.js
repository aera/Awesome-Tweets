const express = require('express');
const router  = express.Router();
const faker   = require('faker');
const pg      = require('pg');

const COOKIE = 'tweets';
const MAX_LENGTH = 255;

router.get('/', function(req, res) {
  res.render('home/index');
});

router.get('/dashboard', function(req, res) {
  let tweets = returnTweetArray(req, res);
  sortTweets(tweets);
  res.render('home/dashboard', {faker, tweets});
});

//make a tweet on POST
router.post('/dashboard', function(req, res) {
  const params = req.body;

  let tweet = makeTweet(params.username, params.message);
  saveTweet(req, res, tweet);

  let tweets = returnTweetArray(req, res);
  sortTweets(tweets);
  res.render('home/dashboard', {faker, tweets});
});


/* get the array of tweets */
function returnTweetArray(req, res) {
  return req.cookies[COOKIE] || []   // in case of empty array
}


function makeTweet(name, message) {
  let tweet = {
    name: name,
    body: message.slice(0, MAX_LENGTH)
  };
  return tweet;
}


//push a tweet into an array of tweets
function saveTweet(req, res, tweet) {
  let tweets = returnTweetArray(req, res);
    tweets.push(tweet);
    res.cookie(COOKIE, tweets);
}

// displaying tweets in order of message length - for Bonus
function sortTweets(tweets) {
  tweets = tweets.sort(function (x, y) {
    return x.body.length - y.body.length;
  }).reverse();
  return tweets;
}

module.exports = router;
