import mongoose, { Connection } from "mongoose";

class DBConnect {
	private static connection: Connection;
	private constructor() {}

	private static async connect(uri: string): Promise<Connection> {
		if (this.connection) return this.connection; // already connected

		try {
			const { connection } = await mongoose.connect(uri);
			this.connection = connection;

			console.log("Connected to MongoDB");

			this.connection?.on("disconnected", () => {
				console.warn("MongoDB disconnected");
			});

			this.connection?.on("error", (err) => {
				console.error("MongoDB connection error:", err);
			});
		} catch (error) {
			console.error("Failed to connect to MongoDB:", (error as Error).message);
			process.exit(1);
		}

		return this.connection;
	}

	static async getConnection(): Promise<Connection> {
		const uri = process.env.MONGO_URI;
		if (!uri) throw new Error("MONGO_URI is missing");
		return await this.connect(uri);
	}
}

export { DBConnect as DB };
