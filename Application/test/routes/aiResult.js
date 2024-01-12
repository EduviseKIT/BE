var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/test', function(req, res, next) {
    console.log("afasd");
});

router.post('/aiAPITest', async function(req, res, next) {
    var {grade, subject} = req.body;
    console.log(grade);
    // grade = grade.split(','); subject = subject.split(',')
    const url = 'http://127.0.0.1:5000/AI/recommend';
    console.log(subject);
    // url = '/AI/test';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({grade, subject})
        });

        console.log(JSON.stringify({grade, subject}))

        
        if(!response && !response.result){
            res.send({
                result: "response.result"
            });
        }else{
            const data = await response.json();
            res.send(data);
            console.log(data)
        }
        

    } catch (error) {
        console.error('Error occurred during API call:', error);
        // Handle the error and send an appropriate response to the client
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;