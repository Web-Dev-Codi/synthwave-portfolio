import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

export type ButtonAccent = "amber" | "cyan" | "pink" | "purple";
export type ButtonSize = "md" | "sm";

type SharedButtonProps = {
	accent?: ButtonAccent;
	children: ReactNode;
	className?: string;
	size?: ButtonSize;
};

export type ButtonAsAnchorProps = SharedButtonProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		href: string;
	};

export type ButtonAsButtonProps = SharedButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement> & {
		href?: never;
	};

export type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;
