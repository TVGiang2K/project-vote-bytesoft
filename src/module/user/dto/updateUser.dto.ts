import { IsNotEmpty } from "class-validator";

export const updateUserDto = {

    @IsNotEmpty({ message: 'tên không được để trống'})
    
}