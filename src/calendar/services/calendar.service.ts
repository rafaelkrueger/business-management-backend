import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { validate as validateUUID, parse as parseUUID } from 'uuid';
import { Calendar } from '../entities/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  async findEmployeeAndCompanyCalendar(userId: string, companyId: string) {
    const calendar = await this.calendarRepository.find({
      where: { ownerId: userId, companyId: companyId },
    });

    for (const event of calendar) {
      const participantsIds = Array.isArray(event.participantsId)
        ? event.participantsId
        : [];
      const validParticipantsIds = participantsIds.filter((participantId) =>
        validateUUID(participantId),
      );

      if (validParticipantsIds.length > 0) {
        const placeholders = validParticipantsIds
          .map((_, index) => `$${index + 1}`)
          .join(',');
        const query = `SELECT name, email, phone, job, department FROM employee WHERE id IN (${placeholders})`;

        const employees = await this.calendarRepository.query(
          query,
          validParticipantsIds,
        );
        event.participantsId = employees;
      } else {
        event.participantsId = [];
      }
    }

    return calendar;
  }

  async createCalendarEvent(body: any) {
    const calendar = new Calendar();
    calendar.name = body.name;
    calendar.description = body.description;
    calendar.date = body.startTime;
    calendar.ownerId = body.ownerId;
    calendar.companyId = body.companyId;
    calendar.participantsId = body.participantsId;
    calendar.isPublic = body.isPublic;
    await this.calendarRepository.save(calendar);
  }

  async deleteCalendarEvent(id: string) {
    const calendar = await this.calendarRepository.find({
      where: { id: id },
    });
    await this.calendarRepository.remove(calendar);
  }
}
