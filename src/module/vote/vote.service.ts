import { Injectable } from '@nestjs/common';
import {  InjectRepository } from '@nestjs/typeorm';
import {  DataSource, Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {

  constructor(
    @InjectRepository(Vote)
    private VoteRp: Repository<Vote>,
    private dataResource: DataSource,
    ){}

  async findAll(): Promise<Vote[]> {
    return await this.VoteRp.find();
  }
  

  async createHistoryVote(idUser,idCandidate,quantityVote){
    return await this.VoteRp.save({
      candidate: idCandidate,
      acc: idUser,
      quantityVoted:quantityVote,
    });
  }

  async historyVote(idUser){
    const users = await this.dataResource
    .getRepository(Vote)
    .createQueryBuilder("vote")
    .innerJoinAndSelect("vote.acc","acc")
    .innerJoinAndSelect("vote.candidate","candidate")
    // .select(['vote.*','acc.name', 'candidate.name', 'candidate.id'])
    .where("acc.id = :id",{ id: idUser})
    .take(9)
    .getMany();
    return{
      historyVote: users
    }
  }
}
