import { ModelType } from 'typegoose';
import { PaginateModel, Document } from 'mongoose';

export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>;
