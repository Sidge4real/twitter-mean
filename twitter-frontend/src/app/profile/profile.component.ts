import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitterService } from '../twitter.service';
import { Profile, Tweet } from 'src/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private profile: Profile | undefined;
  private tweets: Tweet[] = [];

  constructor(private activatedRoute: ActivatedRoute, private twitterService: TwitterService) { }
  
  async loadProfileAndTweets(handle: string) {
    this.profile = await this.twitterService.getProfile(handle);
    let tweets = await this.twitterService.getTweets();
    this.tweets = tweets.filter(t => t.handle === handle);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let handle = params.get('handle')!;
      this.loadProfileAndTweets(handle);
    });
  }

  get Profile() {
    return this.profile;
  }

  get BannerUrl() {
    return "/assets/images/banners/" + this.profile!.handle + ".png";
  }

  get Tweets() {
    return this.tweets;
  }

  get AvatarUrl() {
    return "/assets/images/avatars/" + this.profile!.handle + ".png";
  }


}
