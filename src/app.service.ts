import { Injectable } from '@nestjs/common';
// import { BookModel } from './bookmodel';


@Injectable()
export class AppService {

  getHello() {
    return 'hello world';
  }

  root(): string {
    return 'Hello World! I love you!';
  }
}

