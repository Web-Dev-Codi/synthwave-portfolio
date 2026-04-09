type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassArray = ClassValue[];

export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| false
	| null
	| undefined;

const normalizeClassValue = (value: ClassValue): string[] => {
	if (!value) {
		return [];
	}

	if (typeof value === "string") {
		return [value];
	}

	if (Array.isArray(value)) {
		return value.flatMap(normalizeClassValue);
	}

	return Object.entries(value)
		.filter(([, isEnabled]) => Boolean(isEnabled))
		.map(([className]) => className);
};

export const cn = (...values: ClassValue[]): string =>
	normalizeClassValue(values).join(" ");
