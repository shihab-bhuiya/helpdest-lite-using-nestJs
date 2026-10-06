import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError, retry, Subject } from 'rxjs';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Injectable()
export class TicketsService {
  private nextTickedId = 4;

  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Payment failed',
      description: 'You cannot payment at this moments',
      priority: 'high',
      status: 'open',
      createdAt: '1016-09-01T10:00:00:000Z',
    },
    {
      id: 2,
      subject: 'History failed',
      description: 'Card payment failed at the checkout point',
      priority: 'medium',
      status: 'open',
      createdAt: '2016-04-01T02:00:00:000Z',
    },
    {
      id: 3,
      subject: 'Invoice download is not working',
      description: 'Invoice download pdf returns a  empty file',
      priority: 'low',
      status: 'close',
      createdAt: '1016-09-01T12:20:00:000Z',
    },
  ];

  findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
    let tickets = this.tickets;
    if (status) {
      tickets = tickets.filter((ticket) => status === ticket.status);
    }

    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority == priority);
    }

    return tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  create(createTicketDto:CreateTicketDto) {
    const ticket: Ticket = {
      id: this.nextTickedId++,
      subject: createTicketDto.subject,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(ticket);
  }

  update(id:number, updateTicketDto:UpdateTicketDto){
    const ticket = this.findOne(id);

    if(ticket.status === "close"){
      throw new BadRequestException("Closed ticket cannot be updated")
    }

    Object.assign(ticket, updateTicketDto);
    
  }

  closeTicket(id:number){
    const ticket = this.findOne(id);

    if(ticket.status === 'close'){
      throw new BadRequestException("Ticket is already close")
    }

    ticket.status = 'close'
  
    return ticket;
  }

}
