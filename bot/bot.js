var twitter = require('twit')
var async = require('async')
var request = require('request')

const config = require('./config.js')
var Bot = new twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
})

function forceTweet(req, res) {
  generateTweet(req.params.topic, (tweet) => {
    if(req.query.password && req.query.password == config.password) {
      postTweet(tweet)
    }
    res.send(tweet)
  })
}

var chain = require('./chain')
function generateTweet(topic, callback) {
  console.log('tweeting about: ' + topic)
  Bot.get('search/tweets', {
    q: topic + '-filter:links',
    count: 50,
    lang: 'en',
    result_type: 'popular'}, (err, data, response) => {
      chain.generateTweet(data.statuses, topic, (tweet) => {
        callback(tweet)
      })
  })
}

function postTweet(tweet) {
  Bot.post('/statuses/update', {status: tweet}, (err, data, response) => {
    console.log(tweet)
  })
}

function getTrendingTopics() {
  var query = {
    id: config.WOEID
  }

  Bot.get('trends/place', query, (err, data, response) => {
    if (err) {
      console.log('Bot could not find latest trends, : ' + err);
    }

    var trends = data[0].trends.sort((a, b) => b.tweet_volume - a.tweet_volume)
    trends = trends.map(trend => trend.name)
    trends = trends.slice(0,3)
    async.each(trends, (trend, next) => {
      generateTweet(trend, (tweet) => {
        postTweet(tweet)
      })
    })
  });

  // ping heroku app to prevent from falling asleep
  request.get('https://bandwagon-bot.herokuapp.com/forceTweet/trump', (err, response, body) => {
    console.log(body)
  })

  // loop forever
  setTimeout(getTrendingTopics, config.interval)
}

exports.init = (app) => {
  app.get('/', (req, res) => { res.redirect('https://twitter.com/BandwagonBot') })
  app.get('/forceTweet/:topic', forceTweet)

  getTrendingTopics()
}
