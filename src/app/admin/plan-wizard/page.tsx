"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardFormData } from "@/schemas/companyWizard";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function PlanWizardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 10;

    const form = useForm<WizardFormData>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(wizardSchema) as any,
        defaultValues: {
            owner: { nome: "", email: "", telefone: "" },
            company: { nome_empresa: "", telefone: "", cidade: "", estado: "" },
            modules: { nicho_principal: "", modulos_ativos: [] },
            regions: { bairros_atendidos: [], prioridades: "" },
            hours: { dias_ativos: [], horario_abertura: "08:00", horario_fechamento: "18:00" },
            agent: { tom_voz: "Profissional", objetivo: "" },
            integrations: { whatsapp_number: "" },
            automation: { automacao_ativa: true, postagens_status_ativas: false },
        },
    });

    function onSubmit(data: WizardFormData) {
        if (currentStep < totalSteps) {
            setCurrentStep(s => s + 1);
        } else {
            console.log("SUBMeter AO SUPABASE E N8N: ", data);
            alert("Tenant Criado com Sucesso!");
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Criação de Operação</h2>
                <p className="text-muted-foreground">Assistente Guiado para provisionar e integrar uma nova Empresa ao Modelo N8N + WhatsApp.</p>

                {/* Simple Progress Bar */}
                <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-right">Passo {currentStep} de {totalSteps}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {currentStep === 1 && (
                        <Card className="animate-fade-in border-ring/50 shadow-lg shadow-primary/5">
                            <CardHeader>
                                <CardTitle>Etapa 1: Dados do Cliente (Dono)</CardTitle>
                                <CardDescription>O responsável que receberá acesso ao painel isolado da empresa.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 pb-6">
                                <FormField control={form.control} name="owner.nome" render={({ field }) => (
                                    <FormItem><FormLabel>Nome Completo</FormLabel>
                                        <FormControl><Input placeholder="João da Silva" {...field} /></FormControl>
                                        <FormMessage /></FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="owner.email" render={({ field }) => (
                                        <FormItem><FormLabel>E-mail</FormLabel>
                                            <FormControl><Input type="email" placeholder="joao@example.com" {...field} /></FormControl>
                                            <FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="owner.telefone" render={({ field }) => (
                                        <FormItem><FormLabel>Telefone Pessoal</FormLabel>
                                            <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                                            <FormMessage /></FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {currentStep === 2 && (
                        <Card className="animate-fade-in border-ring/50 shadow-lg shadow-primary/5">
                            <CardHeader>
                                <CardTitle>Etapa 2: Dados Fiscais da Empresa</CardTitle>
                                <CardDescription>Informações públicas que constarão no perfil da IA.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 pb-6">
                                <FormField control={form.control} name="company.nome_empresa" render={({ field }) => (
                                    <FormItem><FormLabel>Razão Social / Nome Fantasia</FormLabel>
                                        <FormControl><Input placeholder="Pizzaria do Bairro" {...field} /></FormControl>
                                        <FormMessage /></FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="company.cidade" render={({ field }) => (
                                        <FormItem><FormLabel>Cidade Base</FormLabel>
                                            <FormControl><Input placeholder="São Paulo" {...field} /></FormControl>
                                            <FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="company.estado" render={({ field }) => (
                                        <FormItem><FormLabel>UF (2 Letras)</FormLabel>
                                            <FormControl><Input placeholder="SP" maxLength={2} {...field} /></FormControl>
                                            <FormMessage /></FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {currentStep === 3 && (
                        <Card className="animate-fade-in border-ring/50 shadow-lg shadow-primary/5">
                            <CardHeader>
                                <CardTitle>Etapa 3: Nicho e Módulos Ativos</CardTitle>
                                <CardDescription>Define como os painéis serão gerados (Alimentação, Serviço, Hospedagem...)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 px-6 pb-6">
                                <FormField control={form.control} name="modules.nicho_principal" render={({ field }) => (
                                    <FormItem><FormLabel>Qual o nicho primário?</FormLabel>
                                        <FormControl>
                                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background md:text-sm">
                                                <option value="">Selecione...</option>
                                                <option value="pizzaria">Pizzaria</option>
                                                <option value="hamburgueria">Hamburgueria / Delivery</option>
                                                <option value="hostel">Hostel / Hospedagem</option>
                                                <option value="servicos">Serviços / Consultoria</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage /></FormItem>
                                )} />

                                <div className="p-4 rounded-lg bg-card/50 border">
                                    <h4 className="text-sm font-medium mb-3">Checkbox Mock: Habilitar "Delivery", "Agendamento de Mesa"</h4>
                                    <p className="text-xs text-muted-foreground">Na versão completa, este campo usará Checkbox Component customizado alimentando o array modulos_ativos.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {currentStep === 7 && (
                        <Card className="animate-fade-in border-ring/50 shadow-lg shadow-primary/5">
                            <CardHeader>
                                <CardTitle>Etapa 7: Regras do Agente GPT</CardTitle>
                                <CardDescription>Instruções base do N8N para a IA na hora de conversar com os clientes.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 px-6 pb-6">
                                <FormField control={form.control} name="agent.tom_voz" render={({ field }) => (
                                    <FormItem><FormLabel>Tom de Voz</FormLabel>
                                        <FormControl><Input placeholder="Ex: Jovem, com emojis, descontraído" {...field} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="agent.objetivo" render={({ field }) => (
                                    <FormItem><FormLabel>Objetivo Principal</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Convencer o cliente a fechar o pedido de pizza o mais rápido possível e efetuar upsell de bordas recheadas." className="h-24" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>
                    )}

                    {currentStep > 3 && currentStep < 7 && (
                        <div className="text-center p-12 bg-card rounded-lg border border-dashed">
                            <p className="text-muted-foreground">Etapa {currentStep}: UI Dinâmica de Acordo com Módulo (Mock Simplificado).</p>
                            <p className="text-xs">Para manter o documento coeso, pule para as etapas implementadas no escopo do teste.</p>
                        </div>
                    )}

                    {currentStep > 7 && currentStep < 10 && (
                        <div className="text-center p-12 bg-card rounded-lg border border-dashed">
                            <p className="text-muted-foreground">Etapa {currentStep}: Fluxos de QRCode Auth N8N (Mock Simplificado).</p>
                            <p className="text-xs">Exibirá o QR Code de Sincronia do WhatsApp (Evolution API) e Setup Google Calendar.</p>
                        </div>
                    )}

                    {currentStep === 10 && (
                        <Card className="animate-fade-in border-primary border-2 shadow-lg shadow-primary/20">
                            <CardHeader className="bg-primary/5 pb-8">
                                <CardTitle className="text-primary">Revisão Final e Deploy Serverless</CardTitle>
                                <CardDescription>Os dados serão gravados no Supabase e uma instância N8N será notificada para o WhatsApp.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="text-sm">Clique em Concluir para iniciar a orquestração técnica do Tenant.</p>
                            </CardContent>
                        </Card>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(s => Math.max(1, s - 1))} disabled={currentStep === 1}>
                            Voltar Etapa
                        </Button>
                        <Button type="submit" className={currentStep === 10 ? "bg-green-600 hover:bg-green-700" : ""}>
                            {currentStep === totalSteps ? 'Finalizar e Criar Operação' : 'Próxima Etapa'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
