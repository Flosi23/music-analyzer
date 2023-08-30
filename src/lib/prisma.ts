import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient =
	process.env.NODE_ENV !== "production"
		? new PrismaClient({
				log: ["query", "info", "warn", "error"],
		  })
		: new PrismaClient();

export default prisma;
