import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockAgendamentos = [
    { id: "AG-1002", cliente: "Maria Souza", servico: "Cílios Volume Russo", data: "06/03/2026 - 14:00", status: "Confirmado", canal: "WhatsApp (N8N)" },
    { id: "RS-8891", cliente: "João Pedro", servico: "Reserva Quarto Suíte", data: "08/03/2026 - Checkin", status: "Pendente Pagamento", canal: "Site CRM" },
    { id: "AG-1003", cliente: "Fernanda L.", servico: "Limpeza de Pele", data: "06/03/2026 - 16:30", status: "Cancelado (IA)", canal: "WhatsApp (N8N)" },
];

export default function TenantAgendaPage() {
    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Agenda / Reservas</h2>
                    <p className="text-muted-foreground">Listagem de compromissos marcados pela IA ou manual</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Próximos 7 Dias</CardTitle>
                    <CardDescription>Sincronizado via Google Calendar Integration</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cod.</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Serviço / Quarto</TableHead>
                                <TableHead>Data/Hora</TableHead>
                                <TableHead>Origem</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockAgendamentos.map((ag) => (
                                <TableRow key={ag.id}>
                                    <TableCell className="font-medium text-muted-foreground">{ag.id}</TableCell>
                                    <TableCell>{ag.cliente}</TableCell>
                                    <TableCell>{ag.servico}</TableCell>
                                    <TableCell>{ag.data}</TableCell>
                                    <TableCell className="text-muted-foreground">{ag.canal}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            ag.status.includes('Confirmado') ? 'default' :
                                                ag.status.includes('Cancelado') ? 'destructive' : 'secondary'
                                        }>
                                            {ag.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Botões do Calendar Mock */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card border text-sm text-center">Abrir Grade Completa</div>
                <div className="p-4 rounded-lg bg-card border text-sm text-center">Configurar Lembretes (N8N)</div>
                <div className="p-4 rounded-lg bg-card border text-sm text-center">Forçar Sincronia Calendar</div>
            </div>
        </div>
    );
}
