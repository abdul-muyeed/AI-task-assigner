import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(any: Partial<User>): Promise<User> {
    return await this.userModel.create(any);
  }
  async findOnebyEmail(email: string, withPassword?: boolean): Promise<User | null> {
    return await this.userModel.findOne({ email }, { password: withPassword ? 1 : 0 }).exec();
  }
}
