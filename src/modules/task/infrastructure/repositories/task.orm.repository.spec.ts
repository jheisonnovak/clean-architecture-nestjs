import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { randomUUID } from "crypto";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/task-status.enum";
import { TaskTypeOrmEntity } from "../persistence/task.orm.entity";
import { TaskTypeOrmRepository } from "./task.orm.repository";

describe("TaskTypeOrmRepository", () => {
	let repository: TaskTypeOrmRepository;
	const mockOrmRepository = {
		save: jest.fn(),
		find: jest.fn(),
		findOneBy: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskTypeOrmRepository,
				{
					provide: getRepositoryToken(TaskTypeOrmEntity),
					useValue: mockOrmRepository,
				},
			],
		}).compile();

		repository = module.get<TaskTypeOrmRepository>(TaskTypeOrmRepository);
	});

	it("should be defined", () => {
		expect(repository).toBeDefined();
		expect(mockOrmRepository).toBeDefined();
	});

	describe("TaskTypeOrmRepository methods", () => {
		it("should create and return a domain task", async () => {
			const id = randomUUID();
			const task = new Task(id, "title", "description", TaskStatus.PENDING, new Date());
			mockOrmRepository.save.mockResolvedValue(new TaskTypeOrmEntity(task));

			const result = await repository.create(task);

			expect(mockOrmRepository.save).toHaveBeenCalledTimes(1);
			expect(result).toBeInstanceOf(Task);
			expect(result.id).toBe(id);
		});

		it("should return all tasks", async () => {
			const entities = [
				new TaskTypeOrmEntity({
					id: randomUUID(),
					title: "title",
					description: "description",
					status: TaskStatus.PENDING,
					createdAt: new Date(),
				}),
			];
			mockOrmRepository.find.mockResolvedValue(entities);

			const result = await repository.findAll();

			expect(mockOrmRepository.find).toHaveBeenCalledTimes(1);
			expect(result).toHaveLength(1);
			expect(result[0]).toBeInstanceOf(Task);
		});

		it("should find task by id", async () => {
			const id = randomUUID();
			mockOrmRepository.findOneBy.mockResolvedValue(
				new TaskTypeOrmEntity({
					id,
					title: "title",
					description: "description",
					status: TaskStatus.PENDING,
					createdAt: new Date(),
				})
			);

			const result = await repository.findById(id);

			expect(mockOrmRepository.findOneBy).toHaveBeenCalledWith({ id });
			expect(result).toBeInstanceOf(Task);
			expect(result?.id).toBe(id);
		});

		it("should return null when task does not exist", async () => {
			mockOrmRepository.findOneBy.mockResolvedValue(null);

			const result = await repository.findById(randomUUID());

			expect(result).toBeNull();
		});

		it("should update a task", async () => {
			const task = new Task(randomUUID(), "title", "description", TaskStatus.PENDING, new Date());
			mockOrmRepository.update.mockResolvedValue(undefined);

			await repository.update(task);

			expect(mockOrmRepository.update).toHaveBeenCalledTimes(1);
			expect(mockOrmRepository.update).toHaveBeenCalledWith(task.id, expect.objectContaining({ id: task.id }));
		});

		it("should delete a task", async () => {
			const id = randomUUID();
			mockOrmRepository.delete.mockResolvedValue(undefined);

			await repository.delete(id);

			expect(mockOrmRepository.delete).toHaveBeenCalledWith(id);
		});
	});
});
