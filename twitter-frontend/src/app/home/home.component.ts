import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../twitter.service';
import { Tweet } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tweetText: string = "";
  private tweets: Tweet[] = [];

  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
    this.loadTweets();
  }

  async loadTweets() {
    return this.twitterService.getTweets().then(tweets => {
      this.tweets = tweets;
    });
  }

  get Tweets() {
    return this.tweets;
  }

  get Disabled() {
    return this.tweetText.length === 0 || this.tweetText.length > 140;
  }

  async submitTweet() {
    await this.twitterService.createTweet({ handle: "JonDoe", text: this.tweetText, createdOn: new Date().toISOString() })
    await this.loadTweets();
    this.tweetText = "";
  }

}
