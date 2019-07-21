import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permission: string[]) => SetMetadata('permissions', permission);
