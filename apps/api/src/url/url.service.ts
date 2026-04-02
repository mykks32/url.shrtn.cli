import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './url.schema';
import { generateShortCode } from '@mykks32/common';

@Injectable()
export class UrlService {
    constructor(@InjectModel(Url.name) private model: Model<UrlDocument>) {}

    async shorten(originalUrl: string) {
        const shortCode = generateShortCode();
        return this.model.create({ originalUrl, shortCode });
    }

    async resolve(code: string) {
        const url = await this.model.findOne({ shortCode: code });

        if (!url) throw new NotFoundException('URL not found');

        url.clicks += 1;
        await url.save();

        return url.originalUrl;
    }
}