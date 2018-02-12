import { expect } from 'chai';
import { CustomError, customErrorFactory } from '../src/index';

describe('Custom Error Factory', function() {
  const err: CustomError = customErrorFactory({
    name: 'SuperError',
    code: 'SUPER_ERROR',
    message: 'this is an error message',
    status: 500,
    foo: 'bar',
    baz: 'bat',
  });

  it('should be an instance of Error', function() {
    expect(err instanceof Error).to.be.true;
    expect(err instanceof CustomError).to.be.true;
  });

  it('should have all the properties passed', function() {
    expect(err.name).to.equal('SuperError');
    expect(err.getCode()).to.equal('SUPER_ERROR');
    expect(err.getMessage()).to.equal('this is an error message');
    expect(err.getStatus()).to.equal(500);
    expect(err.getExtraFields()).to.deep.equal({ foo: 'bar', baz: 'bat' });
  });
});

describe('Custom Error Class extension', function() {
  class SuperError extends CustomError {
    private anotherField: string;

    constructor(anotherField: string) {
      super({
        name: 'SuperError',
        code: 'SUPER_ERROR',
        message: 'this is an error message',
        status: 500,
        foo: 'bar',
        baz: 'bat',
      });
      this.anotherField = anotherField;
    }

    public getAnotherField() {
      return this.anotherField;
    }
  }
  const err: SuperError = new SuperError('testField');

  it('should be an instance of Error', function() {
    expect(err instanceof Error).to.be.true;
    expect(err instanceof CustomError).to.be.true;
    expect(err instanceof SuperError).to.be.true;
  });

  it('should have all the properties passed', function() {
    expect(err.name).to.equal('SuperError');
    expect(err.getCode()).to.equal('SUPER_ERROR');
    expect(err.getMessage()).to.equal('this is an error message');
    expect(err.getStatus()).to.equal(500);
    expect(err.getExtraFields()).to.deep.equal({ foo: 'bar', baz: 'bat' });
    expect(err.getAnotherField()).to.equal('testField');
  });
});
