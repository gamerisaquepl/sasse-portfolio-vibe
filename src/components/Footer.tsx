
import { ThemeToggle } from "./ThemeToggle";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-lg font-bold gradient-text mb-2">Isaque Luís Sasse</h3>
            <p className="text-sm text-muted-foreground">
              © {currentYear} • Todos os direitos reservados
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-4">
              <a 
                href="#home" 
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Sobre
              </a>
              <a 
                href="#projects" 
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Projetos
              </a>
              <a 
                href="#contact" 
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Contato
              </a>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
