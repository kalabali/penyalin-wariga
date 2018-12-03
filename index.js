const purnamaTilem = require('./src/purnama-tilem');
const wuku = require('./src/wuku');

const kalenderBali = {
    purnamaTilem,
    wuku
}

// purnamaTilem(11, 2019)
// .then(data => console.log({data}))
// .catch(err => console.log({erre: err }))

kalenderBali.purnamaTilem({
    month: 11,
    year: 2018
})
    .then(data => console.log({ data }))
    .catch(err => console.log({ err }))

kalenderBali.wuku({
    month: 11,
    year: 2018
})
    .then(data => console.log({ data }))
    .catch(err => console.log({ err }))

module.exports = kalenderBali