
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Preloader } from "@/components/Preloader";

const Index = () => {
  // Track and update progress based on scroll position
  useEffect(() => {
    // Trigger in-view animations for any visible sections on initial load
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);

    // Change page title based on active section
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute("id");
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          let pageTitle = "Isaque Luís Sasse";
          
          switch(sectionId) {
            case "home":
              pageTitle = "Isaque Luís Sasse | Developer";
              break;
            case "about":
              pageTitle = "Sobre | Isaque Luís Sasse";
              break;
            case "projects":
              pageTitle = "Projetos | Isaque Luís Sasse";
              break;
            case "experience":
              pageTitle = "Experiência | Isaque Luís Sasse";
              break;
            case "contact":
              pageTitle = "Contato | Isaque Luís Sasse";
              break;
          }
          
          document.title = pageTitle;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index;
