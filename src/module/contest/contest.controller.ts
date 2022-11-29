import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe, Request, Response } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}
  
  @Auth(Role.ADMIN)
  @Post()
  @HttpCode(200) 
  @UsePipes(ValidationPipe)
  create(@Body() createContestDto: CreateContestDto) {
    return this.contestService.create(createContestDto);
  }

  // @Auth(Role.ADMIN)
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
  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Request() req) {
    console.log(req.body)
    return this.contestService.update(+id, req.body);
  }

  // @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}
