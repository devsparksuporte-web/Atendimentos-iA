import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center overflow-hidden">
      <div className="bg-glow-purple"></div>

      <div className="max-w-3xl space-y-6 z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-primary-foreground">v2.0 - Plataforma Multi-Tenant</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          O <span className="text-gradient">Motor Central</span> de Automação do WhatsApp
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Gerencie múltiplas empresas, rotas dinâmicas, inteligência artificial e agendamentos em uma única plataforma orquestrada pelo n8n.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/admin">
            <Button size="lg" className="h-12 px-8 text-base">
              Acessar Painel Admin (SaaS)
            </Button>
          </Link>
          <Link href="/demo-tenant">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-card/50 backdrop-blur-sm">
              Ver Painel de Empresa
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer minimalista */}
      <div className="absolute bottom-8 text-sm text-muted-foreground/60 w-full text-center">
        Powered by Next.js App Router, Supabase & n8n.
      </div>
    </div>
  );
}
