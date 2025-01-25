import { HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Tweet, Profile } from 'src/types';
import * as twitterJson from "../twitter.json"; 
import { MongoClient } from "mongodb";

// const uri = "mongodb://twitter:twitter@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true";
// const uri = "mongodb://localhost:27017";
const uri = "mongodb://db:27017"; // service-naam (docker)
@Injectable()
export class TwitterService {
    private client = new MongoClient(uri);
    constructor() {
        this.loadDataFromDb();
    }

    onModuleInit() {
        this.client.connect();
    }

    onModuleDestroy() {
        this.client.close();
    }

    private async loadDataFromDb() {
        let tweets = await this.client.db("twitterDB").collection("Tweets").find<Tweet>({}).toArray();
        if (tweets.length === 0) {
            let tweets = twitterJson.tweets;
            let profiles = twitterJson.profiles;

            await this.client.db("twitterDB").collection("Tweets").insertMany(tweets);
            await this.client.db("twitterDB").collection("Profiles").insertMany(profiles);

            console.log("Loaded data from twitter.json into mongo db");
        }
    }

    async getTweets() {
        let tweets = await this.client.db("twitterDB").collection("Tweets").find<Tweet>({}).toArray();
        return tweets;
    }

    async getTweetsForHandle(handle: string) {
        let tweets = await this.client.db("twitterDB").collection("Tweets").find<Tweet>({handle: handle}).toArray();
        return tweets;
    }

    async getProfiles() {
        let profiles = await this.client.db("twitterDB").collection("Profiles").find<Profile>({}).toArray();
        return profiles;
    }

    async getProfile(handle: string) {
        let profile = await this.client.db("twitterDB").collection("Profiles").findOne<Profile>({handle: handle});
        return profile;
    }

    async createTweet(tweet: Tweet) {
        let tweets = await this.getTweets();
        tweet.id = Math.max(...tweets.map(t => t.id)) + 1;
        tweet.createdOn = new Date().toISOString();
        await this.client.db("twitterDB").collection("Tweets").insertOne(tweet);
        return tweet;
    }
}
