
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Mensagem enviada com sucesso!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const socials = socialsRef.current;
    
    if (!section || !title || !form || !socials) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.add("animate-fade-in");
          
          setTimeout(() => {
            form.classList.add("animate-fade-in");
            form.style.opacity = "1";
            
            setTimeout(() => {
              socials.classList.add("animate-fade-in");
              socials.style.opacity = "1";
            }, 300);
          }, 300);
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="section-title text-center mb-16 opacity-0"
        >
          Entre em Contato
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 opacity-0"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input 
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Assunto da mensagem"
                required
                className="transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Digite sua mensagem..."
                required
                className="min-h-32 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full hover:scale-105 transition-all"
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
          
          {/* Social Links */}
          <div 
            ref={socialsRef}
            className="flex flex-col justify-center space-y-8 opacity-0"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-4">Conecte-se comigo</h3>
              <p className="text-muted-foreground">
                Estou sempre aberto a novas oportunidades e conexões profissionais. Entre em contato por qualquer um desses canais!
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a 
                href="https://linkedin.com/in/isaqueluis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-4 border border-border/50 rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://github.com/isaqueluis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-4 border border-border/50 rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a 
                href="mailto:isaque@exemplo.com"
                className="flex items-center gap-2 p-4 border border-border/50 rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>E-mail</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
