import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Query, Res, Req } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Response, Request } from 'express';
import { log } from 'console';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}
  

  @Auth(Role.ADMIN)
  @Get('list')
  async show(@Res() res: Response ,@User() user: any) {
    const contest = await this.contestService.findAll();
    res.render('contest/contest',{
      MyUser: user,
      contests: contest
    })
  }

  @Auth(Role.ADMIN)
  @Get('create')
  async createeContest(@Res() res: Response,@User() user: any, @Req() req: Request) {
    res.render('contest/create',{
      MyUser: user,
    })
  }

  @Auth(Role.ADMIN)
  @Post('create-contest')
  async addContest(@Res() res: Response,@Req() req: Request,) {
    const contest = await this.contestService.create(req.body);
    if(!contest){
      res.redirect('/error')
    } else {
      res.redirect('/contest/list')
    }
  }

  @Get('delete/:id')
  delete(@Param('id') id: string,@Res() res: Response,@User() user: any) {
    const contest = this.contestService.remove(+id);
    if(!contest){
      res.redirect('/error')
    } else {
      res.redirect('/contest/list')
    }
  }

  @Auth(Role.ADMIN)
  @Get('edit/:id')
  async editCandidates(@Param('id') id: number,@Res() res: Response,@User() user: any) {
    const contest = await this.contestService.findOne(id);
    console.log();
        
    res.render('contest/update',{
      MyUser: user,
      contest: contest
    })
  }

  @Auth(Role.ADMIN)
  @Post('edit/update/:id')
  async updContest(@Param('id') id: number,@Res() res: Response,@Req() req: Request,) {
    const contest = await this.contestService.update(id, req.body);
    if(!contest){
      res.redirect('/error')
    } else {
      res.redirect('/contest/list')
    }
  }


  // @Get('contest')
  // @Render('contest/contest')
  // contest() {
  //   return { message: this.appService.root() }; 
  // }
  // @Get('create-contest')
  // @Render('contest/create')
  // contestCreate() {
  //   return { message: this.appService.root() }; 
  // }
  // @Get('edit-contest')
  // @Render('contest/update')
  // contestUpdate() {
  //   return { message: this.appService.root() }; 
  // }



























  // API 
  @Get('total')
  total(@Query() {skip}) {
    return this.contestService.showAll(skip);
  }

  @Auth(Role.ADMIN)
  @Post()
  @HttpCode(200) 
  @UsePipes(ValidationPipe)
  create(@Body() createContestDto: CreateContestDto) {
    return this.contestService.create(createContestDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.contestService.findAll();
  }
  
  // @Auth(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(+id);
  }

  // @Auth(Role.ADMIN, Role.USER)
  // @Patch(':id')
  // @UsePipes(ValidationPipe)
  // update(@Param('id') id: string, @Request() req) {
  //   console.log(req.body)
  //   return this.contestService.update(+id, req.body);
  // }

  // @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}
function _getTimeZoneOffsetInMs() {
  throw new Error('Function not implemented.');
}

