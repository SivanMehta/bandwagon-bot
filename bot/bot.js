/* Configure the Twitter API */
var Twit = require('twit')

const config = require('./config.js')
var Bot = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
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
      const tweets = data.statuses.map(tweet => tweet.text)
      chain.generateTweet(tweets, req.params.about, (tweet) => {
        res.send(tweet)
        if(req.query.password && req.query.password == config.password) {
          postTweet(tweet)
        }
      })
  })
}

function postTweet(tweet) {
  Bot.post('/statuses/update', {status: tweet}, (err, data, response) => {
    console.log(tweet)
  })
}

exports.init = (app) => {
  app.get('/', getTrends)
  app.get('/tweet/:about', generateTweet)
}
