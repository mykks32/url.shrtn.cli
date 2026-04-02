#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';
import dotenv from 'dotenv';
import * as path from 'path';

// Load root .env file
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const program = new Command();
const API = process.env.API_URL || 'http://localhost:3000';

// Command: shorten a URL
program
    .command('shorten <url>')
    .description('Shorten a URL and get the short code')
    .action(async (url) => {
        try {
            const res = await axios.post(`${API}/shorten`, { url });
            console.log('Short Code:', res.data.shortCode);
        } catch (err: any) {
            console.error('Error shortening URL:', err.response?.data || err.message);
            process.exit(1);
        }
    });

// Command: open a short code
program
    .command('open <code>')
    .description('Print the full URL for a given short code')
    .action((code) => {
        console.log(`${API}/${code}`);
    });

// Show help if no command is passed
if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
}

program.parse(process.argv);