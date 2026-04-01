#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';

const program = new Command();
const API = 'http://localhost:3000';

program
    .command('shorten <url>')
    .action(async (url) => {
        const res = await axios.post(`${API}/shorten`, { url });
        console.log('Short Code:', res.data.shortCode);
    });

program
    .command('open <code>')
    .action((code) => {
        console.log(`${API}/${code}`);
    });

program.parse(process.argv);