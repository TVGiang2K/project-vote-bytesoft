import { PartialType } from '@nestjs/mapped-types';
import { CreateContestDto } from './create-contest.dto';
import { Length, IsEmail ,IsNotEmpty } from "class-validator";
import { Entity } from 'typeorm';


export class UpdateContestDto extends PartialType(CreateContestDto) {
    @IsNotEmpty({ message: 'Tên không được để trống' })
    @Length(2,255)
    name: string;

    @IsNotEmpty({ message: "Hãy chọn ngày bắt đầu" })
    start_date:Date;

    @IsNotEmpty({ message: "hãy chọn ngày kết thúc" })
    last_date:Date;

}
