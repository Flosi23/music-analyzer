import NextAuth from "next-auth";
import { Account } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		accounts: Account[];
	}
}
