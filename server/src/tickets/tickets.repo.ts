import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schemas';
import { Model } from 'mongoose';

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
}
