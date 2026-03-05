import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Workflow, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Painel SaaS <span className="text-muted-foreground font-normal">| Super Admin</span></h2>
                <div className="flex items-center space-x-2">
                    <Link href="/admin/studio">
                        <Button variant="outline" className="gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Studio IA
                        </Button>
                    </Link>
                    <Link href="/admin/plan-wizard">
                        <Button>Criar Operação (Tenant)</Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% em relação ao mês anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fluxos N8N Ativos</CardTitle>
                        <Workflow className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-muted-foreground">Saúde das automações: 99.9%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mensagens Processadas (Hoje)</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4,192</div>
                        <p className="text-xs text-muted-foreground">~82% resolvidas por IA</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Visão Geral de Ganhos / Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full bg-muted/20 rounded-md border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                            [Gráfico Rechart de Adoção de Inteligência]
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Últimas Operações (Empresas)</CardTitle>
                        <CardDescription>
                            As últimas 3 empresas cadastradas no SaaS.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { nome: "Pizzaria Bella Napoli", nicho: "Pizzaria", status: "Operante", modules: "4 ativos" },
                                { nome: "Hostel Paraíso", nicho: "Hostel/Reserva", status: "Ajustes N8N", modules: "3 ativos" },
                                { nome: "Hamburgueria do Zé", nicho: "Hamburgueria", status: "Operante", modules: "5 ativos" },
                            ].map((em, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{em.nome}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {em.nicho} | {em.modules}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                                        {em.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
