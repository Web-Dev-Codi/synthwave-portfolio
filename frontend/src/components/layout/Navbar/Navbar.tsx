import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../../../data/profile";
import { cn } from "../../../utils/cn";
import type { NavbarItem } from "./Navbar.types";

const navbarItems: NavbarItem[] = [
	{ href: "#about", label: "About" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#experience", label: "Experience" },
	{ href: "#contact", label: "Contact", tone: "primary" },
];

const menuVariants = {
	closed: {
		opacity: 0,
		x: "100%",
		transition: {
			duration: 0.3,
			ease: "easeInOut" as const,
		},
	},
	open: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut" as const,
		},
	},
};

const linkVariants = {
	closed: { opacity: 0, x: 20 },
	open: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.3,
			ease: "easeOut" as const,
		},
	}),
};

export const Navbar = () => {
	const [hasScrolled, setHasScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("about");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleViewportChange = () => {
			setHasScrolled(window.scrollY > 20);

			const nextActiveSection = navbarItems
				.map((item) => document.querySelector(item.href))
				.find((section) => {
					if (!section) {
						return false;
					}

					const rect = section.getBoundingClientRect();

					return rect.top <= 180 && rect.bottom >= 180;
				});

			if (!nextActiveSection) {
				return;
			}

			setActiveSection(`#${nextActiveSection.id}`);
		};

		handleViewportChange();
		window.addEventListener("scroll", handleViewportChange, { passive: true });
		window.addEventListener("resize", handleViewportChange);

		return () => {
			window.removeEventListener("scroll", handleViewportChange);
			window.removeEventListener("resize", handleViewportChange);
		};
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const handleNavClick = (href: string) => {
		setIsMobileMenuOpen(false);
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<header
				className={cn(
					"site-navbar",
					hasScrolled && "site-navbar-scrolled site-navbar-gradient-border",
				)}
			>
				<div className="section-inner flex flex-wrap items-center justify-between gap-4">
					<a
						aria-label="Jump to the hero section"
						className="site-navbar-brand"
						href="#hero"
					>
						{profile.siteLabel}
					</a>

					<nav
						aria-label="Primary"
						className="site-navbar-links hidden min-[700px]:flex"
					>
						{navbarItems.map((item) => (
							<a
								key={item.href}
								aria-label={`Jump to the ${item.label} section`}
								className={cn(
									"site-nav-link",
									item.tone === "primary"
										? "site-nav-link-primary"
										: "site-nav-link-secondary",
									activeSection === item.href &&
										item.tone !== "primary" &&
										"site-nav-link-active",
								)}
								href={item.href}
							>
								{item.label}
							</a>
						))}
					</nav>

					<button
						aria-label="Toggle mobile menu"
						aria-expanded={isMobileMenuOpen}
						className="hidden max-[699px]:flex hamburger-button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						type="button"
					>
						<span
							className={cn(
								"hamburger-line",
								isMobileMenuOpen && "hamburger-line-open",
							)}
						/>
						<span
							className={cn(
								"hamburger-line",
								isMobileMenuOpen && "hamburger-line-open",
							)}
						/>
						<span
							className={cn(
								"hamburger-line",
								isMobileMenuOpen && "hamburger-line-open",
							)}
						/>
					</button>
				</div>
			</header>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						animate="open"
						className="mobile-sidebar"
						exit="closed"
						initial="closed"
						variants={menuVariants}
					>
						<div className="mobile-sidebar-header">
							<span className="pixel-heading text-xs tracking-[0.2em] text-(--color-pink)">
								Navigation
							</span>
							<button
								aria-label="Close mobile menu"
								className="mobile-sidebar-close"
								onClick={() => setIsMobileMenuOpen(false)}
								type="button"
							>
								×
							</button>
						</div>

						<nav aria-label="Mobile navigation" className="mobile-sidebar-nav">
							{navbarItems.map((item, i) => (
								<motion.a
									custom={i}
									key={item.href}
									className={cn(
										"mobile-nav-link",
										item.tone === "primary" && "mobile-nav-link-primary",
										activeSection === item.href &&
											item.tone !== "primary" &&
											"mobile-nav-link-active",
									)}
									href={item.href}
									onClick={(e) => {
										e.preventDefault();
										handleNavClick(item.href);
									}}
									variants={linkVariants}
								>
									<span className="mobile-nav-link-accent" />
									{item.label}
								</motion.a>
							))}
						</nav>

						<div className="mobile-sidebar-footer">
							<div className="mobile-sidebar-gradient-line" />
							<p className="pixel-heading text-[0.55rem] tracking-[0.2em] text-(--color-text-dim)">
								{profile.siteLabel}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{isMobileMenuOpen && (
				<button
					type="button"
					className="mobile-sidebar-overlay"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-label="Close menu overlay"
				/>
			)}
		</>
	);
};

export default Navbar;
