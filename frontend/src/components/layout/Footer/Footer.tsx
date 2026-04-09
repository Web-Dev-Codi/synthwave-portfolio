import { profile } from "../../../data/profile";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative z-10 border-t border-[rgba(127,119,221,0.2)] bg-[rgba(10,8,24,0.9)] py-8">
			<div className="section-inner flex flex-col gap-3 text-center text-sm text-(--color-text-dim) sm:flex-row sm:items-center sm:justify-between sm:text-left">
				<p className="pixel-heading text-[0.6rem] tracking-[0.24em] text-(--color-text-primary)">
					{profile.siteLabel}
				</p>
				<p>
					{profile.location} · {profile.availability}
				</p>
				<p>
					© {currentYear} {profile.name}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
