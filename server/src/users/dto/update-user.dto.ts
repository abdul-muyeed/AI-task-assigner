import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
    password: never; // Exclude password from being updated

}
