import { Injectable } from '@nestjs/common';
// import { BookModel } from './bookmodel';


@Injectable()
export class AppService {

  // public books : BookModel[] =  [
  //   {name : "giang", age: "18", phone: 121232332},
  //   {name : "loc", age: "10", phone: 12123233332},
  //   {name : "dong", age: "34", phone: 12123332332},
  // ]

  getHello() {
    return 'hello world';
  }

  root(): string {
    return 'Hello World! I love you!';
  }
}

