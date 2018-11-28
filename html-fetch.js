const axios = require('axios');

const htmlFetch = url => {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(({ data }) => resolve(data))
            .catch(err => {
                console.log({ err })
                reject(0);
            })
    })
}

module.exports = htmlFetch;