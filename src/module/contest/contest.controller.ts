import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe } from '@nestjs/common';
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

  @Auth(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.contestService.findAll();
  }
  
  @Auth(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
    return this.contestService.update(+id, updateContestDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}
