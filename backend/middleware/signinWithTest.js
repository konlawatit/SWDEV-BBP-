const signinWithTest = (req, res, next) => {
    console.log(req.method)
    const method = req.method
    const { username, password } = req.headers
    if (username === "test" && password === "test" && method === "GET") {
        req.headers.email = "konlawatit@gmail.com"
    } else if (username === "test" && password === "test" && method === "POST") {
        req.body.email = "konlawatit@gmail.com"
    }
    next();
}

module.exports = signinWithTest