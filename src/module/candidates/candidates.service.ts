import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {
  }
  create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    return this.candidateRepository.save(createCandidateDto);
  }

  async showAll(take: number = 12,skip:number = 0) {
    const [data, total] = await this.candidateRepository.findAndCount({
      take,
      skip,
    })
    console.log(data)
    return {  data: data, total: total  }
  }

  findOne(id: number) : Promise<Candidate> {
    return this.candidateRepository.findOneBy({ id });
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto): Promise<UpdateResult> {
    return this.candidateRepository.update(id, updateCandidateDto);
  }

  remove(id: number) {
    return this.candidateRepository.delete({ id });
  }

  async voting(id:number){
    const candidate = await this.candidateRepository.findOne({where: {id}})
    let raiseVote = candidate.quantityVote ++
    if(raiseVote > 0 && raiseVote == 1){

      return await  this.candidateRepository.save(candidate);
    }else{
        
    }
  }

  async updateVote(quantityVote:any,idCandidate:number){
    const quantityVoteOld = await this.findOne(idCandidate)

    const quantityVoteNew = quantityVoteOld.quantityVote + parseInt(quantityVote)
    return await this.candidateRepository.update(idCandidate,{
      quantityVote: quantityVoteNew
    })
  }
}
