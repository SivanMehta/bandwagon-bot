var MarkovChain = require('markovchain')
var async = require('async');

function generateTweet(tweets) {
  var parrot = new MarkovChain()
  async.each(tweets, (tweet, callback) => {
      parrot.parse(tweet)
      callback()
  }, (err) => {
    if(err) {
      console.error(err);
    } else {
      const tweet = parrot.end(20).process()
      return tweet
    }
  })
}

module.exports = {
  generateTweet: generateTweet
}
