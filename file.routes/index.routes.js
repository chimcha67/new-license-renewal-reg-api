module.exports=function(app){
    app.use(function(res, req, next){
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Credentials', true
        );
        next()
    })
}

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });