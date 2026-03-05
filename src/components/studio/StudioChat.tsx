"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Sparkles, Bot, User } from "lucide-react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "tenant" | "workflow" | "text";
    data?: Record<string, unknown>;
    timestamp: Date;
}

interface StudioChatProps {
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (prompt: string, mode: "tenant" | "workflow") => void;
    activeMode: "tenant" | "workflow";
    onModeChange: (mode: "tenant" | "workflow") => void;
}

const SUGGESTIONS = {
    tenant: [
        "Pizzaria em São Paulo, delivery e retirada, seg-dom 18h-23h, tom descontraído com emojis",
        "Hostel no Rio de Janeiro, check-in 14h, check-out 12h, multilingue, focus em jovens viajantes",
        "Clínica de estética na Barra da Tijuca, horário comercial, muito profissional e detalhista",
    ],
    workflow: [
        "Quando cliente pedir no WhatsApp, salvar pedido no banco e avisar a cozinha em tempo real",
        "Agendar consulta via WhatsApp, verificar Google Calendar e confirmar via mensagem automática",
        "Enviar postagem diária de promoções no WhatsApp Status com imagem gerada pela IA",
    ],
};

export function StudioChat({ messages, isLoading, onSendMessage, activeMode, onModeChange }: StudioChatProps) {
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;
        onSendMessage(trimmed, activeMode);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Seletor de Modo */}
            <div className="p-4 border-b flex gap-2">
                <Button
                    size="sm"
                    variant={activeMode === "tenant" ? "default" : "outline"}
                    onClick={() => onModeChange("tenant")}
                    className="gap-2"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Gerar Empresa
                </Button>
                <Button
                    size="sm"
                    variant={activeMode === "workflow" ? "default" : "outline"}
                    onClick={() => onModeChange("workflow")}
                    className="gap-2"
                >
                    <Bot className="w-3.5 h-3.5" />
                    Gerar Workflow N8N
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 text-center px-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">
                                {activeMode === "tenant" ? "Gerar Perfil de Empresa" : "Gerar Automação N8N"}
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                {activeMode === "tenant"
                                    ? "Descreva a empresa em linguagem natural e a IA monta o perfil operacional completo."
                                    : "Descreva o fluxo que você quer automatizar e a IA cria o workflow pronto para importar no N8N."}
                            </p>
                        </div>
                        <div className="w-full space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">Sugestões:</p>
                            {SUGGESTIONS[activeMode].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s)}
                                    className="w-full text-left text-xs p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                            <AvatarFallback className={msg.role === "user" ? "bg-secondary" : "bg-primary/20 text-primary"}>
                                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                : "bg-card border rounded-tl-sm"
                            }`}>
                            {msg.content}
                            <div className="text-[10px] opacity-60 mt-1">
                                {msg.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-4 h-4" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-card border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">IA gerando...</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
                <div className="flex gap-2 items-end">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder={activeMode === "tenant" ? "Descreva a empresa..." : "Descreva a automação..."}
                        className="resize-none min-h-[60px] max-h-[120px] bg-muted/50 border-transparent focus-visible:ring-1"
                        rows={2}
                    />
                    <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()} className="h-10 w-10 shrink-0">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    Enter para enviar · Shift+Enter para nova linha · Modo: <strong>{activeMode === "tenant" ? "Empresa" : "Workflow N8N"}</strong>
                </p>
            </div>
        </div>
    );
}
