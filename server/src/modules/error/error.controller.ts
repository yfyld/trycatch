import { QueryListResult } from '@/interfaces/request.interface';
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
} from '@nestjs/common';
import { ErrorType } from './error.model';
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
import { ErrorTypeListItemDto } from './error.dto';
import { Auth } from '@/decotators/user.decorators';
import { User } from '@/modules/user/user.model';
@ApiUseTags('错误相关')
@Controller('error')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @ApiOperation({ title: '获取错误信息', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ErrorType })
  @HttpProcessor.handle('获取错误信息')
  @Get('/:errorId')
  @UseGuards(JwtAuthGuard)
  getErrorTypeInfo(@Param('errorId') errorId: string): Promise<ErrorType> {
    return this.errorService.getErrorTypeById(errorId);
  }

  @ApiOperation({ title: '获取错误列表', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取错误列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getErrors(
    @QueryList() query: QueryListResult<ErrorTypeListItemDto>,
  ): Promise<PageData<ErrorType>> {
    return this.errorService.getErrorTypes(query);
  }

  @ApiOperation({ title: '修改错误', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Error })
  @HttpProcessor.handle('修改错误')
  @Put('/:errorId')
  @UseGuards(JwtAuthGuard)
  updateError(
    @Param('errorId') errorId: number,
    @Body() body: any,
  ): Promise<void> {
    return this.errorService.updateError(errorId, body);
  }

  @Get('/test/test')
  test(): Promise<any> {
    return this.errorService.getSourceCode(
      {
        url: 'http://zyyh.91jkys.com/assets/js/vendor.baca39463fd704390477.js',
        line: 1,
        column: 200,
      },
      19,
      null,
    );
  }
}
