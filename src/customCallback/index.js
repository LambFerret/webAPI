exports.makeExpressCallback = (controller) => {
    return (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                "content-Type": req.get('content-Type'),
                Referer: req.get("referer"),
                'User-Agent': req.get('User-Agent')
            }
        }
        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                res.set(httpResponse.headers)
                }
                res.type('json')
                res.status(httpResponse.StatusCode).send(httpResponse.body)
            })
            .catch((e) => res.status(500).send({
                 error: 'An unknown error occured.',
                 message: e.message,
                }))
    }
}