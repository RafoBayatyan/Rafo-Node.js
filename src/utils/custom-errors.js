/* eslint-disable max-classes-per-file */
export class ControllerError extends Error {
     constructor(statusCode, message) {
          super();
          this.message = message;
          this.statusCode = statusCode;
          this.location = 'Controller';
          // this.msg = customMessage;
     }
}

export class FactoryError extends Error {
     constructor(statusCode, message) {
          super();
          this.message = message;
          this.statusCode = statusCode;
          this.location = 'Factory';
          // this.msg = customMessage;
     }
}
