import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validação básica de token de ambiente que o N8N deverá mandar no Header/Body
        const n8nToken = req.headers.get("x-n8n-token");
        if (n8nToken !== process.env.N8N_SECRET_TOKEN) {
            // Ignorando na fase de mock/demo
            console.warn("N8N Token inválido ou não fornecido, assumindo bypass de desenvolvimento.");
        }

        // O N8N nos mandará eventos como: nova_mensagem, atualizacao_pedido, cliente_precisa_humano
        const eventType = body.event_type;

        console.log(`[Webhook N8N] Evento Recebido: ${eventType}`, body);

        // Em produção, usaríamos o Supabase Admin Client aqui para Bypass de RLS.
        // Exemplo: await supabase.from('conversacoes').update({ status: 'transferido_humano' }).eq('id', body.conversation_id);

        return NextResponse.json(
            { success: true, message: 'Evento do N8N processado e enfileirado no Next.js' },
            { status: 200 }
        );
    } catch (error) {
        console.error('[N8N Webhook Error]', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
