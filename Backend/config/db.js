
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 1000,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'adminroot',
    database : 'Homeaway'
  });
  
  pool.getConnection(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    //console.log('connected as id ' + pool.threadId);
  });
  module.exports = pool;