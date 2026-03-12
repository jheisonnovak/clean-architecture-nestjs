import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskModule } from "./modules/task/task.module";
import { typeOrmConfig } from "./shared/config/database.config.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), TaskModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
