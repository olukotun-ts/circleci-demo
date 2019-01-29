const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});
app.listen(port, () => console.log(`Listening on port ${port}.`));
