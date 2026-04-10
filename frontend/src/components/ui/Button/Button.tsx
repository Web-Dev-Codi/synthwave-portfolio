import { accentClassMap } from "../../../utils/accentMaps";
import { cn } from "../../../utils/cn";
import type {
	ButtonAsAnchorProps,
	ButtonAsButtonProps,
	ButtonProps,
	ButtonSize,
} from "./Button.types";

const sizeClassMap: Record<ButtonSize, string> = {
	lg: "px-8 py-4 text-lg",
	md: "px-6 py-3 text-base",
	sm: "px-4 py-2 text-sm",
} as const;

const sharedClassName =
	"inline-flex items-center justify-center rounded-full border bg-transparent font-[var(--font-display)] uppercase tracking-[0.28em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(238,237,254,0.75)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]";

const isAnchorButton = (
	props: ButtonAsButtonProps | ButtonAsAnchorProps,
): props is ButtonAsAnchorProps => typeof props.href === "string";

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
