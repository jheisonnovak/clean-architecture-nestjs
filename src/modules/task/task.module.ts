import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateTaskUseCase } from "./application/use-cases/create/create.use-case";
import { DeleteTaskUseCase } from "./application/use-cases/delete/delete.use-case";
import { FindAllTaskUseCase } from "./application/use-cases/find-all/find-all.use-case";
import { FindByIdTaskUseCase } from "./application/use-cases/find-one/find-one.use-case";
import { UpdateTaskUseCase } from "./application/use-cases/update/update.use-case";
import { TaskTypeOrmEntity } from "./infrastructure/persistence/task.orm.entity";
import { TaskTypeOrmRepository } from "./infrastructure/repositories/task.orm.repository";
import { TaskController } from "./presentation/controllers/task.controller";

@Module({
	imports: [TypeOrmModule.forFeature([TaskTypeOrmEntity])],
	controllers: [TaskController],
	providers: [
		TaskTypeOrmRepository,
		{
			provide: "ITaskRepository",
			useExisting: TaskTypeOrmRepository,
		},
		CreateTaskUseCase,
		FindAllTaskUseCase,
		FindByIdTaskUseCase,
		UpdateTaskUseCase,
		DeleteTaskUseCase,
	],
	exports: ["ITaskRepository", CreateTaskUseCase, FindAllTaskUseCase, FindByIdTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase],
})
export class TaskModule {}
