import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { VotetingGetway } from '../../gateway/vote.gateway';

@Controller('vote')
export class VoteController {
  constructor(
    private readonly voteService: VoteService,
    ) {}

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

}
