const router = require('express').Router();

const apiRoute = require('./api, apiRoute');

router.use('/api', apiRoute);

router.use((req,res) => {
    res.status(404).send('<h1> 404 </h1>');
});

module.exports = router;