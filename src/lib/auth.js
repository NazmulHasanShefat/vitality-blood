import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.DB_URL);
const db = client.db("vitality");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "donor",
      },
      status: {
        default: "active",
      },
      bloodGroup: {
        default: "N/A",
      },
      district: {
        default: "N/A",
      },
      upazila: {
        default: "N/A",
      },
    },
  },

//   plugins: [admin()],
});
