import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { UsersRepository } from './users.repo';
import { InngestModule } from 'src/inngest/inngest.module'; 
import { forwardRef } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [

    forwardRef(() => InngestModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule, 
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
