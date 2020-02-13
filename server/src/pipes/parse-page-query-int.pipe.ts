import { HttpBadRequestError } from '../errors/bad-request.error';
import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryListQuery } from '@/interfaces/request.interface';

@Injectable()
export class ParsePageQueryIntPipe implements PipeTransform<string> {
  keys: string[] = [];
  constructor(keys = []) {

    if (keys) {
      this.keys = keys;
    }
  }
  async transform(value: any, metadata: ArgumentMetadata) {

    if (this.keys.length === 0) {
      this.keys = Object.keys(value.query);
    }
    for (let i in this.keys) {
      const key = this.keys[i];
      if (!value.query[key]) {
        continue;
      }
      value.query[key] = parseInt(value.query[key], 10);
      if (isNaN(value.query[key])) {
        throw new HttpBadRequestError('Validation failed');
      }
    }
    return value;
  }
}
