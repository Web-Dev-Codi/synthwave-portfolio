import Starfield from "./canvas/Starfield";
import Footer from "./components/layout/Footer/Footer";
import { Navbar } from "./components/layout/Navbar";
import NeonDivider from "./components/ui/NeonDivider";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Experience from "./sections/Experience/Experience";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Project";
import Skills from "./sections/Skills/Skills";

const App = () => (
	<div className="app-shell">
		<Starfield className="starfield-layer" />
		<div aria-hidden="true" className="app-checker-overlay" />
		<div aria-hidden="true" className="scanline-overlay" />
		<div aria-hidden="true" className="noise-overlay" />
		<div aria-hidden="true" className="vignette-overlay" />
		<Navbar />
		<main className="site-main">
			<Hero />
			<NeonDivider color="pink" />
			<About />
			<NeonDivider color="purple" />
			<Skills />
			<NeonDivider color="pink" />
			<Projects />
			<NeonDivider color="purple" />
			<Experience />
			<NeonDivider color="pink" />
			<Contact />
		</main>
		<Footer />
	</div>
);

export default App;
