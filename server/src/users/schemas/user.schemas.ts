import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserType } from 'src/utils/types';

export type UserDoc = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({type: String,  required: true, select:false })
  password: string;

  @Prop({type: String,  default: UserType.USER, enum: Object.values(UserType) })
  role: UserType;
  @Prop({type:[String], default:[]})
  skills: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);