import type { AccentColor } from "../../types/common";

export type SubmissionState = {
	message: string;
	tone: AccentColor;
	type: "error" | "idle" | "submitting" | "success";
};
