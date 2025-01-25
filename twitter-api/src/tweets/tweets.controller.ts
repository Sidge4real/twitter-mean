import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TwitterService } from 'src/twitter/twitter.service';
import { Tweet } from 'src/types';

@Controller('tweets')
export class TweetsController {
    constructor(private twitterService: TwitterService) {

    }

    @Get()
    public async getTweets() {
        return await this.twitterService.getTweets();
    }

    @Get(":handle")
    public async getTweetsForHandle(@Param("handle") handle: string) {
        return await this.twitterService.getTweetsForHandle(handle);
    }

    @Post()
    public async createTweet(@Body() tweet: Tweet) {
        return await this.twitterService.createTweet(tweet);
    }
    
}
