const application = app =>{
    app.once('server',server=>{
        console.log('serve is running....');
    })

    app.on('error',ctx=>{
        console.log(ctx.error);
    })

    app.on('request',ctx=>{
        // console.log('request----');

    })

    app.on('response',ctx=>{
        // console.log('response-----');
        // let time = Date.now() - ctx.starttime;
        // console.log(time);
    })


}

module.exports  = application