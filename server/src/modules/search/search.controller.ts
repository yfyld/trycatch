import { SearchService } from './search.service';
import {
  Controller,
  Get,
  Post,

  Query,
  Req,

} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';

@ApiUseTags('上传日志')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ title: '上报错误日志', description: '' })
  @ApiResponse({ status: 200 })
  @Post('/error.gif')
  createErrorLogByBody(@Req() req:any): Promise<void> {
    return this.searchService.createLogIndex(req.body,req.ip.replace(/[^.\d]/g,''),req.headers['user-agent']);
    // .catch(err => {
    //   throw err;
    // })
    // .then(() => null);
  }

  @ApiOperation({ title: '上报错误日志', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @Get('/error.gif')
  createErrorLogByQuery(@Query() query: any): Promise<void> {
    return;
  }
}
