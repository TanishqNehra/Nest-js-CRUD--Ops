import {EmployeeCreateDto} from './create-employee.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeDto extends PartialType(EmployeeCreateDto) {
    
}