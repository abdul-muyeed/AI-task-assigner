import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty} from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    // @MinLength(8, { message: 'Password must be at least 8 characters long' })
    // @MaxLength(50, { message: 'Password must not exceed 50 characters' })
    password: string;
}