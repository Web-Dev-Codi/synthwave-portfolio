import Footer from "./components/layout/Footer/Footer";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Experience from "./sections/Experience/Experience";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Project";
import Skills from "./sections/Skills/Skills";

const App = () => (
	<div className="app-shell">
		<div aria-hidden="true" className="starfield-layer" />
		<div aria-hidden="true" className="scanline-overlay" />

		<main className="site-main">
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Contact />
		</main>

		<Footer />
	</div>
);

export default App;
