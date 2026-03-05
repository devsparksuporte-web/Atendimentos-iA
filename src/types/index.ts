export type Role = 'superadmin' | 'admin' | 'operador';
export type IntegrationType = 'whatsapp' | 'n8n' | 'calendar' | 'google_drive';
export type ConversationStatus = 'aberto' | 'fechado' | 'transferido_humano';
export type MessageSenderType = 'cliente' | 'bot' | 'humano';
export type MessageType = 'texto' | 'audio' | 'imagem' | 'localizacao';
export type OrderStatus = 'pendente' | 'preparando' | 'saiu_entrega' | 'concluido' | 'cancelado';
export type DeliveryType = 'delivery' | 'retirada' | 'mesa';
export type BookingStatus = 'pendente' | 'confirmada' | 'cancelada' | 'concluida';
export type AppointmentStatus = 'agendado' | 'concluido' | 'falta' | 'cancelado';
export type CampaignStatus = 'rascunho' | 'agendada' | 'enviando' | 'concluida';

export interface User {
    id: string;
    auth_id?: string;
    nome: string;
    email: string;
    telefone?: string;
    documento?: string;
    role: Role;
    ativo: boolean;
    created_at: string;
}

export interface Company {
    id: string;
    nome_empresa: string;
    cnpj?: string;
    responsavel?: string;
    telefone?: string;
    email?: string;
    descricao?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    nicho_principal?: string;
    logo_url?: string;
    ativo: boolean;
}

export interface Module {
    id: string;
    nome: string;
    descricao?: string;
    ativo: boolean;
}

export interface CompanyModule {
    empresa_id: string;
    modulo_id: string;
    configuracao_jsonb: Record<string, any>;
}

export interface CompanyWithModules extends Company {
    modulos_ativos: Module[];
}

export interface Customer {
    id: string;
    empresa_id: string;
    telefone: string;
    nome?: string;
    tags: string[];
    preferencias: Record<string, any>;
    origem: string;
    created_at: string;
}

export interface Conversation {
    id: string;
    empresa_id: string;
    cliente_id: string;
    status: ConversationStatus;
    operador_id?: string;
    resumo_ia?: string;
    started_at: string;
    ended_at?: string;
}

export interface Message {
    id: string;
    conversa_id: string;
    remetente_tipo: MessageSenderType;
    remetente_id?: string;
    tipo_mensagem: MessageType;
    conteudo?: string;
    midia_url?: string;
    transcricao_audio?: string;
    intent_ia?: string;
    timestamp: string;
}

export interface OperationalProfile {
    empresa_id: string;
    tom_voz: string;
    objetivo_principal?: string;
    mensagem_saudacao?: string;
    mensagem_despedida?: string;
    regras_escalonamento_humano?: string;
    perguntas_obrigatorias: string[];
    palavras_chave: string[];
    limitacoes_ia?: string;
    dados_extras: Record<string, any>;
}

export interface Order {
    id: string;
    empresa_id: string;
    cliente_id: string;
    status: OrderStatus;
    tipo_entrega: DeliveryType;
    subtotal: number;
    taxa_entrega: number;
    total: number;
    created_at: string;
}

export interface Product {
    id: string;
    empresa_id: string;
    nome: string;
    descricao?: string;
    preco_base: number;
    disponivel: boolean;
    dados_extras: Record<string, any>;
}

export interface Service {
    id: string;
    empresa_id: string;
    nome: string;
    duracao_minutos: number;
    preco: number;
}
