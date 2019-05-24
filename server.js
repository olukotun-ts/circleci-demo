require('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/metadata', (req, res) => {
    axios.get('https://circleci.com/api/v1.1/project/github/olukotun-ts/name-button', {
        params: {
            'circle-token': process.env.CIRCLE_API_TOKEN,
            limit: 1
        }
    })
    .then(({ data }) => {
        const {
            committer_email,
            committer_name,
            reponame,
            subject
        } = data[0];

        res.send({ cci_metadata: {
            committer_email,
            committer_name,
            reponame,
            subject
        }});
    })
    .catch(error => {
        const message = 'Error: GET /metadata';
        console.log(message, '\n', error);

        res.status(500).send(message);
    });
});

app.get('/weather', (req, res) => {
    const cities = [
        4930956,    // Boston
        5419384,    // Denver
        5391959     // SanFrancisco
    ];

    axios.get('https://api.openweathermap.org/data/2.5/group', {
        params: {
            APPID: process.env.WEATHER_API_TOKEN,
            id: cities.toString(),
            units: 'imperial'
        }
    })
    .then(({ data }) => {
        const response = data.list.map(city => {
            return {
                name: city.name,
                temp: Math.round(city.main.temp),
                description: city.weather[0].description
            }
        });

        res.send(response);
    })
    .catch(error => {
        const message = 'Error: GET /weather';
        console.log(message, '\n', error);

        console.log('>>> appid:', process.env.WEATHER_API_TOKEN);
        console.log('>>> cciid:', process.env.CIRCLE_API_TOKEN);
        
        res.status(500).send(message);
    });

})

app.listen(port, () => console.log(`Listening on port ${port}.`));
