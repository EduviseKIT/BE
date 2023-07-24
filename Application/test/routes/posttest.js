var express = require('express');
var {Client} = require('pg');

var router = express.Router();

const pg = new Client({
    user: "junsu",
    host: "10.100.54.55",
    database:"test",
    password: "12345",
    port: 5432
  });
  
  pg.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('posttest', { title: 'AI_tset' });
});

/* GET home page. */
router.post('/', function(req, res, next) {

    sql = "select * from newtable where\"" + req.body.col + "\"=" + req.body.stx + ";"
    console.log(sql);
    pg.query(sql, function(err, result){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }else{
            res.send(result);
        }
      });
  });

module.exports = router;