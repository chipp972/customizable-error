export interface ErrorOptions {
  name?: string;
  message: string;
  code?: string;
  status?: number;
  [param: string]: any;
}

/**
 * @class CustomError
 * @extends {Error}
 */
export class CustomError extends Error {
  private status: number;
  private code: string;
  private extras: any;

  constructor(options: ErrorOptions) {
    super(options.message);
    const baseProperties: string[] = ['message', 'status', 'code', 'name'];
    this.name = options.name || this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(options.message).stack;
    }
    this.status = options.status || 500;
    this.code = options.code || 'ERROR';
    this.extras = {};
    Object.keys(options)
      .filter((opt: string) => baseProperties.indexOf(opt) === -1)
      .forEach((param: string) => {
        this.extras[param] = options[param];
      });
  }

  public getMessage() {
    return this.message;
  }

  public getStatus() {
    return this.status;
  }

  public getCode() {
    return this.code;
  }

  public getExtraFields() {
    return this.extras;
  }
}

/**
 * returns an instance of a custom error
 * @param {ErrorOptions} options
 */
export const customErrorFactory = (options: ErrorOptions) =>
  new CustomError(options);
