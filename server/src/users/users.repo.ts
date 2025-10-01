import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/create-user.dto';
import { UserType } from 'src/utils/types';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: Partial<User>): Promise<User> {
    return await this.userModel.create(data);
  }
  async findOnebyEmail(email: string, withPassword?: boolean): Promise<User | null> {
    return await this.userModel.findOne({ email }, { password: withPassword ? 1 : 0 }).exec();
  }
  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  }
  async findMatchSkill(relatedSkills: string[]): Promise<User | null> {
    let user = await this.userModel
      .findOne({
        role: UserType.MOD,
        skills: {
          $eleMatch: {
            $regex: relatedSkills.join('|'),
            $options: 'i',
          },
        },
      })
      .exec();
    if (!user) {
      user = await this.userModel.findOne({ role: UserType.ADMIN }).exec();
    }

    return user;
  }
}
