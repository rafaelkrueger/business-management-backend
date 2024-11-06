import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { WalletTransaction } from '../entities/wallet-transaction.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import * as Big from 'big.js';
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransaction)
    private readonly walletTransactionRepository: Repository<WalletTransaction>,
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  async findWalletsByUser(userId: string) {
    const wallets: any = await this.walletRepository.find({
      where: { userId: userId },
    });
    for (const wallet of wallets) {
      const historic = await this.walletTransactionRepository.find({
        where: { walletId: wallet.id },
      });
      const company = await this.enterpriseRepository.findOne({
        where: { id: wallet.companyId },
        select: ['logo'],
      });
      wallet.logo = company.logo;
      wallet.historic = historic;
    }
    return wallets;
  }

  async addWalletByUser(body: any) {
    const wallet = new Wallet();
    wallet.name = body.name;
    wallet.userId = body.userId;
    wallet.companyId = body.companyId;
    wallet.personalKey = body.personalKey;
    wallet.cardKey = body.cardKey;
    await this.walletRepository.save(wallet);
  }

  async addBalance(body) {
    const wallet = await this.walletRepository.findOne({
      where: { id: body.walletId },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const updatedBalance = Big(wallet.balance).plus(Big(body.amount));
    wallet.balance = parseFloat(updatedBalance.toFixed(8));
    await this.walletRepository.save(wallet);

    let historicAmount = Big(body.amount);
    historicAmount = parseFloat(historicAmount.toFixed(8));

    const transaction = new WalletTransaction();
    transaction.walletId = wallet.id;
    transaction.amount = historicAmount;
    transaction.description = `Valor adicionado a carteira ${wallet.name}`;
    transaction.transactionDate = new Date();
    await this.walletTransactionRepository.save(transaction);

    return { wallet, transaction };
  }
}
