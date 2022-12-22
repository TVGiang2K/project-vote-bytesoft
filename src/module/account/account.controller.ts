import { Body, Controller, Get, Patch, Post, Delete, UsePipes, Param, ValidationPipe, Res, Req, Render, Redirect, HttpCode, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import { exit } from 'process';
import { Auth } from 'src/auth/auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Role } from 'src/auth/roles/roles.enum';
import { RechargeHistoryService } from '../recharge_history/recharge_history.service';
import { AccountService } from './account.service';
import { updateAccountDto } from './dto/updateAccount.dto';
import { User } from './user.decorator';
import * as bcrypt from 'bcrypt';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private authService: AuthService,
    private RechargeHistoryService: RechargeHistoryService,
  ) {}

  // api login user 
  @HttpCode(200)
  @UseGuards(JwtStrategy)
  @Post('api/loginUser')
  async loginUsers(@Req() req: Request, @Res() res: Response) {
    const cookie = await this.authService.login(req.body);
    const account = await this.accountService.findByLogin(req.body.email,req.body.password);
      res.setHeader('Set-Cookie',await cookie);
      account.password = undefined;
      res.send({account: account,cookie:cookie});
  }


  // api lịch sử của account
  @Auth(Role.USER)
  @Get('recharge-history')
  async historyRechargeOfUser(@User() user){
    const data = await this.RechargeHistoryService.findByUser(user.id);    
    return {
      data: data,
    }
  }

//phân trang admin
  @Auth(Role.ADMIN)
  @Get()
  async showAll(@Res() res: Response,@User() user: any,@Req() req: Request,take: number = 7) {
    const acctionPage = req.url.slice(9)
    if(req.url == '/account'){
      const skip = 0;
      const accounts = await this.accountService.showAllPaginate(take,skip)
      res.render('account',{
        MyUser: user,
        accounts: accounts.data,
        paginate: accounts.total,
        qttPage: accounts.page,
      });
    }else{
      const acction = take * parseInt(acctionPage) - take
      const accounts = await this.accountService.showAllPaginate(take,acction)
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
  @Get('vote-history-account/:id')
  async admin_historyVoting_user(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const history = await this.accountService.MyhistoryVote(id)
    res.render('history/history-vote-user',{
      MyUser: user,
      history,
    });
  }

  // lấy dữ liệu tài khoản admin
  @Auth(Role.ADMIN)
  @Get('/:id')
  show(@Param('id') id: string) {
    return this.accountService.showById(+id);
  }
   
  // cập nhật tài khoản admin
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
  @Get('recharge/:id/:status')
  async updateStatusRecharge(
    @Param('id') id: number,
    @Param('status') status = 'success',
    @Res() res:Response
  ) {
    const money = await this.RechargeHistoryService.findOne(id);
    // console.log(money.accountId)
    const moneyOld = await this.accountService.showById(money.Account.id);
    this.accountService.updateMoney(
      id,
      money.Account.id,
      money.wait_money,
      moneyOld.money,
    );
    return res.redirect('/recharge-history')
  }


  // user gửi request nạp tiền cho admin
  @Auth(Role.USER)
  @Post('recharge')
  recharge(@Body() body, @User() user) {
    this.RechargeHistoryService.User_recharge(body.money, user);
    return {
      message: "Đợi xử lý"
    }
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
  async vote(
    @Param('quantityVote') quantityVote: number,
    @Param('idCandidate') idCandidate: number,
    @User() getUser,
  ) {
    return await this.accountService.vote(quantityVote,idCandidate,getUser)
  }

   // admin xem lịch sử nạp của user 
  @Auth(Role.ADMIN)
  @Get('recharge-history/:idUser')
  @Render('history/history-recharge')
  async historyRechargeOfAdmin_User(@Param('idUser') idUser:number,@User() user){
    const data = await this.RechargeHistoryService.findByUser(idUser);
    return {
      data: data,
      MyUser: user
    }
  }

    // api thay đổi mật khẩu của user
  @Auth(Role.USER)
  @Post('api/change-password')
  async changePassword(@Req() req: Request, @User() user:any){
    const currentPass = req.body.currentPass
    const newPass = req.body.newPass
    const confirmPass = req.body.confirmPass
    const compare_pass = await bcrypt.compare(currentPass, user.password);
    
    if(compare_pass){
      if(newPass == confirmPass){
        this.accountService.edit_pass(user.id,newPass)
        return {
          action: true,
          message: 'password changed'
        }
      }
      else{
        return {
          action: false,
          message: 'ko khop mt mowis'
        }
      }
    }else{
      return {
          action: false,
        message: 'maatj khaaur nhaapj dda sai'
      }
    }
  }

  // api lịch sử vote của User
    @Auth(Role.USER)
    @Get('api/historyVoting')
    Api_historyVoting(@User() getUser){
      return this.accountService.MyhistoryVote(getUser.id)
    }


    
}
