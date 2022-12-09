import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('vote')
export class VoteController {
  constructor(
    private readonly voteService: VoteService,
    ) {}

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  @Get('total')
  totalVote(@Query() {skip}) {
    return this.voteService.totalVote(skip);
  }

}
