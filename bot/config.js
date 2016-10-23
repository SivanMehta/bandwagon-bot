const env = process.env.NODE_ENV || 'development'

if(env == 'development') {
  module.exports = require('./config.json')
} else {
  module.exports = {
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    interval: parseInt(process.env.interval),
    WOEID: parseInt(process.env.WOEID)
  }
}
