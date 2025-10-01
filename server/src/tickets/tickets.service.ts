import { User } from './../users/schemas/user.schemas';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsRepo } from './tickets.repo';
import { Task_Status, UserType } from 'src/utils/types';
import { Types } from 'mongoose';
import { InngestService } from 'src/inngest/inngest.service';
import { U } from 'node_modules/@inngest/agent-kit/dist/agent-Prh3eG94';
import { Ticket } from './schemas/ticket.schemas';

@Injectable()
export class TicketsService {
  constructor(
    @Inject(InngestService)
    private readonly ticketsRepo: TicketsRepo,
    private readonly inngestService: InngestService,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto, userId: Types.ObjectId) {
    const { title, description } = createTicketDto;
    const ticket = await this.ticketsRepo.create({ title, description, status: Task_Status.ANALYZING, createdBy: userId });
    if(!ticket._id){
      throw new Error('Ticket creation failed');
    }
    await this.inngestService.sendTicketCreatedEvent(ticket._id.toString());


    return {
      message: 'Ticket created successfully',
      data:{
        ticket
      },
      success: true
    }
  }
  
  async getTickets(userId: Types.ObjectId, role: UserType) {
    let tickets: Ticket[] = [];
    if(role === UserType.USER){
      tickets = await this.ticketsRepo.findByUserId(userId);
    }else{
      tickets = await this.ticketsRepo.findAll();
    }
    
    return {
      message: 'Tickets fetched successfully',
      data:{
        tickets
      },
      success: true
    }
  }

  async getTicketById(ticketId: string, role: UserType, userId: Types.ObjectId) {
    let ticket: Ticket | null = null;
    if(role === UserType.USER){
      ticket = await this.ticketsRepo.findByIdAndUserId(ticketId, userId);
    }else{
      ticket = await this.ticketsRepo.findById(ticketId);
    }

    if(!ticket){
      throw new Error('Ticket not found');
    }

    return {
      message: 'Ticket fetched successfully',
      data:{
        ticket
      },
      success: true
    }
  }






  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
