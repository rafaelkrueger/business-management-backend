import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('')
  async find(
    @Query('userId') userId: string,
    @Query('companyId') companyId: string,
  ) {
    return await this.calendarService.findEmployeeAndCompanyCalendar(
      userId,
      companyId,
    );
  }

  @Post('')
  async create(@Body() body:any) {
    return await this.calendarService.createCalendarEvent(body);
  }

  @Delete('/:id')
  async delete(@Param() id: any) {
    return await this.calendarService.deleteCalendarEvent(id.id);
  }
}
