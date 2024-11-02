import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarController } from './controllers/calendar.controller';
import { Calendar } from './entities/calendar.entity';
import { CalendarService } from './services/calendar.service';

@Module({
  controllers: [CalendarController],
  imports: [TypeOrmModule.forFeature([Calendar])],
  providers: [CalendarService],
  exports: []
})
export class CalendarModule {}
