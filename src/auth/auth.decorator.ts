import { applyDecorators, UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from './jwt-auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(jwtAuthGuard),
  );
}