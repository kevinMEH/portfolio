import AboutMe from "./AboutMe";
import Banner from "./Banner";
import Contact from "./Contact";
import Profile from "./Profile";
import Projects from "./Projects";
import Technologies from "./Technologies";

export default function Portfolio() {
    return (
        <div>
            <Banner />
            <div className="px-6 sm:px-12 space-y-12 pt-4 pb-8">
                <Profile />
                <AboutMe />
                <Technologies />
                <Projects />
                <Contact />
            </div>
        </div>
    );
}
