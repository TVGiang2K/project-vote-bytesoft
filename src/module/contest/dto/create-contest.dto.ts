import{IsNotEmpty, Length} from 'class-validator'
export class CreateContestDto {
    @IsNotEmpty({ message: 'Tên không được để trống'})
    @Length(2,255)
    name: string;
    @IsNotEmpty({ message: 'chọn ngày bắt đầu' })
    start_date: Date
    @IsNotEmpty({ message: 'chọn ngày kết thúc' })
    last_date: Date
}
