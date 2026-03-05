import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockPedidos = [
    { id: "#49281", cliente: "Carlos Eduardo", itens: "1x Pizza Calabresa (G), 1x Coca-Cola 2L", total: "R$ 89,90", status: "Em Preparo", via: "IA (N8N)" },
    { id: "#49280", cliente: "Roberto A.", itens: "2x Acai 500ml", total: "R$ 45,00", status: "Saiu pra Entrega", via: "Humano" },
    { id: "#49279", cliente: "Julia S.", itens: "1x Combo Burger Duplo", total: "R$ 55,90", status: "Concluído", via: "IA (N8N)" },
];

export default function TenantPedidosPage() {
    return (
        <div className="flex-1 space-y-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Painel de Pedidos</h2>
                    <p className="text-muted-foreground">Monitorando pedidos gerados via WhatsApp e Site Interno</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fila Atual</CardTitle>
                    <CardDescription>A tabela atualiza automaticamente quando a IA no N8N encerra uma negociação de venda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cod.</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Resumo</TableHead>
                                <TableHead>Valor Total</TableHead>
                                <TableHead>Fechado Por</TableHead>
                                <TableHead>Status Atual</TableHead>
                                <TableHead>Ação</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPedidos.map((ped) => (
                                <TableRow key={ped.id}>
                                    <TableCell className="font-semibold">{ped.id}</TableCell>
                                    <TableCell>{ped.cliente}</TableCell>
                                    <TableCell className="max-w-[200px] truncate text-muted-foreground">{ped.itens}</TableCell>
                                    <TableCell>{ped.total}</TableCell>
                                    <TableCell className="text-xs">{ped.via}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            ped.status.includes('Concluído') ? 'secondary' :
                                                ped.status.includes('Em Preparo') ? 'destructive' : 'default'
                                        }>
                                            {ped.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-primary text-xs cursor-pointer hover:underline">Ver Chat Origem</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
