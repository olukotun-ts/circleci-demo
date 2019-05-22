const axios = require('axios');

module.exports = {
    data() {
        return {
            metadata: null,
        }
    },

    mounted() {
        this.getMetadata();
    },

    methods: {
        getMetadata() {
            axios.get('/metadata')
            .then(({ data }) => {
                this.metadata = data.cci_metadata;
            })
            .catch(error => {
                const message = 'Error getting metadata';
                console.error(message, '\n', error);
                this.metadata = message;
            })
        }
    },

    template: `
        <div>
            <ul> 
                <li v-for="(value, key) in metadata">
                    {{ key }}: {{ value }}
                </li>
            </ul>
        </div>
    `
};
