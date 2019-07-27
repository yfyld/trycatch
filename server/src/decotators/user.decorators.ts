import { createParamDecorator } from '@nestjs/common';
export const Auth = createParamDecorator((data, req) => {
  return req.user;
});
