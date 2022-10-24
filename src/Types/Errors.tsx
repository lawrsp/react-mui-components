export type FieldError = {
  field: string;
  message: string;
};

// 使用 BaseError 当作 base Error class
export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, new.target);
    }
    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }
  }
}

export class APIError extends BaseError {
  status?: number;
  code: number = -1;
  fields?: Array<FieldError>;
}

export interface FormError {
  message: string;
  fields?: FieldError[];
}
