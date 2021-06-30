const express = require('express');
const boolParser = require('express-query-boolean');
const logger = require('morgan');
const cors = require('cors');
const HttpCode = require('./helpers/constants');
const usersRouter = require('./routes/api/users');
const projectsRouter = require('./routes/api/projects');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const code = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const statusError = err.status ? 'error' : 'fail';

  res.status(code).json({ status: statusError, code, message: err.message });
});

module.exports = app;
