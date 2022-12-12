import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Query, Res, Req } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { Response, Request  } from 'express';
import { CandidatesService } from '../candidates/candidates.service';

@Controller('contest')
export class ContestController {
  constructor(
    private readonly contestService: ContestService,
    private candidatesServices: CandidatesService,

    ) {}
  

  @Auth(Role.ADMIN)
  @Get()
  async show(@Res() res: Response ,@User() user: any,@Query() {take,skip}) {
    const candidate_by_contest = await this.contestService.findAll();
    const contest = await this.contestService.showAll();
    res.render('contest/contest',{
      MyUser: user,
      contest:contest.data,
      candidate_by_contest: candidate_by_contest,
      contest_by_candidate: candidate_by_contest[0].contest.id,
      quantityCandidates: candidate_by_contest.length
      // candidates: candidates,
    });
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
    console.log(req.body)
    return this.contestService.update(+id, req.body);
  }

  // @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}
function _getTimeZoneOffsetInMs() {
  throw new Error('Function not implemented.');
}

