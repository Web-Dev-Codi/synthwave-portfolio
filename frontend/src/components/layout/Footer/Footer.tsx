import { profile } from "../../../data/profile";

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative z-10 bg-[rgba(10,8,24,0.9)] py-8">
			{/* Synthwave neon gradient top border */}
			<div
				className="absolute top-0 left-0 right-0 h-0.5"
				style={{
					background:
						"linear-gradient(90deg, #ff2975 0%, #8c1eff 35%, #00d0ff 65%, #ff2975 100%)",
					boxShadow:
						"0 0 12px rgba(255, 41, 117, 0.5), 0 0 24px rgba(140, 30, 255, 0.4), 0 0 36px rgba(0, 208, 255, 0.3)",
				}}
			/>
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
