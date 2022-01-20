import { Module } from '@nestjs/common';
import {ProductModule} from '../product/modules/product.module';
import {DatabaseModule} from '../database/database.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),ProductModule,DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
