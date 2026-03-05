import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, MessageSquare, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function TenantDashboardPage(props: { params: Promise<{ tenantId: string }> }) {
    const _params = await props.params; // tenantId disponível como _params.tenantId
    // Simulando dados que viriam do Supabase relativos ao params.tenantId
    const metrics = [
        { title: "Atendimentos Hoje", value: "142", icon: MessageSquare, change: "+12%", trend: "up" },
        { title: "Clientes Novos", value: "24", icon: Users, change: "+4%", trend: "up" },
        { title: "Tempo Médio (TMA)", value: "1.2m", icon: Clock, change: "-15s", trend: "up" },
        { title: "Transf. Humano", value: "8", icon: Activity, change: "+2", trend: "down" },
    ];

    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Visão Geral</h2>
                    <p className="text-muted-foreground">Bem-vindo(a) à operação. A IA está ativa neste momento.</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">Baixar Relatório</Button>
                    <Button>Pausar IA Geral</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <Card key={metric.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                <div className={`flex items-center text-xs mt-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    {metric.change} em relação a ontem
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Volume de Interações vs Vendas Fechadas (IA)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full bg-muted/20 rounded-md border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                            [Gráfico Linha de Tempo - N8N Webhooks]
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Alertas Recentes da Automação</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { time: "Há 10 min", msg: "IA detectou reclamação intensa. Cliente (11) 98888-*** necessita contato.", alert: true },
                                { time: "Há 45 min", msg: "Postagem de Status do Dia 10 feita com sucesso via Evolution API.", alert: false },
                                { time: "Há 2 horas", msg: "Agendamento de Reserva Concluído (Maria, Mesa 12)", alert: false },
                                { time: "Há 4 horas", msg: "N8N não conseguiu buscar itens de Pizzaria (Timeout). Automático retry funcionou.", alert: true }
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className={`min-w-2 h-2 mt-1.5 rounded-full ${log.alert ? 'bg-red-500' : 'bg-primary'}`}></div>
                                    <div className="space-y-1">
                                        <p className="text-sm">{log.msg}</p>
                                        <p className="text-xs text-muted-foreground">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="w-full mt-4 text-xs font-semibold">
                            Ir para Logs completos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
