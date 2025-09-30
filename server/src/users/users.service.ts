import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Inngest } from 'inngest';
import { InngestService } from 'src/inngest/inngest.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  constructor(
    private readonly inngestService: InngestService,
    private readonly jwtService: JwtService,
    private readonly userRepo: UsersRepository
  ) {}

  async signup(signupDto: SignUpDto) {
    const user: User | null = await this.userRepo.findOnebyEmail(signupDto.email);
    if (user) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const createdUser = await this.userRepo.createUser({
      email: signupDto.email,
      password:hashedPassword,
      skills: signupDto.skills
    })
    this.inngestService.sendUserSignupEvent(createdUser.email);
    const token = this.jwtService.sign({ userId: createdUser._id, email: createdUser.email });
    console.log('Generated JWT token for user:', token);

    return {
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: {
          id: createdUser._id,
          email: createdUser.email,
          skills: createdUser.skills,
        }
      }
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user: User | null = await this.userRepo.findOnebyEmail(email, true);

    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const token = this.jwtService.sign({ userId: user._id, email: user.email });
    console.log('Generated JWT token for user:', token);


  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
}
