import { IsNotEmpty, MaxLength, MinLength,  } from "class-validator";

export class CreateCandidateDto {
    @IsNotEmpty({ message: 'Tên không được để trống'})
    name: string;
    @IsNotEmpty({ message: 'Hãy nhập tuổi của bạn'})
    age: number;
    
    @IsNotEmpty({ message: 'Hãy nhập số điện thoại của bạn'})
    @MinLength(10, {
        message: 'số điện thoại không hợp lệ',
      })
      @MaxLength(10, {
        message: 'số điện thoại tối đa 10 số',
      })
    phone: string;
    @IsNotEmpty({ message: 'Hãy chọn ảnh của bạn'})
    avatar: string;
    
    @IsNotEmpty({ message: 'Hãy nhập địa chỉ của bạn'})
    address: string;

    @IsNotEmpty({ message: 'Hãy nhập chọn cuộc thi của bạn'})
    contestId: number;
}
