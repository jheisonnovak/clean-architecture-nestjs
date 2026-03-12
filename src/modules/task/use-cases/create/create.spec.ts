import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ResponseDto } from "../../../../shared/dtos/response.dto";
import { TaskEntity } from "../../models/entities/task.entity";
import { ITaskRepository } from "../../models/interfaces/task-repository.interface";
import { CreateTaskUseCase } from "./create.use-case";

describe("CreateTask", () => {
	let createUseCase: CreateTaskUseCase;
	let taskRepository: ITaskRepository;
	const mockRepository = {
		create: jest.fn().mockResolvedValue(new TaskEntity()),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CreateTaskUseCase, { provide: "ITaskRepository", useValue: mockRepository }],
		}).compile();

		createUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
		taskRepository = module.get<ITaskRepository>("ITaskRepository");
	});

	it("should be defined", () => {
		expect(createUseCase).toBeDefined();
		expect(mockRepository).toBeDefined();
	});

	describe("CreateTaskUseCase", () => {
		it("should be create a task", async () => {
			const result = await createUseCase.execute({ title: "test", description: "test" });

			expect(result).toBeInstanceOf(ResponseDto);
			expect(taskRepository.create).toHaveBeenCalledTimes(1);
		});

		it("should be throw bad request exception", () => {
			jest.spyOn(taskRepository, "create").mockRejectedValueOnce(new Error("Error"));

			expect(createUseCase.execute({ title: "test", description: "test" })).rejects.toThrow(BadRequestException);
		});
	});
});
