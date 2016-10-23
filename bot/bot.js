/* Configure the Twitter API */
var Twit = require('twit')

const config = require('../config.json')
var TWITTER_CONSUMER_KEY = config.TWITTER_CONSUMER_KEY
var TWITTER_CONSUMER_SECRET = config.TWITTER_CONSUMER_SECRET
var TWITTER_ACCESS_TOKEN = config.TWITTER_ACCESS_TOKEN
var TWITTER_ACCESS_TOKEN_SECRET = config.TWITTER_ACCESS_TOKEN_SECRET

var Bot = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
})

/* Markov Chain Module */
var chain = require('./chain')

/* Where on Earth? ID for Pittsburgh, PA */
var WOEID = 2473224

var trending = []
function getTrends(req, res) {
  if(trending.length != 0) {
    res.send(trending)
    return
  }

	var query = {
		id: WOEID
	}

	Bot.get('trends/place', query, (err, data, response) => {

		if (err) {
			console.log('Bot could not find latest trends, : ' + error)
		}

    trending = data[0].trends.map(trend => trend.name)
    res.send(trending)
	});
}

function generateTweet(req, res) {
  Bot.get('search/tweets', {
    q: req.params.about + '-filter:links',
    count: 20,
    lang: 'en',
    result_type: 'popular'}, (err, data, response) => {
    res.send(data.statuses.map(tweet => tweet.text));
  })
}

exports.init = (app) => {
  app.get('/', getTrends)
  app.get('/tweet/:about', generateTweet)
}
