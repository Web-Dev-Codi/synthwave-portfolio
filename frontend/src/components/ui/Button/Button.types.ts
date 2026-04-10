import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

import type { AccentColor } from "../../../types/common";

export type ButtonAccent = AccentColor;

export const buttonSizeValues = {
	Lg: "lg",
	Md: "md",
	Sm: "sm",
} as const;

export type ButtonSize =
	(typeof buttonSizeValues)[keyof typeof buttonSizeValues];

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
