import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schemas';
import { Model, Types } from 'mongoose';

@Injectable()
export class TicketsRepo {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async create(data: Ticket): Promise<Ticket> {
    return await this.ticketModel.create(data);
  }

  async findById(id: string): Promise<Ticket | null> {
    return await this.ticketModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Ticket>): Promise<Ticket | null> {
    return await this.ticketModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
  }
  async findByUserId(userId: Types.ObjectId): Promise<Ticket[]> {
    return await this.ticketModel
      .find({ createdBy: userId })
      .populate('createdBy', ['email', '_id'])
      .populate('assignedTo', ['email', '_id'])
      .sort({ createdAt: -1 })
      .exec();
  }
  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel
      .find()
      .populate('createdBy', ['email', '_id'])
      .populate('assignedTo', ['email', '_id'])
      .sort({ createdAt: -1 })
      .exec();
  }
  async findByIdAndUserId(ticketId: string, userId: Types.ObjectId): Promise<Ticket | null> {
    return await this.ticketModel
      .findOne({ _id: ticketId, createdBy: userId })
      .populate('createdBy', ['email', '_id'])
      .populate('assignedTo', ['email', '_id'])
      .exec();
  }
}
