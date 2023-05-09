
const axios = require('axios')
const { Client } = require('@notionhq/client');
const { Telegraf } = require('telegraf');


const notion = new Client({ auth: process.env.NOTION_API_KEY });


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('λ'));
bot.command('stat', ctx => {
    (async () => {
      let datename = new Date().toLocaleDateString('en-GB')
      let dateday = new Date().toISOString().slice(0, 10)
      const response = await notion.pages.create({
        parent: {
          database_id: process.env.STAT_DB, //Prot Stat DB
        },
        properties: {
          'nn/mm/yy': {
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: datename,
                },
              },
            ],
          },

          'DateStat': {
            type: 'date',
            date: {
              start: dateday,
            },
          },
        },
      });
      console.log(response);
    })();

    });
bot.command('new', ctx => {
    (async () => {
      let today = new Date().toISOString().slice(0, 10)
      const databaseId = process.env.STAT_DB;
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: 'DateStat',
              date: {
                equals: today,
              },
            },

          ],
        },
      });

      let pgid = response.results[0].id;
      const response1 = await notion.pages.create({
        parent: {
          database_id: process.env.TRACK_DB,  //Prot Track DB
        },
        properties: {
          'Name': {
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: 'New',
                },
              },
            ],
          },

          'Дата': {
            type: 'date',
            date: {
              start: today,
            },
          },
          'Protein Stat': {
            type: 'relation',
            relation: [
              {
                id: pgid
              },
            ],
          },
        },
      });

      console.log(response1);  

    })();

    });
    bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

