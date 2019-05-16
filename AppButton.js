const chance = require('chance').Chance();
const CircleData = require('./CircleData');

module.exports = {
    data() {
        return {
            name: 'Click here'
        }
    },

    components: {
        'circle-data': CircleData
    },

    methods: {
        generateName() {
            this.name = chance.name({ suffix: true });
        }
    },

    template: `
        <div>
            <div>
                <label> Your new id:
                    <button id="btn-main" v-on:click="generateName">{{ name }}</button>
                </label>
            </div>
            <circle-data></circle-data>
        </div>
    `
};
