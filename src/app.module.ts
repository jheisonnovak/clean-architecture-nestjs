import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskModule } from "./modules/task/task.module";
import { typeOrmConfig } from "./shared/database/database.config.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot(typeOrmConfig),
		TaskModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
