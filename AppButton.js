const axios = require('axios');
const chance = require('chance').Chance();
const CircleData = require('./CircleData');

module.exports = {
    data() {
        return {
            name: 'Click here',
            weather: null
        }
    },

    mounted() {
        this.getWeather();
    },

    methods: {
        generateName() {
            this.name = chance.name({ suffix: true });
        },
        
        getWeather() {
            axios.get('/weather')
            .then(({ data }) => {
                this.weather = data;
            })
        }
    },

    components: {
        'circle-data': CircleData
    },

    template: `
        <div>
            <div class="d-none">
                <label> Your new id:
                    <button id="btn-main" v-on:click="generateName">{{ name }}</button>
                </label>
            </div>
            <h1 class="text-center">Weather Dashboard</h1>
            <div class="container-fluid text-center p-4" v-for="city in weather">
                <button type=button class="btn btn-info container-fluid p-3">
                    <div>{{ city.temp }}</div>
                    <div class="font-weight-bolder h2">{{ city.name }}</div>
                    <div class="font-italic font-weight-lighter">{{ city.description }}</div>
                </button>
            </div>
            <circle-data></circle-data>
        </div>
    `
};
