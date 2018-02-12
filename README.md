# Customizable error

## Description

Let you define an error with custom fields to pass extra informations with message

## Installation

```bash
npm i --save customizable-error
```

## Using the factory

```javascript
import { customErrorFactory } from 'customizable-error';

// some code that throw an error
(req, res, next) => {
  next(
    customErrorFactory({
      name: 'SuperError',
      code: 'SUPER_ERROR',
      message: 'this is an error message',
      status: 500,
      foo: 'bar',
      baz: 'bat',
    }),
  );
}

// some code that handles the error

const errorHandler = (err, req, res, next) => {
  res.status(err.getStatus()).json({
    success: false,
    message: err.getMessage(), // 'this is an error message'
    code: err.getCode(), // 'SUPER_ERROR'
    data: err.getExtraFields(), // { foo: 'bar', baz: 'bat' }
  });
};
```

## Extending the class

```javascript
import { CustomError, ErrorOptions } from 'customizable-error';

class SuperError extends CustomError {
  constructor() {
    super({
      name: 'SuperError',
      code: 'SUPER_ERROR',
      message: 'this is an error message',
      status: 500,
      foo: 'bar',
      baz: 'bat',
    })
  }
}

// some code that throw an error
(req, res, next) => {
  next(SuperError());
}

// some code that handles the error
const errorHandler = (err, req, res, next) => {
  res.status(err.getStatus()).json({
    success: false,
    message: err.getMessage(), // 'this is an error message'
    code: err.getCode(), // 'SUPER_ERROR'
    data: err.getExtraFields(), // { foo: 'bar', baz: 'bat' }
  });
};
```
