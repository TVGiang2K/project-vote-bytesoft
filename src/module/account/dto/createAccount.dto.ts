import { IsEmail, IsNotEmpty, Length,  } from 'class-validator';
export class createAccountDto{

    @IsNotEmpty({ message: 'Name could not be void' })
    @Length(2,255)
    name: string;

    @IsNotEmpty({ message: 'Email cannot be blank' })
    @Length(11,255)
    @IsEmail({message: 'Email invalidate' })
    email:string;

    @Length(8,100)
    @IsNotEmpty({ message: 'Password cannot be blank' })
    password: string
}