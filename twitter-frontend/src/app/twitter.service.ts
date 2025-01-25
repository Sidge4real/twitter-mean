import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet,Profile } from '../types';
import twitterJson from '../twitter.json';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private httpClient: HttpClient) { }

  public getProfile(handle: string): Promise<Profile> { 
    return lastValueFrom(this.httpClient.get<Profile>("http://localhost:3000/profiles/" + handle));
  }

  public getTweetsForHandle(handle: string): Promise<Tweet[]> {
    return lastValueFrom(this.httpClient.get<Tweet[]>("http://localhost:3000/tweets/" + handle))
  }

  public createTweet(tweet: Tweet): Promise<Tweet> {
    return lastValueFrom(this.httpClient.post<Tweet>("http://localhost:3000/tweets", tweet));
  }

  public async getTweets(): Promise<Tweet[]> {
    let tweets : Tweet[] = await lastValueFrom(this.httpClient.get<Tweet[]>("http://localhost:3000/tweets"));
    let profiles: Profile[] = await lastValueFrom(this.httpClient.get<Profile[]>("http://localhost:3000/profiles"));
    for (let tweet of tweets) {
      tweet.profile = profiles.find(p => p.handle === tweet.handle);
    }
    tweets.sort((a, b) => { 
      if (new Date(a.createdOn).getTime() < new Date(b.createdOn).getTime()) {
        return 1;
      } else if (new Date(a.createdOn).getTime() > new Date(b.createdOn).getTime()) {
        return -1;
      } else {
        return 0;
      }
    });

    return new Promise((resolve, reject) => resolve(tweets));
  }
  
}
