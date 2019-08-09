import { UaService } from './helper.ua.service';
import { Module, Global, HttpModule } from '@nestjs/common';
import { IpService } from './helper.ip.service';

const services = [IpService,UaService];

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class HelperModule {}
