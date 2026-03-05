import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Você é um especialista em criar perfis operacionais completos para empresas que usam atendimento automatizado via WhatsApp com N8N.

Quando receber uma descrição de empresa, retorne SOMENTE um JSON válido (sem markdown, sem explicações) com esta estrutura exata:
{
  "owner": {
    "nome": "Nome do Responsável (infira ou use placeholder)",
    "email": "email@empresa.com",
    "telefone": "Telefone (use placeholder se não informado)"
  },
  "company": {
    "nome_empresa": "Nome da Empresa",
    "cnpj": "",
    "telefone": "Telefone do negócio",
    "email": "",
    "descricao": "Descrição curta e direta do negócio",
    "cidade": "Cidade",
    "estado": "UF"
  },
  "modules": {
    "nicho_principal": "pizzaria|hamburgueria|hostel|servicos|acai|outros",
    "modulos_ativos": ["delivery", "agendamento", "cardapio", "reservas", "postagens_status"]
  },
  "hours": {
    "dias_ativos": ["seg","ter","qua","qui","sex","sab","dom"],
    "horario_abertura": "HH:MM",
    "horario_fechamento": "HH:MM"
  },
  "agent": {
    "tom_voz": "tom de voz descrito",
    "objetivo": "Objetivo principal do agente de IA",
    "mensagem_inicial": "Mensagem de saudação personalizada",
    "regras_escalonamento": "Quando e como escalar para humano"
  },
  "automation": {
    "automacao_ativa": true,
    "agendamento_ativo": true,
    "postagens_status_ativas": false
  },
  "summary": "Resumo executivo em 2 linhas do perfil gerado"
}

Adapte os valores baseado na descrição. Seja específico e profissional.`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || prompt.trim().length < 5) {
            return NextResponse.json({ error: 'Prompt muito curto.' }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            // Modo demo sem API Key — retorna dados mockados
            const mockTenant = {
                owner: { nome: "Roberto Proprietário", email: "dono@empresa.com", telefone: "(11) 99999-0000" },
                company: {
                    nome_empresa: prompt.includes("pizza") ? "Pizzaria da Praça" : prompt.includes("hostel") ? "Hostel Viajantes" : "Empresa do Prompt",
                    cnpj: "", telefone: "(11) 3321-5566", email: "contato@empresa.com",
                    descricao: `Negócio gerado automaticamente a partir do prompt: "${prompt}"`,
                    cidade: "São Paulo", estado: "SP"
                },
                modules: { nicho_principal: "servicos", modulos_ativos: ["agendamento", "postagens_status"] },
                hours: { dias_ativos: ["seg", "ter", "qua", "qui", "sex"], horario_abertura: "09:00", horario_fechamento: "18:00" },
                agent: {
                    tom_voz: "Profissional e prestativo",
                    objetivo: "Atender clientes com excelência e converter consultas em vendas.",
                    mensagem_inicial: "Olá! Seja bem-vindo(a)! Como posso te ajudar hoje? 😊",
                    regras_escalonamento: "Se cliente reclamar 3x em sequência, escalar para humano."
                },
                automation: { automacao_ativa: true, agendamento_ativo: true, postagens_status_ativas: false },
                summary: `Perfil demo gerado para: "${prompt}". Configure a OPENAI_API_KEY no .env.local para geração real.`
            };
            return NextResponse.json({ tenant: mockTenant, generated_by: "demo_mock" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Empresa: ${prompt}` }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error("Sem resposta da IA.");

        const tenant = JSON.parse(content);
        return NextResponse.json({ tenant, generated_by: "openai_gpt4o_mini" });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('[generate-tenant]', error);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
