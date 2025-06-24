export default function logger(req, res, next) {
    const start = Date.now();
    const body = req.body;
    const query = req.query;
    const headers = req.headers;
    const method = req.method;
    const url = req.url;
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`Request Body:${body},Search Query :${query},Request Headers:${headers},total Request Duration:${duration},Request Method:${method},Request URL:${url}`);
    })
    next();
}