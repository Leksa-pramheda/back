// Importing http libraries
const http = require('http');
  
// Creating a server
const server = http.createServer
(
    (req, res) => 
    {
        const url = req.url;
        const method = req.method;
    

    
        function ConvertToJSON(req){
            req.body = JSON.parse(req.body)
            //req.body = req.body.toJSON
            console.log(req.body)
            console.log(typeof(req.body))
            console.log(req.body.a)
            console.log(req.body.b)
            console.log(req.body.str)
            return(req.body)
        }

        if (url === '/sum' && method === 'POST') {
            const body = [];
    
            req.on('data',  (chunk) => {
    
                // Storing the chunk data
                //console.log(req)
                body.push(chunk)
                req.body=body.toString('utf8');
                req.body = ConvertToJSON(req)
                console.log(req.body.b)
                console.log(req.body.str)
                //return (req.body)
                //req.body = JSON.stringify(body.toString('utf8'))
                // req.body = req.body.toJSON()
                
                // console.log("data2:",body.toString('utf8'))
                // console.log(typeof(req.body))
                // let start=-1
                // let start2=-1
                // let finish = 0
                // //let news=""
                // let pos = 0
                // keys = []
                // values = []
                // i=0
                // console.log(req.body.length-1)
                // while(finish < req.body.length-1){
                //     start = req.body.toString().indexOf("\"",finish)
                //     pos = req.body.toString().indexOf("\"",start)
                //     start++
                //     keys[i] = req.body.toString().substr(start, pos - start)
                //     console.log("st=",start," fn=",pos)
                //     start2 = req.body.toString().indexOf(":", pos)
                //     if (req.body.includes(",",start2)){
                //         finish = req.body.toString().indexOf(",",start2)
                //     }
                //     else{
                //         finish = req.body.toString().indexOf("}",start2)
                //     }
                //     values[i] = req.body.toString().substr(start2, finish - start2)
                    
                //     console.log(values[i], "fin=",finish)
                //     i++
                // }
                // console.log("keys:", keys)
                // console.log("values:",values)




                // for (key in req.body){
                //     let start = req.body.toString().indexOf("\"")
                //     start++
                //     let finish = req.body.toString().indexOf(",")
                //     start++
                    
                //     if (req.body[key] === "a"){
                //         start = key 
                //         start++
                //         console.log("YESSSSSSSSSSSSs ",req.body[key+1])
                //         //break;
                //     }
                //     if ((start != null) & (key > start+2)){
                //         news+=req.body[key]
                //     }
                //     if ((req.body[key] === ",") & (start != null)){
                //         console.log("THIS" )
                //         finish=key
                //         break;
                //     }
                //     console.log("key[",key,"]= ",req.body[key])
                // }
                // let answer=""
                // console.log(news)
                // // console.log("start= ",start, " finish=", finish)
                // let start0 = req.body.toString().indexOf("a")
                // start++
                // let finish0 = req.body.toString().indexOf(",")
                // start++

                // console.log("req ",req.body.toString().substr(start0, finish0 - start0))
                
            a = req.body.a
            b = req.body.b
            c = (a + b).toString()
            res.write(c)
            res.end()
            })
               // return res.end();
        }

        if (url === '/test' && method === 'POST') {
                const body = [];
        
                req.on('data',  (chunk) => {
        
                    // Storing the chunk data
                    //console.log(req)
                    body.push(chunk)
                    req.body=body.toString('utf8');
                    req.body = ConvertToJSON(req)
                    console.log(req.body.a + req.body.b)
                    console.log(req.body.str)
                    //res.write(req.body.b)
                    res.write( req.body.str.toString())
                    res.end()
                })    
            


            // req.on('body', (chunk) => {
    
            //     // Storing the chunk data
            //     console.log("body:")
            //     console.log( req.body)
            // });
    
            // req.on('end', () => {
    
            //     // Parsing the chunk data
            //     const parsedBody = Buffer.concat(body).toString();
            //     const message = parsedBody.split('=')[1];
                
            //     // Printing the data
            //     console.log("mes:",message);
            // });
    
            //console.log(req.body)
            res.statusCode = 200;
            res.setHeader('Location', '/');
           // return res.write(req.body.a + req.body.b);
        }

        // if (url === '/sum') {
        //     // Sending the response
        //     //res.write(req)
        // // res.write(req.body.Buffer)
        // a = req.body.a
        // b = req.body.b
        // res.write(a + b)
        //     return res.end();
        // }
    }
)
  
// Starting the server
server.listen(3000);