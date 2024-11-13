exports.getError = (req,res) => {
    res.status(404).render('errorHandler', {docTitle: '404 Error!'});
}