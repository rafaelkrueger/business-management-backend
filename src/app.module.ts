import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { Enterprise } from './enterprise/entities/enterprise.entity';
import { UserEnterprise } from './enterprise/entities/user-enterprise.entity';
import { Customer } from './customer/entities/customer.entity';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { Calendar } from './calendar/entities/calendar.entity';
import { CalendarModule } from './calendar/calendar.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/entities/wallet.entity';
import { WalletTransaction } from './wallet/entities/wallet-transaction.entity';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Enterprise,
        UserEnterprise,
        Customer,
        Employee,
        Calendar,
        Product,
        Wallet,
        WalletTransaction,
        Payment
      ],
      synchronize: true,
    }),
    EnterpriseModule,
    CustomerModule,
    EmployeeModule,
    CalendarModule,
    ProductModule,
    WalletModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
