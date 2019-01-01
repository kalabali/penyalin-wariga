const cron = require('node-cron');
const http = require('http')
const db = require('./src/helpers/db');
const monthCrawl = require('./src/modules/month-crawl');
const dayCrawl = require('./src/modules/day-crawl');
const { getLastDate } = require('./src/helpers/utils');

const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

db.connect(async (err) => {
  if (err) {
    console.log(err);
    console.log('unable to connect to database');
  }
  else {
    console.log('connected to database');
  }
});

cron.schedule('*/3 * * * *', async () => {
  console.log(`running at ${Date()}`);
  try {
    const { forward_crawl } = await db.getDb().db('kalender-bali').collection('crawl_options').findOne({
      '_id': db.ObjectId("5c27735201c398e7aa61c6ee")
    });
    if (forward_crawl.month === 1 && forward_crawl.year === 3001) {
      console.log('stop forward')
      db.disconnect();
      return true;
    }
    const monthData = await startCrawl(forward_crawl.month, forward_crawl.year);
    console.log(JSON.stringify({ monthData }))

    let nextMonth = forward_crawl.month === 12 ? 1 : forward_crawl.month + 1;
    let nextYear = forward_crawl.month === 12 ? forward_crawl.year + 1 : forward_crawl.year;

    const status = await db.getDb().db('kalender-bali').collection('crawl_options').updateOne({
      '_id': db.ObjectId("5c27735201c398e7aa61c6ee")
    }, {
        $set: {
          "forward_crawl.month": nextMonth,
          "forward_crawl.year": nextYear,
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

    const datesEvent = await Promise.all(datesFetch);

    monthData.weeks = await Promise.all(monthData.weeks.map(async week => {
      try {
        week.dates = week.dates.map(d => {
          const { date } = d;
          const data = datesEvent.find(de => {
            return de.dateData.date == date;
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
        // console.log(week)

        let results = await db.getDb().db('kalender-bali').collection('calendar_dates').insertMany(week.dates);
        const { insertedIds, insertedCount } = results;
        for (let i = 0; i < insertedCount; i++) {
          week.dates[i] = db.ObjectId(insertedIds[i]);
        }

        // console.log({results})
        return week;
      }
      catch (e) {
        console.log({
          line: 'line 23',
          e
        })
      }
    }));

    let results = await db.getDb().db('kalender-bali').collection('calendar_months').insertOne(monthData);
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