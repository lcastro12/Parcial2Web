import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";
// var Twitter = require("twitter");

// TODO: Now we have only one stream overall,
// we should have one per user at least
let stream = null;

// This is a in memory only collection
export const Tweets = new Mongo.Collection("tweets");


// Twitter streamer should run only on the server
if (Meteor.isServer) {
  Meteor.publish("tweets", function tweetsPublication() {
    return Tweets.find({}, {sort: {created_at: -1}, limit:10});
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.stream"(query) {
      console.log("Twitter search" + query);

      // Create the Twitter object
      let client = new Twitter({
       consumer_key:   'cYiAnq3g3X02AD8JqNRoFaVmp',
        consumer_secret:  'hi7Mdo9CWy8fQXN9eo0QhJaAvWw2pXgUoIHjjJEJ2r5jV8gGQU',
        access_token_key:   '824350538934394882-k4C7aW1SaBjsE53bLbLWQw4XZGgzhAX',
        access_token_secret: 'xwYNzJNYOrYlNsKSlO9YXSMEVqT7BkAmFVGlGOlGT9bSp'
      });

      if (stream) {
        console.log("Stopping previous stream");
        stream.destroy();
        // Remove all the tweets
        Tweets.remove({});
      }

     // Colombia
      let locations = "-79.12,-4.23,-66.85,12.59";
      stream = client.stream("statuses/filter",{track: query,  locations:locations});
      stream.on("data", Meteor.bindEnvironment(function(tweet) {
        // resolve(tweet);
        if(tweet.coordinates !== null){
        Tweets.insert(tweet);
      }
      }));

      stream.on("error", function(error) {
        console.log(error);
        throw Meteor.Error(error);
      });
    }// twitter.stream
  }); //Meteor.methods
}
