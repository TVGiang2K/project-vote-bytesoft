import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query, Render, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { log } from 'console';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { exit } from 'process';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';
import { ContestService } from '../contest/contest.service';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly contestService: ContestService,

  ) {}

  @Auth(Role.ADMIN)
  @Get('create')
  async createeCandidates(@Res() res: Response,@User() user: any, @Req() req: Request) {
    const contest = await this.contestService.findAll()
    res.render('candidates/create',{
      MyUser: user,
      contest: contest
    })
  }
   
  @Auth(Role.ADMIN)
  @Post('create-candidates')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/public/img/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addCandidates(@Res() res: Response,@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    req.body.avatar = file.filename;
    const candidate = await this.candidatesService.create(req.body)
    if(!candidate){
      res.redirect('/error')
    } else {
      res.redirect('/candidates')
    }
  }

  @Get('delete/:id')
  delete(@Param('id') id: string,@Res() res: Response,@User() user: any,) {
    const candidate = this.candidatesService.remove(+id);
    if(!candidate){
      res.redirect('/error')
    } else {
      res.redirect('/candidates')
    }
  }

  @Auth(Role.ADMIN)
  @Get('edit/:id')
  async editCandidates(@Param('id') id: number,@Res() res: Response,@User() user: any) {
    const contest = await this.contestService.findAll()
    const candidates = await this.candidatesService.findOne(id);
    res.render('candidates/update',{
      MyUser: user,
      candidates: candidates,
      contest: contest
    })
  }

  @Auth(Role.ADMIN)
  @Post('edit/update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/public/img/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async udCandidates(@Param('id') id: number,@Res() res: Response,@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    if(file != null) {
      req.body.avatar = file.filename;
    }
    const candidate = await this.candidatesService.update(id, req.body);
    res.redirect('/candidates')

  }

  @Auth(Role.ADMIN)
  @Get('list')
  async show(@Res() res: Response ,@User() user: any) {
    const candidate = await this.candidatesService.showCadi()
    res.render('candidates/candidates',{
      MyUser: user,
      candidates: candidate
    });
  }
  
  @Auth(Role.ADMIN)
  @Get('vote-history-cadidetes/:id')
  async admin_historyVoting_candidates(@Param('id') id:number,@Res() res: Response,@User() user: any){
    const names = await this.candidatesService.findOne(id);
    const history = await this.candidatesService.historyVote(id)
    res.render('history/history-vote-candidates',{
      MyUser: user,
      history,
      names,
    });
  }




  

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }



  @Get('paged')
  findAll(@Query() {take,skip}){
    return this.candidatesService.showAll(take,skip)
  }

  // @Get('total')
  // Total(@Query() {skip}){
  //   return this.candidatesService.totalCandidates(skip);
  // }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidatesService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }

  @Patch('voted/:id')
  update_Vote(@Param('id') id: number){
  //  return this.candidatesService.voting(id)
  }


 


  
  
  
  



} 
