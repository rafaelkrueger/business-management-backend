import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { Payment } from './entities/payment.entity';

@Module({
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService],
  exports: [TypeOrmModule]
})
export class PaymentModule {}
