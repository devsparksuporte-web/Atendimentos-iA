import { z } from "zod";

export const ownerSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    telefone: z.string().min(10, "Telefone inválido."),
    email: z.string().email("E-mail inválido."),
    documento: z.string().optional(),
    observacoes: z.string().optional(),
});

export const companyDataSchema = z.object({
    nome_empresa: z.string().min(2, "Nome da empresa obrigatório."),
    cnpj: z.string().optional(),
    telefone: z.string().min(10, "Telefone da empresa inválido."),
    email: z.string().email("E-mail inválido.").optional().or(z.literal('')),
    descricao: z.string().optional(),
    cep: z.string().optional(),
    endereco: z.string().optional(),
    cidade: z.string().min(2, "Cidade obrigatória."),
    estado: z.string().length(2, "UF deve ter 2 caracteres."),
});

export const modulesSchema = z.object({
    nicho_principal: z.string().min(1, "Selecione o nicho principal da empresa."),
    modulos_ativos: z.array(z.string()).min(1, "Selecione pelo menos 1 módulo."),
});

export const regionSchema = z.object({
    bairros_atendidos: z.array(z.string()).optional(),
    raio_atuacao_km: z.number().optional(),
    prioridades: z.string().optional()
});

export const hoursSchema = z.object({
    dias_ativos: z.array(z.string()).min(1, "Selecione ao menos um dia."),
    horario_abertura: z.string(),
    horario_fechamento: z.string(),
});

export const agentRulesSchema = z.object({
    tom_voz: z.string().min(2, "Descreva o tom de voz do bot."),
    objetivo: z.string().min(5, "Qual o objetivo principal desta IA?"),
    mensagem_inicial: z.string().optional(),
    regras_escalonamento: z.string().optional(),
});

export const integrationsSchema = z.object({
    whatsapp_number: z.string().optional(),
    n8n_webhook_url: z.string().url("URL inválida").optional().or(z.literal('')),
    google_calendar_id: z.string().optional(),
});

export const automationSchema = z.object({
    automacao_ativa: z.boolean().default(true),
    agendamento_ativo: z.boolean().default(false),
    postagens_status_ativas: z.boolean().default(false),
});

// Full Wizard
export const wizardSchema = z.object({
    owner: ownerSchema,
    company: companyDataSchema,
    modules: modulesSchema,
    regions: regionSchema,
    hours: hoursSchema,
    agent: agentRulesSchema,
    integrations: integrationsSchema,
    automation: automationSchema,
});

export type WizardFormData = z.infer<typeof wizardSchema>;
