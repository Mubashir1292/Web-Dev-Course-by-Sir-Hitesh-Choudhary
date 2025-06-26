export default function logger(req, res, next) {
    const start = Date.now();

    const { query, headers, method, url } = req;
    const body = req.body || {};
    res.on("finish", () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        const logData = {
            timestamp: new Date().toISOString(),
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            query: Object.keys(query).length ? query : undefined,
            body: Object.keys(body).length ? body : undefined,
            headers: {
                'user-agent': headers['user-agent'],
                referer: headers['referer'],
                // Add other headers you want to log
            }
        };
        
        console.log('Request Log:', JSON.stringify(logData, null, 2));
    });
    
    next();
}