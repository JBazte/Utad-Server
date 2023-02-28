const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === '8a73b35e-9fca-4d9c-8ecf-5514e4d8640a') {
            next();
        }
        else {
            res.status(403).send("The API key provided is not valid. Please check that the key is correct and try again.");
        }
    } catch (err) {
        res.status(403).send(err);
    }
}

module.exports = customHeader 