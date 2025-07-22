const express = require('express');
const port = 3000

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('express is working baby');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
}).on('error', (err) => {
    console.error('Server error:', err);
});