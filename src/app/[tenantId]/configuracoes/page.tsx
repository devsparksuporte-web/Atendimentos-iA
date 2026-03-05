"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TenantSettingsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8 text-center sm:text-left">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ajustes do Agente (N8N)</h2>
                    <p className="text-muted-foreground mr-10 sm:mr-0">Estas configurações alteram em tempo real o perfil operacional da IA.</p>
                </div>
                <Button>Salvar Alterações</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Card de Prompts */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Comportamento e Instruções (System Prompt)</CardTitle>
                        <CardDescription>
                            Ajuste as diretrizes primárias que o Agente da OpenAI/Anthropic seguirá.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Mensagem de Saudação</Label>
                            <Textarea defaultValue="Olá! Muito prazer, sou a inteligência artificial do estabelecimento. Como posso te servir hoje?" className="h-20" />
                        </div>
                        <div className="space-y-2">
                            <Label>Objetivo Principal (Sales/Support)</Label>
                            <Textarea defaultValue="Seu objetivo é vender os itens do cardápio e sugerir bordas recheadas. Não saia do assunto principal." className="h-32" />
                        </div>
                        <div className="space-y-2">
                            <Label>Regras de Escalonamento (Humano)</Label>
                            <Textarea defaultValue="Se o cliente usar palavras como 'reclamação', 'procon', 'atrasado', transfira o estado imediatamente e avise o sistema." className="h-20" />
                        </div>
                    </CardContent>
                </Card>

                {/* Card de Switches/Toggles */}
                <div className="space-y-6 col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Integrações Ativas</CardTitle>
                            <CardDescription>Ligue e desligue os canais do N8N.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold text-green-500">WhatsApp Engine</Label>
                                    <p className="text-sm text-muted-foreground">Recebe as mensagens via Evolution API.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Google Calendar</Label>
                                    <p className="text-sm text-muted-foreground">Checagem de conflitos para agendamentos.</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Automatação Auxiliar</CardTitle>
                            <CardDescription>Recursos autônomos proativos.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Postagens de Status Diárias</Label>
                                    <p className="text-sm text-muted-foreground">O N8n usa DALL-E para criar imagens de ofertas diárias no WhatsApp.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Carrinho Abandonado</Label>
                                    <p className="text-sm text-muted-foreground">Mensagem "Oi! Faltou algo para fechar o pedido?" após 2h.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
