import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Você é um especialista em N8N (plataforma de automação de workflows) e WhatsApp Business.
Quando receber uma descrição de automação, retorne SOMENTE um JSON válido (sem markdown, sem explicações) com esta estrutura N8N:

{
  "name": "Nome do Workflow",
  "description": "O que este workflow faz",
  "trigger": "webhook|schedule|manual|whatsapp_message",
  "nodes": [
    {
      "id": "1",
      "name": "Nome do nó",
      "type": "n8n-nodes-base.webhook|httpRequest|openAi|if|set|whatsapp|supabase|googleCalendar|sendEmail",
      "description": "O que este nó faz",
      "config": {}
    }
  ],
  "connections": [
    { "from": "1", "to": "2" }
  ],
  "use_cases": ["caso de uso 1", "caso de uso 2"],
  "estimated_triggers_per_day": 0,
  "n8n_import_json": {
    "name": "Nome do Workflow",
    "nodes": [],
    "connections": {},
    "settings": { "executionOrder": "v1" }
  }
}

Seja específico e técnico. O n8n_import_json deve ser um JSON N8N válido e importável.
Foque em automações para WhatsApp, agendamentos, notificações, CRM e e-commerce.`;

// Mock de workflow para modo demo
function generateMockWorkflow(prompt: string) {
    const isDelivery = prompt.toLowerCase().includes('pedido') || prompt.toLowerCase().includes('pizza') || prompt.toLowerCase().includes('delivery');
    const isAgenda = prompt.toLowerCase().includes('agenda') || prompt.toLowerCase().includes('reserva') || prompt.toLowerCase().includes('consulta');

    if (isDelivery) {
        return {
            name: "Fluxo de Pedido via WhatsApp",
            description: "Recebe pedido pelo WhatsApp, salva no banco e notifica a cozinha",
            trigger: "whatsapp_message",
            nodes: [
                { id: "1", name: "WhatsApp Trigger", type: "webhook", description: "Captura mensagem recebida do WhatsApp via Evolution API", config: {} },
                { id: "2", name: "Analisar Intenção (IA)", type: "openAi", description: "GPT-4o analisa se é um pedido, cardápio ou outra intenção", config: {} },
                { id: "3", name: "Salvar Pedido", type: "supabase", description: "Insere pedido na tabela `pedidos` com status `pendente`", config: {} },
                { id: "4", name: "Notificar Cozinha", type: "sendEmail", description: "Envia e-mail/WhatsApp para a cozinha com os detalhes", config: {} },
                { id: "5", name: "Confirmar para Cliente", type: "whatsapp", description: "Manda confirmação automática com previsão de entrega", config: {} },
            ],
            connections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }, { from: "3", to: "5" }],
            use_cases: ["Pizzaria", "Hamburgueria", "Açaí", "Qualquer delivery"],
            estimated_triggers_per_day: 80,
        };
    }

    if (isAgenda) {
        return {
            name: "Fluxo de Agendamento Automático",
            description: "Reserva horários via WhatsApp e sincroniza com Google Calendar",
            trigger: "whatsapp_message",
            nodes: [
                { id: "1", name: "WhatsApp Trigger", type: "webhook", description: "Captura mensagem de pedido de agendamento", config: {} },
                { id: "2", name: "Verificar Disponibilidade", type: "googleCalendar", description: "Consulta se o horário solicitado está livre", config: {} },
                { id: "3", name: "Confirmar ou Sugerir", type: "if", description: "Se disponível, confirma. Senão, sugere outros horários.", config: {} },
                { id: "4", name: "Criar Evento", type: "googleCalendar", description: "Cria o evento e convida o cliente", config: {} },
                { id: "5", name: "Lembrete 24h antes", type: "schedule", description: "Dispara lembrete 24h antes do compromisso", config: {} },
            ],
            connections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }, { from: "4", to: "5" }],
            use_cases: ["Clínicas", "Salões de Beleza", "Hostel", "Serviços"],
            estimated_triggers_per_day: 30,
        };
    }

    return {
        name: `Automação: ${prompt.substring(0, 50)}`,
        description: `Workflow gerado para: "${prompt}"`,
        trigger: "webhook",
        nodes: [
            { id: "1", name: "Trigger Entrada", type: "webhook", description: "Ponto de entrada do fluxo via webhook", config: {} },
            { id: "2", name: "Processar com IA", type: "openAi", description: "Analisa e classifica o conteúdo recebido", config: {} },
            { id: "3", name: "Executar Ação", type: "httpRequest", description: "Chama o sistema destino com os dados processados", config: {} },
            { id: "4", name: "Responder via WhatsApp", type: "whatsapp", description: "Envia resposta automática ao usuário", config: {} },
        ],
        connections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }],
        use_cases: ["Automação genérica", "Integração de sistemas"],
        estimated_triggers_per_day: 50,
    };
}

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || prompt.trim().length < 5) {
            return NextResponse.json({ error: 'Descreva melhor a automação.' }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            const workflow = generateMockWorkflow(prompt);
            return NextResponse.json({ workflow, generated_by: "demo_mock" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Crie um workflow N8N para: ${prompt}` }
            ],
            temperature: 0.6,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error("Sem resposta da IA.");

        const workflow = JSON.parse(content);
        return NextResponse.json({ workflow, generated_by: "openai_gpt4o_mini" });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('[generate-workflow]', error);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
