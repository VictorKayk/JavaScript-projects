import app from './app';

const port = 5000 || process.env.PORT;
const host = 'localhost' || process.env.HOST;

// Starting server
app.listen(Number(port), host, () => console.log(`Server on in: http://${host}:${port}`));
