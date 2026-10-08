import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URL;

// 💡 বিল্ড টাইমে Vercel যেন ক্র্যাশ না করে, সেজন্য একটি সেফটি চেক
if (!mongoUri) {
  console.warn("⚠️ MONGODB_URL is missing! (This might happen during Vercel build time)");
}

// যদি ইউআরএল না থাকে, তবে একটি ডামি ইউআরএল পাস করা হচ্ছে শুধু বিল্ড পাস করানোর জন্য
const client = new MongoClient(mongoUri || "mongodb://localhost:27017/dummy");
const db = client.db('assignment_7_b14_a7_bazar_dor');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
