import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TicketsService } from './ticket.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { FilterTicketsQueryDto } from './dto/filter-tickets-query.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(
    @Query() filter: FilterTicketsQueryDto
  ) {
    return this.ticketsService.findAll(filter.status, filter.priority);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() CreateTicketDto:CreateTicketDto){
    return this.ticketsService.create(CreateTicketDto);
    
  }

  @Patch(":id")
    update(
      @Param('id',ParseIntPipe) id:number,
      @Body() updateTicketDto: UpdateTicketDto
    ){
      return this.ticketsService.update(id,updateTicketDto)
    }
}
