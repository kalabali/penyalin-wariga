require('dotenv').config();

const cron = require('node-cron');
const express = require('express');
const axios = require('axios');
const db = require('./src/helpers/db');
const monthCrawl = require('./src/modules/month-crawl');
const dayCrawl = require('./src/modules/day-crawl');
const { getLastDate } = require('./src/helpers/utils');

const app = express();

app.listen(process.env.PORT || 4000, () => {
  console.log('listenning on 4000');
});

app.get('/', (req,res) => {
  res.status(200).send('ntar')
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

db.connect(async (err) => {
  if (err) {
    console.log(err);
    console.log('unable to connect to database');
  }
  else {
    console.log('connected to database');
  }
});

cron.schedule('*/15 * * * *', () => {
  axios.get("https://penyalin-wariga.herokuapp.com/")
  .then(({ data }) => {
    console.log(data);
  })
  .catch(e => console.log(e))
})

cron.schedule('*/2 * * * *', async () => {
  console.log(`running at ${Date()}`);
  try {
    const { forward_crawl, backward_crawl, is_stop } = await db.getDb().db(process.env.DB_NAME).collection('crawl_options').findOne({
      '_id': db.ObjectId(process.env.CRAWL_ID)
    });

    console.log({ forward_crawl, backward_crawl, is_stop })

    if(is_stop){
      console.log("stop crawl");
      return true;
    }
    if ((forward_crawl.month === 1 && forward_crawl.year === 3001) || (backward_crawl.month === 1 && backward_crawl.year === 1600)) {
      console.log('stop forward')
      db.disconnect();
      return true;
    }    

    const forwardMonthData = await startCrawl(forward_crawl.month, forward_crawl.year);
    console.log(JSON.stringify({ forward: forwardMonthData }))

    let nextMonth = forward_crawl.month === 12 ? 1 : forward_crawl.month + 1;
    let nextYear = forward_crawl.month === 12 ? forward_crawl.year + 1 : forward_crawl.year;

    const backwardMonthData = await startCrawl(forward_crawl.month, forward_crawl.year);
    console.log(JSON.stringify({ backward: backwardMonthData }))

    let backMonth = backward_crawl.month === 1 ? 12 : backward_crawl.month - 1;
    let backYear = backward_crawl.month === 1 ? backward_crawl.year - 1 : backward_crawl.year;


    const status = await db.getDb().db(process.env.DB_NAME).collection('crawl_options').updateOne({
      '_id': db.ObjectId(process.env.CRAWL_ID)
    }, {
        $set: {
          "forward_crawl.month": nextMonth,
          "forward_crawl.year": nextYear,
          "backward_crawl.month": backMonth,
          "backward_crawl.year": backYear,
        }
      })
    // db.disconnect();
  }
  catch (err) {
    console.log({      
      err
    })
  }
});

const startCrawl = async (month, year) => {
  try {
    let isSuccess = true;
    const lastDate = getLastDate(month, year);
    const { monthData, events } = await monthCrawl({ month, year });

    let datesFetch = [];
    for (let i = 1; i <= lastDate; i++) {
      datesFetch.push(dayCrawl({ date: i, month, year }));
    }

    const datesData = await Promise.all(datesFetch);

    monthData.weeks = await Promise.all(monthData.weeks.map(async (week, index) => {
      try {
        week.dates = week.dates.map(d => {
          const { date } = d;
          const data = datesData.find(({ dateData }) => {                        
            return dateData.date == date;
          });

          const dEvents = events.filter(event => {
            return event.date == date;
          });

          if (dEvents.length > 0) {
            data.dateData.events = dEvents.map(d => d.events);
          }

          data.dateData.year = monthData.year;
          data.dateData.ingkel = week.ingkel;
          return data.dateData;
        });        

        let results = await db.getDb().db(process.env.DB_NAME).collection('calendar_dates').insertMany(week.dates);
        const { insertedIds, insertedCount } = results;
        for (let i = 0; i < insertedCount; i++) {
          week.dates[i] = db.ObjectId(insertedIds[i]);
        }
        return week;
      }
      catch (e) {
        console.log({
          line: 'line 23',
          e
        })
      }
    }));

    let results = await db.getDb().db(process.env.DB_NAME).collection('calendar_months').insertOne(monthData);
    // console.log(results)    
    // console.log(JSON.stringify(monthData))
    // console.log(JSON.stringify(events))
    // console.log(JSON.stringify(dates))
    return monthData;
  }
  catch (e) {
    console.log(e)
  }
}