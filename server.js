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
        console.log('Error: GET /metadata');
        console.log(error);

        res.status(500).send(error);
    });
});

app.get('/weather', (req, res) => {
    axios.get('api.openweathermap.org/data/2.5/weather', {
        params: {
            APPID: process.env.WEATHER_API_TOKEN,
            q: 'London,uk'
        }
    })
    .then(({ data }) => {
        console.log('>>> weather data:', data);
        res.send(data);
    })
    .catch(error => {
        console.log('Error: GET /weather');
        console.log(error);
        
        res.status(500).send(error);
    });

})

app.listen(port, () => console.log(`Listening on port ${port}.`));
