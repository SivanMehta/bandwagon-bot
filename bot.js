/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Debashis Barman (http://www.debashisbarman.in)
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
const config = require('./config.json')
var TWITTER_CONSUMER_KEY = config.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = config.TWITTER_CONSUMER_SECRET;
var TWITTER_ACCESS_TOKEN = config.TWITTER_ACCESS_TOKEN;
var TWITTER_ACCESS_TOKEN_SECRET = config.TWITTER_ACCESS_TOKEN_SECRET;

/* Where on Earth? ID for Pittsburgh, PA */
var WOEID = 2473224

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#technology OR #design';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

function getTrends() {

	var query = {
		id: WOEID
	}

	Bot.get('trends/place', query, (err, data, response) => {

		if (err) {
			console.log('Bot could not find latest tweet, : ' + error);
		}

    console.log(data[0].trends.map(trend => trend.name))

	});
}

getTrends();
