import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, Query, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';
import { ContestService } from '../contest/contest.service';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly contestService: ContestService,

  ) {}

  // thêm data thí sinh
  @Auth(Role.ADMIN)
  @Get('create')
  async createeCandidates(@Res() res: Response,@User() user: any, @Req() req: Request) {
    const contest = await this.contestService.findAll_create_c()
    res.render('candidates/create',{
      MyUser: user,
      contest: contest
    })
  }

  // upload ảnh của thí sinh
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
      res.redirect('/candidates/list')
    }
  }

  // delete thí sinh
  @Get('delete/:id')
  delete(@Param('id') id: string,@Res() res: Response,@User() user: any,) {
    try {
      const candidate = this.candidatesService.remove(+id);
      res.redirect('/candidates/list')
    } catch (error) {
      res.render('/error',{
        message: error.message
      })
    }
  }

  // tìm kiếm thí sinh theo id
  @Auth(Role.ADMIN)
  @Get('edit/:id')
  async editCandidates(@Param('id') id: number,@Res() res: Response,@User() user: any) {
    const contest = await this.contestService.findAll_create_c()
    const candidates = await this.candidatesService.findOne(id);
    res.render('candidates/update',{
      MyUser: user,
      candidates: candidates,
      contest: contest
    })
  }

  // sửa thí sinh theo id
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
    res.redirect('/candidates/list')

  }

  // show danh sách
  @Auth(Role.ADMIN)
  @Get('list')
  async show(@Res() res: Response ,@User() user: any) {
    const candidate = await this.candidatesService.showCadi()
    res.render('candidates/candidates',{
      MyUser: user,
      candidates: candidate,
      total: candidate.length
    });
  }

  // lịch sử vote của thí sinh theo id
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

  // thêm mới thí sinh
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  // pân trang
  @Get('paged')
  findAll(@Query() {take,skip}){
    return this.candidatesService.showAll(take,skip)
  }

  // api danh sách thí sinh tham dự
  @Get('api/list')
  async Apitshow(@Res() res: Response ,@User() user: any) {
    const candidate = await this.candidatesService.showCadi()
    res.send({
      candidates: candidate
    });
  }
  
  // api chi tiết thí sinh
  @Get('api/:id')
  async findOne(@Param('id') id: number ,@Res() res: Response) {
    const candidate_by_id = await this.candidatesService.showApiById(id);
    res.send({
      candidate_by_id,
    });
  }

  // @Patch(':id')
  // @UsePipes(ValidationPipe)
  // update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
  //   return this.candidatesService.update(+id, updateCandidateDto);
  // }

  // xóa thí sinh
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }

  // @Patch('voted/:id')
  // update_Vote(@Param('id') id: number){
  //  return this.candidatesService.voting(id)
  // }


 




} 
