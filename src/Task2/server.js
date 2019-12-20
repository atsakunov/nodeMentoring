import express from 'express';

import {
    router as userRouter
} from './router';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send({
            code: 400,
            message: "bad request"
        });
    } else next();
});

app.use('/api', userRouter);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));