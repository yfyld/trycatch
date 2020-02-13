// import { ChartService } from './helper.chart.service';
import { SlsService } from './sls.service';
import { Module, Global, HttpModule } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [SlsService],
  exports: [SlsService]
})
export class SlsModule {}
