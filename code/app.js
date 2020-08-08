const Koa  = rquire('koa');

const app = new Koa();


app.listen(3000, () => {
    console.log('server is running🍺');
})