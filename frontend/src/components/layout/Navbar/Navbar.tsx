import { useEffect, useState } from "react";
import { profile } from "../../../data/profile";
import { cn } from "../../../utils/cn";
import type { NavbarItem } from "./Navbar.types";

const navbarItems: NavbarItem[] = [
	{ href: "#about", label: "About" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#contact", label: "Contact", tone: "primary" },
];

export const Navbar = () => {
	const [hasScrolled, setHasScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("about");

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

	return (
		<header
			className={cn("site-navbar", hasScrolled && "site-navbar-scrolled")}
		>
			<div className="section-inner flex flex-wrap items-center justify-between gap-4">
				<a
					aria-label="Jump to the hero section"
					className="site-navbar-brand"
					href="#hero"
				>
					{profile.siteLabel}
				</a>

				<nav aria-label="Primary" className="site-navbar-links">
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
			</div>
		</header>
	);
};

export default Navbar;
