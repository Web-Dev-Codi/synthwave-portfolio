import { cn } from "../../../utils/cn";

type SynthwaveAvatarProps = {
	alt?: string;
	className?: string;
	src?: string;
};

export const SynthwaveAvatar = ({
	alt = "Profile avatar",
	className,
	src,
}: SynthwaveAvatarProps) => (
	<div className={cn("synthwave-avatar-shell", className)}>
		{src ? (
			<img alt={alt} className="h-full w-full object-cover" src={src} />
		) : (
			<svg
				aria-hidden="true"
				className="h-full w-full"
				viewBox="0 0 200 200"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Background */}
				<rect fill="#070612" height="200" width="200" />
				{/* Stars */}
				<circle cx="28" cy="18" fill="rgba(255,255,255,0.75)" r="1" />
				<circle cx="78" cy="32" fill="rgba(255,255,255,0.55)" r="0.7" />
				<circle cx="138" cy="12" fill="rgba(0,208,255,0.65)" r="1.1" />
				<circle cx="168" cy="38" fill="rgba(255,255,255,0.5)" r="0.8" />
				<circle cx="52" cy="52" fill="rgba(212,83,126,0.55)" r="0.6" />
				<circle cx="162" cy="62" fill="rgba(255,255,255,0.4)" r="0.7" />
				<circle cx="110" cy="22" fill="rgba(140,30,255,0.5)" r="0.9" />
				{/* Sun gradient */}
				<defs>
					<radialGradient cx="50%" cy="50%" id="avatarSunGrad" r="50%">
						<stop offset="0%" stopColor="#ffd319" />
						<stop offset="38%" stopColor="#ff901f" />
						<stop offset="72%" stopColor="#ff2975" />
						<stop offset="100%" stopColor="#8c1eff" />
					</radialGradient>
				</defs>
				{/* Sun centered on horizon (y=118) */}
				<circle cx="100" cy="118" fill="url(#avatarSunGrad)" r="36" />
				{/* Stripes — lower half only */}
				<rect fill="rgba(7,6,18,0.78)" height="2.5" width="72" x="64" y="118" />
				<rect fill="rgba(7,6,18,0.78)" height="2.5" width="72" x="64" y="124" />
				<rect fill="rgba(7,6,18,0.78)" height="2.5" width="72" x="64" y="130" />
				<rect fill="rgba(7,6,18,0.78)" height="2.5" width="72" x="64" y="136" />
				<rect fill="rgba(7,6,18,0.78)" height="2" width="72" x="64" y="142" />
				<rect fill="rgba(7,6,18,0.78)" height="2" width="72" x="64" y="148" />
				{/* Horizon line */}
				<line
					stroke="rgba(0,208,255,0.75)"
					strokeWidth="1"
					x1="0"
					x2="200"
					y1="118"
					y2="118"
				/>
				{/* Perspective grid lines */}
				<line stroke="rgba(255,41,117,0.4)" strokeWidth="0.8" x1="100" x2="0" y1="118" y2="200" />
				<line stroke="rgba(255,41,117,0.32)" strokeWidth="0.8" x1="100" x2="44" y1="118" y2="200" />
				<line stroke="rgba(255,41,117,0.25)" strokeWidth="0.8" x1="100" x2="72" y1="118" y2="200" />
				<line stroke="rgba(255,41,117,0.25)" strokeWidth="0.8" x1="100" x2="128" y1="118" y2="200" />
				<line stroke="rgba(255,41,117,0.32)" strokeWidth="0.8" x1="100" x2="156" y1="118" y2="200" />
				<line stroke="rgba(255,41,117,0.4)" strokeWidth="0.8" x1="100" x2="200" y1="118" y2="200" />
				{/* Horizontal grid lines */}
				<line opacity="0.5" stroke="rgba(0,208,255,0.22)" strokeWidth="0.7" x1="22" x2="178" y1="143" y2="143" />
				<line opacity="0.4" stroke="rgba(0,208,255,0.18)" strokeWidth="0.7" x1="8" x2="192" y1="162" y2="162" />
				<line opacity="0.3" stroke="rgba(0,208,255,0.14)" strokeWidth="0.7" x1="0" x2="200" y1="180" y2="180" />
				{/* Mountains */}
				<polyline
					fill="none"
					points="0,118 28,94 52,106 76,80 100,118"
					stroke="rgba(0,208,255,0.6)"
					strokeWidth="1"
				/>
				<polyline
					fill="none"
					points="100,118 124,80 148,106 172,94 200,118"
					stroke="rgba(0,208,255,0.6)"
					strokeWidth="1"
				/>
			</svg>
		)}
	</div>
);

export default SynthwaveAvatar;
