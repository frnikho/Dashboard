const express = require('express')
const app = express();
const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => {
    console.log("Server shutting down...");
   process.exit(0);
});