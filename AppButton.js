const chance = require('chance').Chance();

module.exports = {
    data() {
        return {
            name: 'Click here'
        }
    },

    methods: {
        generateName() {
            this.name = chance.name({ suffix: true });
        }
    },

    template: `
        <label> Your new id:
            <button id="btn-main" v-on:click="generateName">{{ name }}</button>
        </label>
    `
};
