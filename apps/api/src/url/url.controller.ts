import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller()
export class UrlController {
    constructor(private readonly service: UrlService) {}

    @Post('shorten')
    shorten(@Body('url') url: string) {
        return this.service.shorten(url);
    }

    @Get(':code')
    async redirect(@Param('code') code: string, @Res() res: Response) {
        const url = await this.service.resolve(code);
        return res.redirect(url);
    }
}