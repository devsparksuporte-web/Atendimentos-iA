import Link from "next/link";
import {
    Building2,
    MessageSquare,
    Users,
    Settings,
    PackageSearch,
    CalendarDays,
    Bot
} from "lucide-react";

export default async function TenantLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ tenantId: string }>;
    }
) {
    const { children } = props;
    const params = await props.params;
    return (
        <div className="flex min-h-screen">
            {/* Sidebar Simples */}
            <aside className="w-64 bg-card border-r flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b">
                    <Bot className="w-6 h-6 text-primary mr-2" />
                    <span className="font-bold">Agente iA Server</span>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <Link href={`/${params.tenantId}`} className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary">
                        <Building2 className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href={`/${params.tenantId}/conversas`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                        <MessageSquare className="w-5 h-5" />
                        Caixa de Entrada
                    </Link>
                    <Link href={`/${params.tenantId}/clientes`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Users className="w-5 h-5" />
                        Clientes Base
                    </Link>
                    <Link href={`/${params.tenantId}/tarefas`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                        <PackageSearch className="w-5 h-5" />
                        Pedidos / Tarefas
                    </Link>
                    <Link href={`/${params.tenantId}/agenda`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                        <CalendarDays className="w-5 h-5" />
                        Reservas / Agenda
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <Link href={`/${params.tenantId}/configuracoes`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Settings className="w-5 h-5" />
                        Ajustes do Agente
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header Superior Simples */}
                <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold">Painel Operacional</h1>
                        <div className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full border border-green-500/20 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            N8N Conectado
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                            OP
                        </div>
                    </div>
                </header>

                {/* Scrollable Page */}
                <div className="flex-1 overflow-y-auto bg-background/50">
                    {children}
                </div>
            </main>
        </div>
    );
}
