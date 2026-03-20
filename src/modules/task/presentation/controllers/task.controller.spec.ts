import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { ListTaskDto } from "../../application/dtos/list-task.dto";
import { CreateTaskUseCase } from "../../application/use-cases/create/create.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete/delete.use-case";
import { FindAllTaskUseCase } from "../../application/use-cases/find-all/find-all.use-case";
import { FindByIdTaskUseCase } from "../../application/use-cases/find-one/find-one.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update/update.use-case";
import { TaskStatus } from "../../domain/enums/task-status.enum";
import { TaskTypeOrmEntity } from "../../infrastructure/persistence/task.orm.entity";
import { TaskController } from "./task.controller";

describe("TaskController", () => {
	let controller: TaskController;
	let createUseCase: CreateTaskUseCase;
	let findAllUseCase: FindAllTaskUseCase;
	let deleteUseCase: DeleteTaskUseCase;
	let findByIdUseCase: FindByIdTaskUseCase;
	let updateUseCase: UpdateTaskUseCase;

	const mockCreateUseCase = { execute: jest.fn() };
	const mockFindAllUseCase = { execute: jest.fn() };
	const mockDeleteUseCase = { execute: jest.fn() };
	const mockFindByIdUseCase = { execute: jest.fn() };
	const mockUpdateUseCase = { execute: jest.fn() };

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			controllers: [TaskController],
			providers: [
				{ provide: CreateTaskUseCase, useValue: mockCreateUseCase },
				{ provide: FindAllTaskUseCase, useValue: mockFindAllUseCase },
				{ provide: DeleteTaskUseCase, useValue: mockDeleteUseCase },
				{ provide: FindByIdTaskUseCase, useValue: mockFindByIdUseCase },
				{ provide: UpdateTaskUseCase, useValue: mockUpdateUseCase },
			],
		}).compile();

		controller = module.get<TaskController>(TaskController);
		createUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
		findAllUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
		deleteUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
		findByIdUseCase = module.get<FindByIdTaskUseCase>(FindByIdTaskUseCase);
		updateUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
		expect(mockCreateUseCase).toBeDefined();
		expect(mockFindAllUseCase).toBeDefined();
		expect(mockDeleteUseCase).toBeDefined();
		expect(mockFindByIdUseCase).toBeDefined();
		expect(mockUpdateUseCase).toBeDefined();
	});

	describe("TaskController methods", () => {
		it("should create a task", async () => {
			const dto = { title: "task", description: "desc" };
			const response = new ResponseDto<TaskTypeOrmEntity>("Created", new TaskTypeOrmEntity());
			jest.spyOn(createUseCase, "execute").mockResolvedValue(response);

			const result = await controller.create(dto);

			expect(result).toBe(response);
			expect(createUseCase.execute).toHaveBeenCalledWith(dto);
		});

		it("should list all tasks", async () => {
			const list: ListTaskDto[] = [new ListTaskDto(randomUUID(), "task", "desc", TaskStatus.PENDING)];
			jest.spyOn(findAllUseCase, "execute").mockResolvedValue(list);

			const result = await controller.find();

			expect(result).toEqual(list);
			expect(findAllUseCase.execute).toHaveBeenCalledTimes(1);
		});

		it("should find a task by id", async () => {
			const id = randomUUID();
			const task = new ListTaskDto(id, "task", "desc", TaskStatus.PENDING);
			jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(task);

			const result = await controller.findById(id);

			expect(result).toEqual(task);
			expect(findByIdUseCase.execute).toHaveBeenCalledWith(id);
		});

		it("should update a task", async () => {
			const id = randomUUID();
			const dto = { title: "updated", description: "updated" };
			const response = new ResponseDto<TaskTypeOrmEntity>("Updated", new TaskTypeOrmEntity());
			jest.spyOn(updateUseCase, "execute").mockResolvedValue(response);

			const result = await controller.execute(id, dto);

			expect(result).toBe(response);
			expect(updateUseCase.execute).toHaveBeenCalledWith(id, dto);
		});

		it("should delete a task", async () => {
			const id = randomUUID();
			const response = new ResponseDto<undefined>("Deleted", undefined);
			jest.spyOn(deleteUseCase, "execute").mockResolvedValue(response);

			const result = await controller.delete(id);

			expect(result).toBe(response);
			expect(deleteUseCase.execute).toHaveBeenCalledWith(id);
		});
	});
});
