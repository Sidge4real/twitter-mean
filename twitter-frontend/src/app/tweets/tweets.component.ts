import { Component, Input } from '@angular/core';
import { Tweet } from 'src/types';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent {
  @Input() tweets: Tweet[] = [];

  get Tweets() {
    return this.tweets;
  }
}
