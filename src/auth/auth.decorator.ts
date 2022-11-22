import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminService } from 'src/module/admin/admin.service';
import { jwtAuthGuard } from './jwt-auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(jwtAuthGuard),
    
  );
}