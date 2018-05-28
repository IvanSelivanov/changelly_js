var Changelly = require('./lib.js');

var changelly = new Changelly(
  '0a970c7046e44ade9f4d09dc037dfc8c',
  '8da34f4b2a9bcccceed1416c670aa4da509c8bc2686e06a9aea017cee3cc5fae'
);

changelly.on('payin', function(data) {
  console.log('payin', data);
});

changelly.on('status', function(data) {
  console.log('status', data);
});
