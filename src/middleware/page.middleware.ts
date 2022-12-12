import { Injectable, NestMiddleware } from "@nestjs/common";


@Injectable()
export class PagerMiddleware implements NestMiddleware{
    use(req: any, res:any, next: () => void){
        req.body.take = +req.body.take || 12;
        req.body.skip = +req.body.skip || 0;
        next();
    }
}
