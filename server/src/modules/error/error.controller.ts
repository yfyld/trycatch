import { ParsePageQueryIntPipe } from './../../pipes/parse-page-query-int.pipe';
import { ParseIntPipe } from './../../pipes/parse-int.pipe';
import { QueryListQuery } from '@/interfaces/request.interface';
import { QueryList } from '../../decotators/query-list.decorators';
import { PageQuery, PageData } from '../../interfaces/request.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Query,
  Req,
  Delete,
  Param,
  Put,
  All,
  Render,
} from '@nestjs/common';
import { ErrorModel } from './error.model';
import { ErrorService } from './error.service';
import { HttpProcessor } from '@/decotators/http.decotator';
import { JwtAuthGuard } from '@/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import { QueryErrorListDto, UpdateErrorDto } from './error.dto';
import { Auth } from '@/decotators/user.decorators';
import { UserModel } from '@/modules/user/user.model';
@ApiUseTags('错误相关')
@Controller('error')
// @UseGuards(JwtAuthGuard)
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @ApiOperation({ title: '获取错误信息', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ErrorModel })
  @HttpProcessor.handle('获取错误信息')
  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getErrorInfo(@Query('errorId') errorId: string): Promise<ErrorModel> {
    return this.errorService.getErrorById(errorId);
  }

  @ApiOperation({ title: '获取错误信息byAlarm', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ErrorModel })
  @HttpProcessor.handle('获取错误信息byAlarm')
  @Get('/all-info')
  @Render('errorInfo')
  async getAllErrorInfo(@Query('errorId') errorId: string): Promise<any> {
    const data = await this.errorService.getErrorAllInfo(errorId);
    return { test: 'sdfsdfsdfs' };
  }

  @ApiOperation({ title: '获取错误列表', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取错误列表')
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getErrors(
    @QueryList(
      new ParsePageQueryIntPipe([
        'projectId',
        'endDate',
        'startDate',
        'level',
        'status',
        'guarder',
      ]),
    )
    query: QueryListQuery<QueryErrorListDto>,
  ): Promise<PageData<ErrorModel>> {
    return this.errorService.getErrors(query);
  }

  @ApiOperation({ title: '修改错误', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Error })
  @HttpProcessor.handle('修改错误')
  @Put('/')
  @UseGuards(JwtAuthGuard)
  updateError(@Body() body: UpdateErrorDto): Promise<void> {
    return this.errorService.updateError(body);
  }


}
