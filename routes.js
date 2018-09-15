const routes = require('next-routes')();

routes.add('/items/sell','/items/sell');

routes.add('/items/:index','/items/details');

routes.add('/user/listings/:address','/user/listings/listings');
routes.add('/user/purchases/:address','/user/purchases/purchases')

module.exports = routes;