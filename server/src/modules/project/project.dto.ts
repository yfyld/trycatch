import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddBody {
    @ApiModelProperty()
    @IsDefined()
    @IsNotEmpty({ message: '项目名称？' })
    name: string;

    
}
