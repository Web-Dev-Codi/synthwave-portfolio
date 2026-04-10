import { cn } from "../../../utils/cn";
import type { ButtonAsAnchorProps, ButtonProps } from "./Button.types";

const accentClassMap = {
	amber:
		"border-[rgba(240,153,123,0.6)] text-[var(--color-amber)] shadow-[var(--shadow-amber)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] hover:bg-[rgba(240,153,123,0.1)]",
	cyan: "border-[rgba(93,202,165,0.6)] text-[var(--color-cyan)] shadow-[var(--shadow-cyan)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] hover:bg-[rgba(93,202,165,0.1)]",
	pink: "border-[rgba(212,83,126,0.6)] text-[var(--color-pink)] shadow-[var(--shadow-pink)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] hover:bg-[rgba(212,83,126,0.1)] hover:shadow-[var(--shadow-pink-hover)]",
	purple:
		"border-[rgba(127,119,221,0.6)] text-[var(--color-purple)] shadow-[var(--shadow-purple)] hover:border-[var(--color-purple)] hover:text-[var(--color-purple)] hover:bg-[rgba(127,119,221,0.1)]",
} as const;

const sizeClassMap = {
	md: "px-6 py-3 text-[0.65rem] sm:px-7",
	sm: "px-4 py-2.5 text-[0.58rem]",
} as const;

const sharedClassName =
	"inline-flex items-center justify-center rounded-full border bg-transparent font-[var(--font-display)] uppercase tracking-[0.28em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(238,237,254,0.75)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]";

const isAnchorButton = (props: ButtonProps): props is ButtonAsAnchorProps =>
	typeof props.href === "string";

export const Button = (props: ButtonProps) => {
	if (isAnchorButton(props)) {
		const {
			accent = "pink",
			children,
			className,
			href,
			size = "md",
			...anchorProps
		} = props;
		const resolvedClassName = cn(
			sharedClassName,
			accentClassMap[accent],
			sizeClassMap[size],
			className,
		);

		return (
			<a
				{...anchorProps}
				className={resolvedClassName}
				href={href}
				rel={
					anchorProps.rel ??
					(anchorProps.target === "_blank" ? "noreferrer" : undefined)
				}
			>
				{children}
			</a>
		);
	}

	const {
		accent = "pink",
		children,
		className,
		size = "md",
		type,
		...buttonProps
	} = props;
	const resolvedClassName = cn(
		sharedClassName,
		accentClassMap[accent],
		sizeClassMap[size],
		className,
	);

	return (
		<button
			{...buttonProps}
			className={resolvedClassName}
			type={type ?? "button"}
		>
			{children}
		</button>
	);
};

export default Button;
