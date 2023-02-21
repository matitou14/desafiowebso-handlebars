const express = require('express');

const router = express();

 router.get('/', (req, res) => {
    const products = []

    res.render('index',{products});
});

module.exports = router;