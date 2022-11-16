import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class createAdminDto{

    @IsNotEmpty({ message: 'Tên không được để trống' })
    @Length(2,255)
    name: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({message: 'Email không đúng định dạng' })
    @Length(11,255)
    email:string;

    @Length(8,100)
    @IsNotEmpty({ message: 'password không được để trống' })
    password: string

   
}