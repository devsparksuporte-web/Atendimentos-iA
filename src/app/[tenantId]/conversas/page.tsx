"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, FileCode, CheckCircle2, UserCircle2, Mic, Bot } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mocking Realtime Supabase Data
const mockChats = [
    { id: 1, name: "Carlos Eduardo", lastMsg: "Queria ver o cardápio.", time: "10:42", unread: 2, status: "bot" },
    { id: 2, name: "Ana P.", lastMsg: "Ok, vou querer a de Calabresa.", time: "10:15", unread: 0, status: "humano" },
    { id: 3, name: "Márcio Silva", lastMsg: "Anotado! (Resumo IA: Cancelou o pedido)", time: "09:30", unread: 0, status: "bot" }
];

export default function TenantInboxPage() {
    const [activeChat, setActiveChat] = useState<number | null>(1);
    const [controlStatus, setControlStatus] = useState<"bot" | "humano">("bot");

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">

            {/* Coluna 1: Lista de Contatos/Conversas */}
            <div className="w-80 border-r bg-background flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg mb-4">Caixa de Entrada</h2>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Buscar cliente..." className="pl-8 bg-muted/50" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    {mockChats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => { setActiveChat(chat.id); setControlStatus(chat.status as "bot" | "humano") }}
                            className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors flex gap-3 ${activeChat === chat.id ? 'bg-primary/5' : ''}`}
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/20 text-primary">{chat.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium truncate">{chat.name}</span>
                                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-muted-foreground truncate pr-2">{chat.lastMsg}</p>
                                    {chat.unread > 0 && (
                                        <span className="h-5 w-5 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Coluna 2: Meio / Chat em Direto */}
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950/50 relative">
                {/* Header do Chat */}
                <div className="h-16 border-b bg-background flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>CE</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-sm">Carlos Eduardo</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                +55 11 98888-7777 <CheckCircle2 className="w-3 h-3 text-green-500" />
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {controlStatus === "bot" ? (
                            <Button variant="outline" size="sm" onClick={() => setControlStatus("humano")} className="text-primary border-primary/50">
                                <Bot className="w-4 h-4 mr-2" />
                                IA no Controle. Assumir?
                            </Button>
                        ) : (
                            <Button variant="destructive" size="sm" onClick={() => setControlStatus("bot")}>
                                <UserCircle2 className="w-4 h-4 mr-2" />
                                Você está no controle. Desativar?
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mensagens Balões */}
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Hoje</span>
                        </div>

                        <div className="flex gap-2 max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-auto shrink-0"><AvatarFallback>CE</AvatarFallback></Avatar>
                            <div className="bg-card border rounded-2xl rounded-bl-sm px-4 py-2 text-sm shadow-sm">
                                Olá, boa tarde! Gostaria de ver o cardápio de vocês.
                                <span className="block text-[10px] text-muted-foreground mt-1 text-right">10:40</span>
                            </div>
                        </div>

                        <div className="flex gap-2 max-w-[80%] ml-auto justify-end">
                            <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 text-sm shadow-sm relative">
                                <span className="absolute -left-6 top-1/2 -translate-y-1/2"><Bot className="w-4 h-4 text-muted-foreground" /></span>
                                Olá Carlos! Boa tarde. 🍕 Sou o assistente virtual da casa.
                                Aqui está o nosso cardápio digital: [Link do Cardápio].
                                <br /><br />Posso te ajudar a montar o seu pedido agora mesmo? Temos uma promoção ótima hoje!
                                <span className="block text-[10px] text-primary-foreground/70 mt-1 text-right">10:41</span>
                            </div>
                        </div>

                        <div className="flex gap-2 max-w-[80%]">
                            <Avatar className="h-8 w-8 mt-auto shrink-0"><AvatarFallback>CE</AvatarFallback></Avatar>
                            <div className="bg-card border rounded-2xl rounded-bl-sm px-4 py-2 text-sm shadow-sm">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Mic className="w-4 h-4" /> <span className="text-xs">Áudio transcrito pela IA</span>
                                </div>
                                <p className="italic text-muted-foreground border-l-2 border-primary pl-2 mb-2">
                                    "Hum, entendi... cara me vê então aquela pizza meia calabresa, meia portuguesa tamanho família."
                                </p>
                                <span className="block text-[10px] text-muted-foreground mt-1 text-right">10:42</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Input Bar */}
                <div className="p-4 bg-background border-t">
                    {controlStatus === "bot" ? (
                        <div className="h-10 w-full flex items-center justify-center bg-muted/50 rounded-md border text-sm text-muted-foreground">
                            A Inteligência Artificial está respondendo no momento. Assuma o controle para digitar.
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground"><FileCode className="w-5 h-5" /></Button>
                            <Input placeholder="Digite uma mensagem para o cliente..." className="flex-1 bg-muted/50 border-transparent focus-visible:ring-1" />
                            <Button size="icon" className="shrink-0"><Send className="w-4 h-4" /></Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Coluna 3: CRM / Resumo Contexto IA do Cliente */}
            <div className="w-72 border-l bg-background p-6 hidden lg:block overflow-y-auto">
                <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                        <AvatarFallback className="text-2xl">CE</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">Carlos Eduardo</h3>
                    <p className="text-sm text-muted-foreground">Cliente Frequente</p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Análise da IA Atual</h4>
                        <div className="bg-primary/5 p-3 rounded-md border text-sm text-primary">
                            <strong>Intenção:</strong> Fazer Pedido<br />
                            <strong>Humor:</strong> Neutro/Direto<br />
                            <strong>Resumo:</strong> Solicitou cardápio e enviou áudio pedindo uma Pizza Família (Meia Calabresa/Meia Portuguesa).
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Informações Básicas</h4>
                        <div className="text-sm space-y-2">
                            <p><span className="text-muted-foreground">Telefone:</span> <br />+55 11 98888-7777</p>
                            <p><span className="text-muted-foreground">Endereço (Último):</span> <br />Rua das Flores, 123 - Centro</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Hitórico (Tags)</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-secondary text-xs rounded-md">Vip</span>
                            <span className="px-2 py-1 bg-secondary text-xs rounded-md">Sem Cebola</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
