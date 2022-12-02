import { IsNotEmpty, MaxLength, MinLength,  } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
    
        @IsNotEmpty({ message: 'Tên không được để trống'})
        name: string;

        @IsNotEmpty({ message: 'Hãy nhập tuổi của bạn'})
        age: number;

        @IsNotEmpty({ message: 'Hãy chọn ảnh của bạn'})
        avatar: string;

        @IsNotEmpty({ message: 'Hãy nhập địa chỉ của bạn'})
        address: string;

        @IsNotEmpty({ message: 'Hãy nhập số điện thoại của bạn'})
        @MinLength(10, {
            message: 'số điện thoại chưa đủ',
          })
        @MaxLength(10, {
            message: 'số điện thoại tối đa 10 số',
        })
        phone: string;

        @IsNotEmpty({ message: 'Hãy nhập chọn cuộc thi của bạn'})
        contestId: number;
    }
    