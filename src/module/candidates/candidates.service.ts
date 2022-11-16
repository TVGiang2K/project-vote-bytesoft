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
    private candidateRepository: Repository<Candidate>
  ) {
  }
  create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    return this.candidateRepository.save(createCandidateDto);
  }

  findAll() : Promise<Candidate[]> {
    return this.candidateRepository.find();
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
}
