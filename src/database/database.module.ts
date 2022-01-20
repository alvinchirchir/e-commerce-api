import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      //host:process.env.POSTGRES_HOST,
      //port:parseInt(<string>process.env.POSTGRES_PORT),
      //username:process.env.POSTGRES_USER,
      //password:process.env.POSTGRES_PASSWORD,
      //database:process.env.POSTGRES_DATABASE,
      //url:"postgres://postgres:postgresql@localhost:5432/SahariEcommerce",
      url:process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    
    }),
  ],
})
export class DatabaseModule {}
