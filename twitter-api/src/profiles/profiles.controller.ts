import { Controller, Get, Param } from '@nestjs/common';
import { TwitterService } from 'src/twitter/twitter.service';

@Controller('profiles')
export class ProfilesController {

    constructor(private twitterService: TwitterService) {

    }

    @Get()
    getProfiles() {
        return this.twitterService.getProfiles();
    }

    @Get(":handle")
    getProfile(@Param("handle") handle: string) {
        return this.twitterService.getProfile(handle);
    }
    

}
