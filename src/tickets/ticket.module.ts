import { Module } from '@nestjs/common';
import { TicketsController } from './ticket.controller.js';
import { TicketsService } from './ticket.service.js';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule { }
