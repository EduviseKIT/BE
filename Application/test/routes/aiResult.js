var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/test', function(req, res, next) {
    console.log("afasd");
});

router.post('/aiAPITest', async function(req, res, next) {
    // 프런트에서 body를 통해 넘어온 데이터에 key가 target인 것만 들고 온다.
    // 넘어오는 데이터는 json 형식인다.
    const { target} = req.body;
    var url = 'http://127.0.0.1:5000/AI/test';

    
    console.log('Received data from client:', { target});
    console.log(JSON.stringify({target}))

    // AI서버로 값을 보낸다.
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ target })
        });
        // AI의 결과를 받아 온다.
        const data = await response.json();
        
        //결과에 있는 상품들을 DB에서 검색해서 프런트로 준다
        // DB와 관련되 정보가 없어서 보류

        // AI의 결과값을 프런트의 요청의 응답으로 보낸다.
        res.send(data);


    } catch (error) {
        console.error('Error occurred during API call:', error);
        // Handle the error and send an appropriate response to the client
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;