import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



const client = new MongoClient(process.env.MONGODB_URL || "mongodb://localhost:27017/dummy");
const db = client.db('assignment_7_b14_a7_bazar_dor');

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
   socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLINET_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLINET_SECRET as string, 
        }, 
         github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLINET_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLINET_SECRET as string, 
        },
    },
  
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
