const express = require('express');
const app = express();

app.get('/test', (req, res, next) => {
    countries = [{ id: 0, country: "Noruega", year: 2015, days: 17 }];
    res.send(200, countries);
    next();
});

app.listen(2002, () => {
    console.log('Corre en servidor 2002');
})