export class ControllerError extends Error {
     constructor(statusCode, message, customMessage) {
          super();
          this.message = message;
          this.statusCode = statusCode;
          this.location = 'Controller';
          this.msg = customMessage;
     }
}
