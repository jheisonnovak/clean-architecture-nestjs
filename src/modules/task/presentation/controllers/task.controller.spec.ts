import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { TaskOutputDto } from "../../application/dtos/task-output.dto";
import { TaskNotFoundError } from "../../application/errors/task-not-found.error";
import { CreateTaskUseCase } from "../../application/use-cases/create/create.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete/delete.use-case";
import { FindAllTaskUseCase } from "../../application/use-cases/find-all/find-all.use-case";
import { FindByIdTaskUseCase } from "../../application/use-cases/find-one/find-one.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update/update.use-case";
import { TaskStatus } from "../../domain/enums/task-status.enum";
import { TaskAlreadyDoneError } from "../../domain/errors/task-already-done.error";
import { TaskResponseDto } from "../dtos/task-response.dto";
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
			const output = new TaskOutputDto(randomUUID(), "task", "desc", TaskStatus.PENDING, new Date());
			jest.spyOn(createUseCase, "execute").mockResolvedValue(output);

			const result = await controller.create(dto);

			expect(result).toBeInstanceOf(ResponseDto);
			expect(result.message).toBe("Task created successfully");
			expect(result.data).toEqual(TaskResponseDto.fromOutput(output));
			expect(createUseCase.execute).toHaveBeenCalledWith(dto);
		});

		it("should list all tasks", async () => {
			const list: TaskOutputDto[] = [new TaskOutputDto(randomUUID(), "task", "desc", TaskStatus.PENDING, new Date())];
			const expected = list.map(task => TaskResponseDto.fromOutput(task));
			jest.spyOn(findAllUseCase, "execute").mockResolvedValue(list);

			const result = await controller.find();

			expect(result).toEqual(expected);
			expect(findAllUseCase.execute).toHaveBeenCalledTimes(1);
		});

		it("should find a task by id", async () => {
			const id = randomUUID();
			const task = new TaskOutputDto(id, "task", "desc", TaskStatus.PENDING, new Date());
			jest.spyOn(findByIdUseCase, "execute").mockResolvedValue(task);

			const result = await controller.findById(id);

			expect(result).toEqual(TaskResponseDto.fromOutput(task));
			expect(findByIdUseCase.execute).toHaveBeenCalledWith(id);
		});

		it("should update a task", async () => {
			const id = randomUUID();
			const dto = { title: "updated", description: "updated" };
			const output = new TaskOutputDto(id, "updated", "updated", TaskStatus.DOING, new Date());
			jest.spyOn(updateUseCase, "execute").mockResolvedValue(output);

			const result = await controller.execute(id, dto);

			expect(result).toBeInstanceOf(ResponseDto);
			expect(result.message).toBe("Task updated successfully");
			expect(result.data).toEqual(TaskResponseDto.fromOutput(output));
			expect(updateUseCase.execute).toHaveBeenCalledWith(id, dto);
		});

		it("should delete a task", async () => {
			const id = randomUUID();
			jest.spyOn(deleteUseCase, "execute").mockResolvedValue(undefined);

			const result = await controller.delete(id);

			expect(result).toBeInstanceOf(ResponseDto);
			expect(result.message).toBe("Task deleted successfully");
			expect(deleteUseCase.execute).toHaveBeenCalledWith(id);
		});

		it("should map not found error to NotFoundException", () => {
			jest.spyOn(findByIdUseCase, "execute").mockRejectedValue(new TaskNotFoundError());

			expect(controller.findById(randomUUID())).rejects.toThrow(NotFoundException);
		});

		it("should map domain error to BadRequestException", () => {
			jest.spyOn(updateUseCase, "execute").mockRejectedValue(new TaskAlreadyDoneError());

			expect(controller.execute(randomUUID(), { title: "test", description: "test" })).rejects.toThrow(BadRequestException);
		});

		it("should map unknown error to InternalServerErrorException", () => {
			jest.spyOn(createUseCase, "execute").mockRejectedValue(new Error("db down"));

			expect(controller.create({ title: "task", description: "desc" })).rejects.toThrow(InternalServerErrorException);
			expect(controller.create({ title: "task", description: "desc" })).rejects.toMatchObject({
				response: { message: "Internal server error" },
			});
		});
	});
});
