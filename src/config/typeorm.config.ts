import { TypeOrmModuleOptions } from '@nestjs/typeorm';
    
export const typeormConfig: TypeOrmModuleOptions = {
    // kết nối cơ sở dữ liệu
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    logging: "all",
    database: 'vote-project',   
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // đồng bộ với database
};
