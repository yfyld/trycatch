import { HttpBadRequestError } from './../errors/bad-request.error';
import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  keys: string[] = [];
  constructor(keys = []) {
    if (keys) {
      this.keys = keys;
    }
  }
  async transform(value: string | Object, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      const val = parseInt(value, 10);
      if (isNaN(val)) {
        throw new HttpBadRequestError('Validation failed');
      }
      return val;
    } else {
      if (this.keys.length === 0) {
        this.keys = Object.keys(value);
      }
      for (let i in this.keys) {
        const key = this.keys[i];
        if (!value[key]) {
          continue;
        }
        value[key] = parseInt(value[key], 10);
        if (isNaN(value[key])) {
          throw new HttpBadRequestError('Validation failed');
        }
      }
      return value;
    }
  }
}
