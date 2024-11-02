import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletService } from '../services/wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/:userId')
  async findUserWallet(@Param('userId') userId: string) {
    return await this.walletService.findWalletsByUser(userId);
  }
}
