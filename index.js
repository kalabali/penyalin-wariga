const purnamaTilem = require('./purnama-tilem');

purnamaTilem("november", 2018)
.then(data => console.log({data}))
.catch(err => console.log({erre: err }))