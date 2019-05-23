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
            <div>
                <label> Your new id:
                    <button id="btn-main" v-on:click="generateName">{{ name }}</button>
                </label>
            </div>
            <circle-data></circle-data>
            <div class="container" v-for="city in weather">
                <div>{{ city.temp }}</div>
                <div class="h2">{{ city.name }}</div>
                <div class="text-muted">{{ city.description }}</div>
            </div>
        </div>
    `
};
