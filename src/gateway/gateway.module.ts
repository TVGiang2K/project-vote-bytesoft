import { Module } from "@nestjs/common";
import {VotetingGetway } from './vote.gateway';
@Module({
    providers: [VotetingGetway],
})
export class GatewayModule {}