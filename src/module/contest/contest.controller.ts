import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Query, Res, Req } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { Response, Request  } from 'express';
import { CandidatesService } from '../candidates/candidates.service';
import { exit } from 'process';
import { log } from 'console';

@Controller('contest')
export class ContestController {
  constructor(
    private readonly contestService: ContestService,
    private candidatesServices: CandidatesService,

    ) {}
  
  @Auth(Role.ADMIN)
  @Get('list')
  async show(@Res() res: Response ,@User() user: any,@Query() {take,skip}) {
    const candidate_by_contest = await this.contestService.findAll();
    const contest = await this.contestService.showAll();
    console.log(contest);
    
    res.render('contest/contest',{
      MyUser: user,
      contests :contest.data,
      candidate_by_contest: candidate_by_contest,
      quantityCandidates: candidate_by_contest.length,
      total: contest.total
    });
  }

  @Get('api/list')
  async Apishow(@Res() res: Response ,@User() user: any,@Query() {take,skip}) {
    const candidate_by_contest = await this.contestService.findAll();
    const contest = await this.contestService.showAll();
    res.send({
      contests :contest.data,
      candidate_by_contest: candidate_by_contest,
      quantityCandidates: candidate_by_contest.length
    });
  }

  @Get('api/:contest_id')
  async showId(@Param('contest_id') contest_id: number){
    return await this.contestService.findOne(contest_id)
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

  @Auth(Role.ADMIN)
  @Get('vote-history-contest/:id')
  async admin_historyVoting_contest(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const data = await this.contestService.historyContestVote(id);
    res.render('history/history-vote-contest',{
      MyUser: user,
      data: data,
    });
  }

  @Auth(Role.USER)
  @Get('api/vote-history-contest/:id')
  async api_admin_historyVoting_contest(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const data = await this.contestService.historyContestVote(id);
    return res.send({
      data: data,
    })
  }

  @Auth(Role.ADMIN)
  @Get('list-contest-candidates/:id')
  async admin_list_candidates(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const names = await this.contestService.findOne(id);
    const candidate_by_contest = await this.contestService.find_list_candidates(id);
    
    res.render('contest/list-candidates',{
      MyUser: user,
      names,
      candidate_by_contest,
    });
  }

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

  // @Auth(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Req() req) {
    return this.contestService.update(+id, req.body);
  }

  // @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}

