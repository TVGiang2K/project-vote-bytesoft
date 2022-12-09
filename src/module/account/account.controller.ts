import { Body, Controller, Get, Patch, Post, Delete, UsePipes, Param, ValidationPipe, Res, Req} from '@nestjs/common';
import { Request, Response } from 'express';
import { exit } from 'process';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RechargeHistoryService } from '../recharge_history/recharge_history.service';
import { AccountService } from './account.service';
import { updateAccountDto } from './dto/updateAccount.dto';
import { User } from './user.decorator';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private RechargeHistoryService: RechargeHistoryService,
  ) {}

  @Auth(Role.ADMIN)
  @Get()
  async showAll(@Res() res: Response,@User() user: any,@Req() req: Request,take: number = 3) {
    const acctionPage = req.url.slice(9)
    if(req.url == '/account'){
      const skip = 0;
      const accounts = await this.accountService.showAll(take,skip)
      res.render('account',{
        MyUser: user,
        accounts: accounts.data,
        paginate: accounts.total,
        qttPage: accounts.page,
      })
    }else{
      const acction = take * parseInt(acctionPage) - take
      const accounts = await this.accountService.showAll(take,acction)
      res.render('account',{
        MyUser: user,
        accounts: accounts.data,
        paginate: accounts.total,
        qttPage: accounts.page,
      })
    }
  }

  // lịch sử vote
  @Auth(Role.USER)
  @Get('historyVoting')
  historyVoting(@User() getUser){
    return this.accountService.MyhistoryVote(getUser.id)
  }

  // admin xem lịch sử vote của người dùng
  @Auth(Role.ADMIN)
  @Get('vote-history/:id')
  async admin_historyVoting_user(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const history = await this.accountService.MyhistoryVote(id)
    console.log(history[0].quantityVoted)
    res.render('history/history-vote',{
      MyUser: user,
      history,
    });
  }

  @Auth(Role.ADMIN)
  @Get('/:id')
  show(@Param('id') id: string) {
    return this.accountService.showById(+id);
  }

  @Auth(Role.ADMIN)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: updateAccountDto) {
    return this.accountService.update(+id, updateUserDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountService.remove(id);
  }

  // admin xác nhận nạp tiền cho users
  @Auth(Role.ADMIN)
  @Patch('recharge/:id/:status')
  async updateStatusRecharge(
    @Param('id') id: number,
    @Param('status') status = 'success',
  ) {
    const money = await this.RechargeHistoryService.findOne(id);
    // console.log(money.accountId)
    const moneyOld = await this.accountService.showById(money.Account.id);
    console.log(moneyOld);
    return this.accountService.updateMoney(
      id,
      money.Account.id,
      money.wait_money,
      moneyOld.money,
    );
  }

  // user gửi request nạp tiền cho admin
  @Auth(Role.USER)
  @Get('recharge/:money')
  recharge(@Param('money') req, @User() user) {
    // console.log(user)
    return this.RechargeHistoryService.User_recharge(req, user);
  }

  // User hủy request nạp tiền
  @Auth(Role.USER)
  @Delete('cancel/:id')
  cancel_recharge(@Param('id') req) {
    return this.RechargeHistoryService.cancel_recharge(req);
  }
  
  //  user vote cho thí sinh yêu thích
  @Auth(Role.USER)
  @Get('vote/:idCandidate/:quantityVote')
  vote(
    @Param('quantityVote') quantityVote: number,
    @Param('idCandidate') idCandidate: number,
    @User() getUser,
  ) {
    return this.accountService.vote(quantityVote,idCandidate,getUser)
  }

}
