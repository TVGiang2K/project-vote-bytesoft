import { Injectable, Logger } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Contest } from '../contest/entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
// import { async } from 'rxjs';

@Injectable()  // map các bảng trong csdl
export class ContestService {
  constructor(
    @InjectRepository(Contest) // tự động cập nhật khi có thay đổi về dữ liệu
    private contestsRepository: Repository<Contest>,
    private schedulerRegistry: SchedulerRegistry
    ) {}
    private readonly logger = new Logger(ContestService.name)

   async create(createContestDto: CreateContestDto): Promise<Contest> {
    const job = new CronJob(new Date(createContestDto.start_date), () => {
      this.logger.warn(`time (${new Date(createContestDto.start_date)}) for job ${createContestDto.name} to run!`);
    });  

    await this.schedulerRegistry.addCronJob(createContestDto.name, job);
    await job.start();
  
    await this.logger.warn(
      `job ${createContestDto.name} added for each minute at ${new Date(createContestDto.start_date)} seconds!`,
    );


    const job1 = new CronJob(new Date(createContestDto.last_date), () => {
       this.logger.warn(`time (${new Date(createContestDto.last_date)}) for job ${createContestDto.name} to stop!`)
       job1.stop();
    });
    // await this.schedulerRegistry.addCronJob(createContestDto.name, job1);
    await job1.start();
    await this.logger.warn(
      `job ${createContestDto.name} stoped for each minute at ${new Date(createContestDto.last_date)} seconds!`,
     
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
      console.log(createContestDto)
    return this.contestsRepository.save(createContestDto);
  }
 
  findAll(): Promise<Contest[]> {
    return this.contestsRepository.find();
  }

  findOne(id: number) : Promise<Contest> {
    return this.contestsRepository.findOneBy({id});
  }

  update(id: number, updateContestDto: UpdateContestDto): Promise<UpdateResult> {
    return this.contestsRepository.update(id, updateContestDto);
  }


  remove(id: number): Promise<DeleteResult>{
    return this.contestsRepository.delete(id);
  }
}
function setTime(): number {
  throw new Error('Function not implemented.');
}

