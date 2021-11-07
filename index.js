let Fastify = require('fastify');
let mysql = require('mysql2/promise');

/**
 * Setup
 */
const PORT = process.env.PORT || 3000;


/**
 * Routes
 *
 * @param FastifyInstance $route
 */
async function Routes($route, $db){

	$route.get('*', (req,reply) => {
		reply
		.status(200)
		.send({
			'status': 'ok'
		});
	});
}


/**
 * Build
 *
 * @return FatifyInstance
 */
async function Build(){
  	const fastify = Fastify();
  	const conn = await mysql.createConnection({
  		host:'localhost', 
  		user: 'root',
  		password: 'root',
  		database: 'look'
  	})

  	await Routes(fastify, conn);

  	return fastify;
}

Build()
  .then(fastify => fastify.listen(PORT), console.log(`Server running on PORT:${PORT}`))
  .catch(console.error)