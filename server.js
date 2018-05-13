const Koa = require('koa'),
	Router = require('koa-router'),
	path = require('path'),
	static = require('koa-static');

const app = new Koa(),
	router = new Router(),
	dirName = static(`${path.join(__dirname)}/public`);

app
	.use(dirName)
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);