import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from './admin.entity';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Admin => {
    const request = ctx.switchToHttp().getRequest();
    delete request.user.password;
    console.log(request.user)
    return request.user;
});
