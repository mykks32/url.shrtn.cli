import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';

@Module({
    imports: [
        MongooseModule.forRoot(
          // mongourl
        ),
        UrlModule
    ]
})
export class AppModule {}