import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle("Clean Architecture NestJS")
		.setDescription("This repository provides an example of implementing Clean Architecture using NestJS.")
		.setVersion(process.env.npm_package_version ?? "0.0.0")
		.build();
	const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, documentFactory);

	await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
