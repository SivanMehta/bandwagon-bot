var MarkovChain = require('markovchain')
var async = require('async')

function generateTweet(tweets, callback) {
  var parrot = new MarkovChain()
  async.each(tweets, (tweet, next) => {
      parrot.parse(tweet)
      next()
  }, (err) => {
    if(err) {
      console.error(err);
    } else {
      const tweet = parrot.end(20).process()
      callback(tweet)
    }
  })
}

module.exports = {
  generateTweet: generateTweet
}
