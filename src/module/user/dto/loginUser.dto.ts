import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class loginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @Length(5,100)
    password:string;


}