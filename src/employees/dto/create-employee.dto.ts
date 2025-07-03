import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../employees.entity';



export class EmployeeCreateDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('IN')
    phone: string;

    @IsEnum(Role, {
        message: 'Role must be one of the following: Intern, Employee, Manager'
    })
    @IsNotEmpty()
    role: Role;
}



