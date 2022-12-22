import { Injectable, Logger } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Contest } from '../contest/entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CandidatesService } from '../candidates/candidates.service';
import { Candidate } from '../candidates/entities/candidate.entity';
import { VoteService } from '../vote/vote.service';
// import { async } from 'rxjs';

@Injectable()  // map các bảng trong csdl
export class ContestService {
  constructor(
    @InjectRepository(Contest) // tự động cập nhật khi có thay đổi về dữ liệu
    private contestsRepository: Repository<Contest>,
    private schedulerRegistry: SchedulerRegistry,
    private candidatesServices: CandidatesService,
    private voteService : VoteService,
    private dataResource: DataSource,
    ) {}
    private readonly logger = new Logger(ContestService.name);

    
    async create(createContestDto: CreateContestDto) {
    const job = new CronJob(new Date(createContestDto.start_date), () => {
      this.logger.warn(`time (${new Date(createContestDto.start_date)}) for job ${createContestDto.name} to run!`);      
    });  

    await this.schedulerRegistry.addCronJob(createContestDto.name, job);
    await job.start();

    await this.logger.warn(
      `job ${createContestDto.name} added system start date ${new Date(createContestDto.start_date)}`,
    );

    const job1 = new CronJob(new Date(createContestDto.last_date), () => {
       this.logger.warn(`last date (${new Date(createContestDto.last_date)}) contest name ${createContestDto.name} to stop!`)
       job1.stop();
    });
    await job1.start();
    await this.logger.warn(
      `job ${createContestDto.name} will stop for each date at ${new Date(createContestDto.last_date)} seconds!`,

    );

    const jobs = this.schedulerRegistry.getCronJobs();
     jobs.forEach((value, key, map) => {
        let next;
        try {
          next = value.nextDates().toJSDate();
        } catch (e) {
          next = 'error: next fire date is in the past!';
        }
        this.logger.log(`job: ${key} -> next: ${next}`);
      });
    return this.contestsRepository.save(createContestDto);
  }
 
  async findAll(){
    const candidate_by_contest = await this.dataResource
    .getRepository(Candidate)
    .createQueryBuilder("candidate")
    .innerJoinAndSelect("candidate.contest","contest")
    .cache(true)
    .take(9)
    .getMany()    
    return candidate_by_contest
  }

  async find_list_candidates(id: number){
    const candidate_by_contest = await this.dataResource
    .getRepository(Candidate)
    .createQueryBuilder("candidate")
    .innerJoinAndSelect("candidate.contest","contest")
    .orderBy('candidate.quantityVote', 'DESC')
    .where("contest.id = :id",{ id: id})
    .cache(true)
    .getMany()    
    return candidate_by_contest
  }

  async findAll_create_c(){
    return await this.contestsRepository.find();
  }

  async showAll(skip:number = 0) {
    const [data, total] = await this.contestsRepository.findAndCount({
      skip
    })
    return {  data: data, total: total  }
  }

  // async totalContest(skip:number = 0){
  //   const [data, total] = await this.contestsRepository.findAndCount({skip});
  //   return total
  // }

  async findOne(id: number) : Promise<Contest> {
    return await this.contestsRepository.findOneBy({id});
  }

  async historyContestVote(id: number){
    const data = await this.voteService.historyVoteByContest(id);
    return data
  }

  update(id: number, updateContestDto: UpdateContestDto): Promise<UpdateResult> {
    return this.contestsRepository.update(id, updateContestDto);
  }


  async remove(id: number): Promise<DeleteResult>{
    return await this.contestsRepository.delete(id);
  }


}
function setTime(): number {
  throw new Error('Function not implemented.');
}

