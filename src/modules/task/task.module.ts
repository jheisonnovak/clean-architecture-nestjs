import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskEntity } from "./models/entities/task.entity";
import { TaskTypeOrmRepository } from "./repositories/task.repository";
import { CreateTaskController } from "./use-cases/create/create.controller";
import { CreateTaskUseCase } from "./use-cases/create/create.use-case";
import { DeleteTaskController } from "./use-cases/delete/delete.controller";
import { DeleteTaskUseCase } from "./use-cases/delete/delete.use-case";
import { FindAllTaskController } from "./use-cases/find-all/find-all.controller";
import { FindAllTaskUseCase } from "./use-cases/find-all/find-all.use-case";
import { FindOneByIdTaskController } from "./use-cases/find-one-by-id/find-one-by-id.controller";
import { FindOneByIdTaskUseCase } from "./use-cases/find-one-by-id/find-one-by-id.use-case";
import { UpdateTaskController } from "./use-cases/update/update.controller";
import { UpdateTaskUseCase } from "./use-cases/update/update.use-case";

@Module({
	imports: [TypeOrmModule.forFeature([TaskEntity])],
	controllers: [CreateTaskController, FindAllTaskController, FindOneByIdTaskController, UpdateTaskController, DeleteTaskController],
	providers: [
		TaskTypeOrmRepository,
		{
			provide: "ITaskRepository",
			useExisting: TaskTypeOrmRepository,
		},
		CreateTaskUseCase,
		FindAllTaskUseCase,
		FindOneByIdTaskUseCase,
		UpdateTaskUseCase,
		DeleteTaskUseCase,
	],
	exports: ["ITaskRepository", CreateTaskUseCase, FindAllTaskUseCase, FindOneByIdTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase],
})
export class TaskModule {}
