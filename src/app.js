import express from 'express';
import {
  userRouter,
  groupRouter,
  userGroupRouter
} from './routers/';
import {
  config
} from 'dotenv';
import {
  db
} from '../models';

config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({
      code: 400,
      message: "bad request"
    });
  } else next();
});

app.use('/api', userRouter);
app.use('/api', groupRouter);
app.use('/api', userGroupRouter);


app.listen(PORT, async () => {
  try {
    console.log(`Server start on port ${PORT}`)
    await db.sequelize.sync();
    console.log('Successfull database connection');
  } catch (error) {
    console.log(error)
    console.log('Error database connection');
  }
});
