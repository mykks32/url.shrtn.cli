import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://shrig:shrig@cluster0.ucwnukt.mongodb.net/practice'
        ),
        UrlModule
    ]
})
export class AppModule {}