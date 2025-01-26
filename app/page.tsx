import AboutMe from "./AboutMe";
import Banner from "./Banner";
import Contact from "./Contact";
import Footer from "./Footer";
import Projects from "./Projects";
import Technologies from "./Technologies";

export default function Portfolio() {
    return (
        <div className="mx-auto max-w-[700px]">
            <Banner />
            <div className="px-6 md:px-8 space-y-12 md:space-y-16 pt-4 pb-12">
                <AboutMe />
                <Technologies />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}
