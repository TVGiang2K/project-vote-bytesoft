import { TypeOrmModuleOptions } from '@nestjs/typeorm';
    
export const typeormConfig: TypeOrmModuleOptions = {
    // kết nối cơ sở dữ liệu
    type: 'mysql',
    host: 'sql.freedb.tech',
    port: 3306,
    username: 'freedb_locdubai',
    password: 'D?pmfXxb3Ey#J?V',
    database: 'freedb_vote-project-app',   
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // đồng bộ với database
    cache: {
        type: "redis", 
        options: {
            host: "redis://red-cehvrpkgqg4e0efdgul0:6379",
        }
    }
};
