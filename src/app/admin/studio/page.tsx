"use client";

import { useState, useCallback } from "react";
import { StudioChat, type Message } from "@/components/studio/StudioChat";
import { StudioPreview } from "@/components/studio/StudioPreview";
import { Sparkles } from "lucide-react";

export default function StudioPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeMode, setActiveMode] = useState<"tenant" | "workflow">("tenant");
    const [tenantData, setTenantData] = useState<Record<string, unknown> | null>(null);
    const [workflowData, setWorkflowData] = useState<Record<string, unknown> | null>(null);
    const [activePreviewTab, setActivePreviewTab] = useState<"tenant" | "workflow">("tenant");

    const handleSendMessage = useCallback(async (prompt: string, mode: "tenant" | "workflow") => {
        const userMsg: Message = {
            id: `user_${Date.now()}`,
            role: "user",
            content: prompt,
            type: mode,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const endpoint = mode === "tenant"
                ? "/api/studio/generate-tenant"
                : "/api/studio/generate-workflow";

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.error ?? "Erro desconhecido");

            const resultData = mode === "tenant" ? json.tenant : json.workflow;
            const isDemoMode = json.generated_by === "demo_mock";

            // Atualizar o estado de preview
            if (mode === "tenant") {
                setTenantData(resultData);
                setActivePreviewTab("tenant");
            } else {
                setWorkflowData(resultData);
                setActivePreviewTab("workflow");
            }

            // Gerar mensagem de resposta da IA
            let replyContent = "";
            if (mode === "tenant") {
                const company = resultData?.company ?? {};
                replyContent = `✅ Perfil operacional gerado para **${(company as Record<string, string>).nome_empresa ?? "a empresa"}**!\n\n${resultData?.summary ?? ""}\n\n${isDemoMode ? "⚠️ Modo demo (sem OPENAI_API_KEY). Configure sua chave para geração real." : "Gerado com GPT-4o Mini."}\n\nVeja os detalhes no painel de preview →`;
            } else {
                replyContent = `✅ Workflow **"${(resultData as Record<string, string>)?.name ?? "Novo Workflow"}"** gerado com ${(resultData as Record<string, unknown[]>)?.nodes?.length ?? 0} nós!\n\n${isDemoMode ? "⚠️ Modo demo (sem OPENAI_API_KEY). Configure sua chave para geração real." : "Pronto para importar no N8N."}\n\nVeja o diagrama e o JSON no painel →`;
            }

            const aiMsg: Message = {
                id: `ai_${Date.now()}`,
                role: "assistant",
                content: replyContent,
                type: mode,
                data: resultData,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);

        } catch (err) {
            const errMsg: Message = {
                id: `err_${Date.now()}`,
                role: "assistant",
                content: `❌ Erro ao gerar: ${err instanceof Error ? err.message : "Falha inesperada."}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <div className="shrink-0 h-14 border-b bg-background flex items-center px-6 gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                    <h1 className="text-base font-bold leading-tight">Studio IA</h1>
                    <p className="text-xs text-muted-foreground">Gere empresas e automações N8N por prompt</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-[10px] font-medium border ${process.env.NEXT_PUBLIC_APP_URL
                            ? "bg-green-500/10 border-green-500/20 text-green-500"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        }`}>
                        {process.env.OPENAI_API_KEY ? "GPT-4o-mini Online" : "Modo Demo"}
                    </div>
                </div>
            </div>

            {/* Split Panel */}
            <div className="flex-1 flex overflow-hidden">
                {/* Chat — esquerda */}
                <div className="w-[420px] shrink-0 border-r flex flex-col overflow-hidden">
                    <StudioChat
                        messages={messages}
                        isLoading={isLoading}
                        onSendMessage={handleSendMessage}
                        activeMode={activeMode}
                        onModeChange={setActiveMode}
                    />
                </div>

                {/* Preview Panel — direita */}
                <div className="flex-1 flex flex-col overflow-hidden bg-background/50">
                    <StudioPreview
                        tenantData={tenantData as Parameters<typeof StudioPreview>[0]["tenantData"]}
                        workflowData={workflowData as Parameters<typeof StudioPreview>[0]["workflowData"]}
                        activePreviewTab={activePreviewTab}
                    />
                </div>
            </div>
        </div>
    );
}
