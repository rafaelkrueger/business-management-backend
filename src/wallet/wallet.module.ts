import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { WalletTransaction } from './entities/wallet-transaction.entity';

@Module({
  controllers: [WalletController],
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction]),
    EnterpriseModule
  ],
  providers: [WalletService],
  exports: []
})
export class WalletModule {}
