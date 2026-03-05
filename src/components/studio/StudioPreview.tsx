"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, CheckCircle2, Building2, Network, Code2, ArrowRight } from "lucide-react";
import { useState } from "react";

interface TenantData {
    summary?: string;
    company?: Record<string, string>;
    modules?: { nicho_principal?: string; modulos_ativos?: string[] };
    hours?: { dias_ativos?: string[]; horario_abertura?: string; horario_fechamento?: string };
    agent?: Record<string, string>;
    [key: string]: unknown;
}

interface WorkflowData {
    name?: string;
    description?: string;
    trigger?: string;
    nodes?: Array<{ id: string; name: string; type: string; description: string }>;
    use_cases?: string[];
    estimated_triggers_per_day?: number;
    n8n_import_json?: Record<string, unknown>;
    [key: string]: unknown;
}

interface StudioPreviewProps {
    tenantData: TenantData | null;
    workflowData: WorkflowData | null;
    activePreviewTab: "tenant" | "workflow";
}

export function StudioPreview({ tenantData, workflowData, activePreviewTab }: StudioPreviewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadJson = (data: unknown, filename: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    };

    if (!tenantData && !workflowData) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                    <Code2 className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-muted-foreground">Preview</h3>
                    <p className="text-sm text-muted-foreground/70 mt-1 max-w-xs">
                        Os resultados gerados pela IA aparecerão aqui com detalhes visuais e opções de exportação.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-4">
                    {["Dados da Empresa", "Agente IA", "Módulos", "Horários"].map((item) => (
                        <div key={item} className="p-3 rounded-lg border bg-card/50 text-center text-xs text-muted-foreground">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-sm">Resultado Gerado pela IA</h3>
                <p className="text-xs text-muted-foreground">Revise, copie ou exporte para uso no sistema</p>
            </div>

            <Tabs defaultValue={activePreviewTab} className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 pt-2 border-b">
                    <TabsList className="h-8">
                        <TabsTrigger value="tenant" className="text-xs gap-1.5" disabled={!tenantData}>
                            <Building2 className="w-3 h-3" /> Empresa
                        </TabsTrigger>
                        <TabsTrigger value="workflow" className="text-xs gap-1.5" disabled={!workflowData}>
                            <Network className="w-3 h-3" /> Workflow
                        </TabsTrigger>
                        <TabsTrigger value="json" className="text-xs gap-1.5">
                            <Code2 className="w-3 h-3" /> JSON
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* TAB: Empresa */}
                <TabsContent value="tenant" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                        {tenantData && (
                            <div className="space-y-4">
                                {tenantData.summary && (
                                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary">
                                        ✨ {tenantData.summary}
                                    </div>
                                )}
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-sm">🏢 Dados da Empresa</CardTitle></CardHeader>
                                    <CardContent className="text-sm space-y-1">
                                        {tenantData.company && Object.entries(tenantData.company).filter(([, v]) => v).map(([k, v]) => (
                                            <div key={k} className="flex gap-2">
                                                <span className="text-muted-foreground capitalize min-w-[80px]">{k.replace(/_/g, ' ')}:</span>
                                                <span className="font-medium">{String(v)}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-sm">🤖 Agente IA</CardTitle></CardHeader>
                                    <CardContent className="text-sm space-y-1">
                                        {tenantData.agent && Object.entries(tenantData.agent).filter(([, v]) => v).map(([k, v]) => (
                                            <div key={k} className="flex gap-2 items-start">
                                                <span className="text-muted-foreground capitalize min-w-[80px] shrink-0">{k.replace(/_/g, ' ')}:</span>
                                                <span className="text-xs">{String(v)}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-sm">⚙️ Módulos</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {tenantData.modules?.modulos_ativos?.map((m: string) => (
                                                <Badge key={m} variant="secondary" className="capitalize">{m.replace(/_/g, ' ')}</Badge>
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Nicho: <strong>{tenantData.modules?.nicho_principal}</strong></p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-sm">🕐 Horário de Funcionamento</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2 flex-wrap">
                                            {tenantData.hours?.dias_ativos?.map((d: string) => <Badge key={d} variant="outline">{d}</Badge>)}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {tenantData.hours?.horario_abertura} às {tenantData.hours?.horario_fechamento}
                                        </p>
                                    </CardContent>
                                </Card>
                                <div className="flex gap-2 pb-4">
                                    <Button size="sm" className="flex-1 gap-2" onClick={() => downloadJson(tenantData, "tenant_perfil.json")}>
                                        <Download className="w-3.5 h-3.5" /> Exportar Perfil
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopy(JSON.stringify(tenantData, null, 2))}>
                                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>

                {/* TAB: Workflow */}
                <TabsContent value="workflow" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                        {workflowData && (
                            <div className="space-y-4">
                                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                    <h4 className="font-semibold text-sm">{workflowData.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{workflowData.description}</p>
                                </div>
                                <Card>
                                    <CardHeader className="pb-2"><CardTitle className="text-sm">🔗 Nós do Workflow</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {workflowData.nodes?.map((node, i) => (
                                                <div key={node.id} className="flex items-start gap-3">
                                                    <div className="min-w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                                        {node.id}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">{node.name}</span>
                                                            <Badge variant="outline" className="text-[10px] h-4">{node.type}</Badge>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{node.description}</p>
                                                    </div>
                                                    {i < (workflowData.nodes?.length ?? 0) - 1 && (
                                                        <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                {workflowData.use_cases && workflowData.use_cases.length > 0 && (
                                    <Card>
                                        <CardHeader className="pb-2"><CardTitle className="text-sm">💡 Casos de Uso</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {workflowData.use_cases.map((uc: string) => <Badge key={uc} variant="secondary">{uc}</Badge>)}
                                            </div>
                                            {workflowData.estimated_triggers_per_day != null && (
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    ~{workflowData.estimated_triggers_per_day} execuções/dia estimadas
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                                <div className="flex gap-2 pb-4">
                                    <Button size="sm" className="flex-1 gap-2" onClick={() => downloadJson(workflowData.n8n_import_json ?? workflowData, "n8n_workflow.json")}>
                                        <Download className="w-3.5 h-3.5" /> Importar no N8N
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopy(JSON.stringify(workflowData, null, 2))}>
                                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>

                {/* TAB: JSON RAW */}
                <TabsContent value="json" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col">
                    <div className="flex-1 overflow-hidden relative">
                        {(tenantData || workflowData) ? (
                            <>
                                <pre className="h-full overflow-auto p-4 text-xs bg-zinc-950 text-green-400 font-mono">
                                    {JSON.stringify(tenantData ?? workflowData, null, 2)}
                                </pre>
                                <Button
                                    size="sm" variant="secondary"
                                    className="absolute top-2 right-2 gap-1.5 text-xs"
                                    onClick={() => handleCopy(JSON.stringify(tenantData ?? workflowData, null, 2))}
                                >
                                    {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? "Copiado!" : "Copiar"}
                                </Button>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                                Gere algo no chat para ver o JSON
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
