module.exports = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode || 500;
    console.log('Error handler ran.')
    console.log(err)
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}