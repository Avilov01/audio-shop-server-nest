import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';

interface FieldErrors {
  field: string;
  messages: string[];
}

function flatten(errors: ValidationError[], parent = ''): FieldErrors[] {
  const result: FieldErrors[] = [];
  for (const error of errors) {
    const field = parent ? `${parent}.${error.property}` : error.property;
    if (error.constraints) {
      result.push({ field, messages: Object.values(error.constraints) });
    }
    if (error.children?.length) {
      result.push(...flatten(error.children, field));
    }
  }
  return result;
}

export function validationExceptionFactory(errors: ValidationError[]) {
  return new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    errors: flatten(errors),
  });
}
