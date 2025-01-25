import { Module } from '@nestjs/common';
import { TwitterService } from './twitter/twitter.service';
import { ProfilesController } from './profiles/profiles.controller';
import { TweetsController } from './tweets/tweets.controller';

@Module({
  imports: [],
  controllers: [ProfilesController, TweetsController],
  providers: [TwitterService],
})
export class AppModule {}
