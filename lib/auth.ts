import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient()

export const auth = betterAuth({
    
  database: prismaAdapter(prisma,{
    provider: "postgresql"
  }),
  emailAndPassword:{
    enabled: true,
  },
  user:{
    additionalFields:{
      isAdmin:{
        type: "boolean",
        input: false
      },
      location:{
        type: "string",
      },
      bio:{
        type: "string"
      },
      website:{
        type: "string"
      },
      skill:{
        type: "string[]"
      }
    }
  },
  rateLimit:{
    enabled: true,
    window: 60,
    max: 3,
  },
  plugins: [nextCookies()]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;