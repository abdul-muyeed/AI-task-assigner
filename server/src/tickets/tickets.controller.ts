import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/utils/types';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}



  @UseGuards(AuthGuard)
  @Roles(UserType.ADMIN, UserType.MOD, UserType.USER)
  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto, @Request() req) {
    const userId = req.user._id;
    return this.ticketsService.createTicket(createTicketDto, userId);
  }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
