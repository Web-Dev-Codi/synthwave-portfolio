import cors from "cors";
import dotenv from "dotenv";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";
import { fileURLToPath } from "node:url";
import { contactRouter } from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const defaultAllowedOrigins = [
	"http://127.0.0.1:5173",
	"http://localhost:5173",
];
const configuredOrigins = process.env.FRONTEND_URL
	? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
	: defaultAllowedOrigins;

app.use(helmet());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || configuredOrigins.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error("Origin not allowed by CORS."));
		},
	}),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
	response.status(200).json({ status: "ok", success: true });
});

app.use("/api/contact", contactRouter);

app.use((_request, response) => {
	response.status(404).json({ message: "Route not found.", success: false });
});

app.use(
	(
		error: Error,
		_request: Request,
		response: Response,
		_next: NextFunction,
	) => {
		if (error instanceof SyntaxError) {
			return response.status(400).json({
				message: "Invalid JSON payload.",
				success: false,
			});
		}

		return response.status(500).json({
			message: error.message || "Unexpected server error.",
			success: false,
		});
	},
);

const backendPort = Number(process.env.PORT ?? 3001);
const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[1] === currentFilePath) {
	app.listen(backendPort, () => {
		console.log(`Backend listening on http://localhost:${backendPort}`);
	});
}

export default app;
