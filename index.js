require('dotenv').load()
const Changelly = require('./changelly.js')
const URL = require('url-parse')
const Redis = require('redis')

const url = new URL(process.env.REDIS_URL)
const redis_client = Redis.createClient(url.port, url.hostname)

redis_client.rpush(['frameworks1', JSON.stringify({
  'javascript': 'AngularJS',
  'css': 'Bootstrap',
  'node': 'Express'
})]);

redis_client.rpush(['frameworks1', JSON.stringify({
  'javascript1': 'AngularJS',
  'css1': 'Bootstrap',
  'node1': 'Express'
})]);

redis_client.on("error", function (err) {
  console.log("Error: " + err);
})

var changelly = new Changelly(
  process.env.CHANGELLY_API_KEY,
  process.env.CHANGELLY_SECRET
)

changelly.on('status', function(data) {
  redis_client.rpush(['transaction_statuses', JSON.stringify(data)])
})

