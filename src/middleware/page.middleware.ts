import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class PagerMiddleware implements NestMiddleware{
    use(req: any, res:any, next: () => void){
        req.body.take = +req.body.take || 12;
        req.body.skip = +req.body.skip || 0;
        next();
    }
}
@Injectable()
export class LogoutMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: () => void){
        res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`)
        res.redirect('/');
    }
}

