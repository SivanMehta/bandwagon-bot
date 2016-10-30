var MarkovChain = require('markovchain')
var async = require('async')

function generateTweet(tweets, topic, callback) {
  var parrot = new MarkovChain()
  // parse out the top 20 most 'popular' tweets from a given list
  tweets = tweets.sort((a, b) => (b.favourites_count + b.retweet_count) - (a.favourites_count + a.retweet_count))
  tweets = tweets.map(tweet => tweet.text)
  tweets = tweets.slice(0, 20)
  async.each(tweets, (tweet, next) => {
      parrot.parse(tweet)
      next()
  }, (err) => {
    if(err) {
      console.error(err);
    } else {
      const tweet = topic + ': ' + parrot.end(20).process()
      callback(tweet)
    }
  })
}

module.exports = {
  generateTweet: generateTweet
}
