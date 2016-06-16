if(process.env.DATABASE_URL){
  var database = process.env.DATABASE_URL;
}

module.exports = {
  'development': {
    'database': 'citybook',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'production': {
    'url': database,
    'dialect': 'postgres'
  }
}
