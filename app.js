const { response } = require('express');
const express=require('express')
const request=require('request')
const app=express()

//middlewares
app.set("view engine","ejs");
app.use('/public',express.static('public'));


//routing

app.get('/',(req,res)=>{
    //res.send('Home page')
    res.render("home")
})



app.get('/result',(req,res)=>{
 
    const url=`http://www.omdbapi.com/?apikey=5d582958&s=${req.query.movieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('results',{data:data})
        }
        else{
         res.send('Something went wrong')
        }

    });
    
      
});

app.get('/result/:id',(req,res)=>{

    const url=`http://www.omdbapi.com/?apikey=5d582958&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('info',{movie:data})
        }
        else{
         res.send('Something went wrong')
        }

    });
    

})

app.get('*',(req,res)=>{
    res.send('404 not found');
})
app.listen(3000, ()=>{
    console.log(`Server has started at port 3000`);
});
