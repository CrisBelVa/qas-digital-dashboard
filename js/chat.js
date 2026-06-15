(function () {
  'use strict';

  /* ── MODULE DETECTION ──────────────────────────────────────────── */
  const page = (location.pathname.split('/').pop() || '').replace('.html', '') || 'dashboard';
  const userInitial = document.querySelector('.user-info .name')?.textContent?.trim()?.charAt(0) || 'U';

  /* ── MODULE CONFIG ──────────────────────────────────────────────── */
  const MODULES = {

    qualidade: {
      title: 'Assistente de Qualidade',
      subtitle: 'ISO 9001 · SGQ',
      greeting: 'Olá! Sou o Assistente de Qualidade do <strong>QAS-Digital</strong>. Posso ajudá-lo a interpretar os dados ISO 9001 apresentados neste painel.\n\nSobre o que gostaria de saber mais?',
      suggestions: ['Satisfação de clientes', 'Não conformidades', 'Ações corretivas', 'Eficácia do SGQ'],
      responses: [
        { match: ['satisfacao', 'cliente', 'clientes', 'nps', 'indice'],
          text: 'A **satisfação de clientes** em 2024 está em **94,2%**, superando a meta de 90% em 4,2 p.p.\n\nO valor mais alto foi em agosto (95,2%). O desempenho foi consistentemente acima do objetivo ao longo de todo o ano, sem nenhum mês abaixo da meta.' },
        { match: ['nao conformidade', 'nc', 'conformidades', 'conformidade'],
          text: 'Existem atualmente **7 não conformidades abertas**. Das 35 NC registadas em 2024:\n\n• **20 fechadas** (57%)\n• **8 em análise** (23%)\n• **7 abertas** (20%)\n\nA categoria com mais ocorrências é **Processo** com 12 NC, seguida de Produto/Serviço com 8.' },
        { match: ['acao corretiva', 'acoes corretivas', 'capa', 'corretiva', 'preventiva'],
          text: 'Estão em curso **5 ações corretivas (CAPA)**. Das 12 abertas em 2024, 7 foram concluídas com sucesso.\n\nA ação **CAP-2024-008** está marcada como "Em Risco" por proximidade do prazo. Nenhuma ação está formalmente em atraso.\n\nO departamento de Manutenção tem a taxa mais baixa de conclusão (0/2 ações).' },
        { match: ['processo', 'processos', 'mapa'],
          text: 'O mapa de processos ISO 9001 inclui **9 processos certificados**:\n\n• **6 Conformes**: P.01, P.02, P.04, P.05, P.07\n• **2 Em Progresso**: P.03 (Gestão de Riscos) e P.09 (Auditorias Internas)\n• **2 Em Atenção**: P.06 (Fornecedores) e P.08 (Tratamento NC)' },
        { match: ['auditoria', 'auditorias'],
          text: 'Em 2024 foram realizadas **3 auditorias internas**:\n\n• **Q1 (Fev)**: 18 conformidades · 3 NC · 5 obs.\n• **Q2 (Jun)**: 21 conformidades · 2 NC · 4 obs. ← melhor trimestre\n• **Q3 (Out)**: 19 conformidades · 2 NC · 6 obs.\n\nA auditoria Q4 está planeada mas ainda não realizada.' },
        { match: ['fornecedor', 'fornecedores', 'compras'],
          text: 'A conformidade de fornecedores está em **98,6%**, acima da meta de 95%.\n\nO processo P.06 — Gestão de Fornecedores está em "Atenção" devido à NC-2024-031 (atraso de entrega, prioridade Média, departamento Compras).' },
        { match: ['eficacia', 'sgq', 'sistema', 'eficiencia'],
          text: 'A eficácia global do SGQ é de **97,3%**, com todos os 9 processos certificados dentro dos parâmetros.\n\nOs objetivos da qualidade estão alinhados com os resultados da última revisão pela gestão. A meta interna é ≥ 95%.' },
        { match: ['iso', 'certificacao', 'certificado', 'norma', '9001'],
          text: 'A organização detém a certificação **ISO 9001:2015**, com revisão do sistema concluída em 2024.\n\nO certificado está ativo e o SGQ encontra-se em plena conformidade. A próxima auditoria de renovação está prevista para 2026.' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Satisfação de clientes** e tendência mensal\n• **Não conformidades** — estado e categorias\n• **Ações corretivas** (CAPA) por departamento\n• **Mapa de processos** ISO 9001\n• **Auditorias internas** e resultados\n• **Indicadores de desempenho** do SGQ\n\nPode reformular a questão?' }
      ]
    },

    dashboard: {
      title: 'Assistente SST',
      subtitle: 'Segurança e Saúde no Trabalho',
      greeting: 'Olá! Sou o Assistente SST do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os indicadores do Relatório Anual de Segurança e Saúde no Trabalho 2024.',
      suggestions: ['Acidentes de trabalho', 'Exames de saúde', 'Formação SST', 'Riscos identificados'],
      responses: [
        { match: ['acidente', 'acidentes', 'sinistro', 'incidente'],
          text: 'Em 2024 registaram-se **2 acidentes de trabalho**, ambos sem baixa (< 1 dia).\n\n• **0 dias perdidos**\n• **0 acidentes mortais**\n• **0 doenças profissionais**\n• Taxa de incidência: **22,99‰**\n\nAmbos os acidentes envolveram trabalhadores do sexo masculino.' },
        { match: ['exame', 'exames', 'medico', 'saude', 'vigilancia'],
          text: 'Foram realizados **83 exames de saúde** em 2024:\n\n• **Admissão**: 31 (19 mulheres + 12 homens)\n• **Periódicos**: 46 (24 mulheres + 22 homens)\n• **Ocasionais**: 6 (3 + 3)\n\nForam ainda realizados **1.137 exames complementares** (oftalmológicos, hemogramas, Rx Tórax e outros).' },
        { match: ['formacao', 'treino', 'ergonomia'],
          text: 'A formação SST 2024 (tema: **Ergonomia**) atingiu **99% de cobertura** — 86 dos 87 trabalhadores participaram.\n\n• **46 mulheres** participantes\n• **40 homens** participantes\n• **1 sessão** realizada com 86 destinatários' },
        { match: ['vacinacao', 'vacina', 'gripe', 'inoculacao'],
          text: 'A campanha de vacinação contra a gripe atingiu **31% de cobertura** — 27 dos 87 trabalhadores inoculados:\n\n• **16 mulheres** (30,8%)\n• **11 homens** (31,4%)' },
        { match: ['trabalhador', 'colaborador', 'genero', 'equipa'],
          text: 'A força de trabalho em 2024 é de **87 trabalhadores**:\n\n• **70 Homens** (80,5%)\n• **17 Mulheres** (19,5%)\n\nA maioria situa-se no escalão etário **20-49 anos**.' },
        { match: ['horas', 'hora', 'trabalhadas'],
          text: 'As horas trabalhadas em 2024 totalizam **166.195 horas**, referentes ao ano de referência completo para os 87 trabalhadores.' },
        { match: ['risco', 'riscos', 'quimico', 'fisico'],
          text: 'Riscos avaliados em 2024:\n\n• **Físico**: Não identificado\n• **Químico (H312)**: ⚠ Controlado — 87 expostos, 1 avaliação\n• **Biológico**: Não identificado\n• **Músculo-esquelético**: Não identificado\n• **Psicossocial**: Não identificado\n\nMedidas: manuseamento seguro de agentes, EPI e outras medidas preventivas.' },
        { match: ['taxa', 'incidencia', 'indicador'],
          text: 'Indicadores de sinistralidade 2024:\n\n• **Taxa de Incidência**: 22,99‰\n• **Taxa de Gravidade**: 0,00\n• **Taxa de Mortalidade**: 0,00\n\nCalculados sobre 166.195 horas trabalhadas e 87 trabalhadores.' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Acidentes** de trabalho e indicadores\n• **Exames de saúde** (tipos e cobertura)\n• **Formação SST** e taxa de cobertura\n• **Riscos** identificados e medidas\n• **Vacinação** e saúde preventiva\n• **Força de trabalho** e distribuição\n\nPode reformular a questão?' }
      ]
    },

    ambiente: {
      title: 'Assistente Ambiente',
      subtitle: 'Gestão Ambiental · ISO 14001',
      greeting: 'Olá! Sou o Assistente de Ambiente do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os indicadores ambientais apresentados neste painel.',
      suggestions: ['Consumo de energia', 'Emissões de CO₂', 'Gestão de resíduos', 'Consumo de água'],
      responses: [
        { match: ['energia', 'eletrica', 'eletricidade', 'kwh', 'consumo energetico'],
          text: 'O **consumo de energia** é monitorizado mensalmente e apresentado no painel de Ambiente. Os indicadores incluem consumo total (kWh), intensidade energética e progresso face às metas de eficiência 2024.' },
        { match: ['emissao', 'emissoes', 'co2', 'carbono', 'gases', 'ghg', 'tco2'],
          text: 'As **emissões de GEE** são monitorizadas por âmbito (Scope 1, 2 e 3). O painel apresenta a evolução mensal das emissões de CO₂ equivalente e o progresso face à meta de redução anual.' },
        { match: ['residuo', 'residuos', 'reciclagem', 'valorizacao'],
          text: 'A **gestão de resíduos** contempla resíduos perigosos, não perigosos e recicláveis. O painel apresenta a produção total de resíduos, taxa de valorização e evolução face ao período homólogo.' },
        { match: ['agua', 'hidrico', 'consumo de agua', 'm3'],
          text: 'O **consumo de água** é um indicador ambiental chave acompanhado mensalmente. O painel apresenta o consumo em m³, a intensidade hídrica e o progresso face à meta de redução definida.' },
        { match: ['indicador', 'kpi', 'desempenho', 'meta'],
          text: 'Os **indicadores ambientais** principais monitorados incluem:\n\n• Consumo energético (kWh)\n• Emissões de CO₂ (tCO₂e)\n• Consumo de água (m³)\n• Produção de resíduos (ton)\n• Taxas de valorização e reciclagem\n\nTodos comparados face às metas anuais e ao período homólogo.' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre os indicadores ambientais deste painel:\n\n• **Energia** — consumo e eficiência\n• **Emissões** — CO₂ e GEE por scope\n• **Água** — consumo hídrico\n• **Resíduos** — produção e valorização\n• **Metas** ambientais 2024\n\nPode reformular a questão?' }
      ]
    },

    colaboradores: {
      title: 'Assistente de Colaboradores',
      subtitle: 'Gestão de RH · ISO 45001',
      greeting: 'Olá! Sou o Assistente de Colaboradores do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os dados de gestão de recursos humanos e formação.',
      suggestions: ['Estado da formação', 'Distribuição por género', 'Exames pendentes', 'Colaboradores em atraso'],
      responses: [
        { match: ['formacao', 'treino', 'concluido', 'progresso', 'atraso'],
          text: 'O estado da formação OHSM dos **87 colaboradores** em 2024:\n\n• **31 Concluídos** (35,6%) ✓\n• **40 Em Progresso** (46,0%)\n• **16 Em Atraso** (18,4%) ⚠\n\nA meta é atingir 100% de cobertura até ao final do período.' },
        { match: ['colaborador', 'trabalhador', 'genero', 'equipa', 'distribuicao'],
          text: 'O quadro de pessoal é composto por **87 colaboradores**:\n\n• **70 Homens** (80,5%)\n• **17 Mulheres** (19,5%)\n\nDistribuição etária: maioria no escalão **20-49 anos**.' },
        { match: ['exame', 'saude', 'medico'],
          text: 'Foram realizados **83 exames de saúde** em 2024, entre exames de admissão, periódicos e ocasionais. Para o detalhe completo, consulte o módulo de Exames de Saúde.' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Estado de formação** dos colaboradores\n• **Distribuição** por género e faixa etária\n• **Exames de saúde** realizados\n• **Colaboradores em atraso** na formação\n\nPode reformular a questão?' }
      ]
    },

    exames: {
      title: 'Assistente de Saúde',
      subtitle: 'Saúde Ocupacional · Vigilância',
      greeting: 'Olá! Sou o Assistente de Saúde Ocupacional do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os dados de vigilância da saúde e exames médicos em 2024.',
      suggestions: ['Exames por tipo', 'Exames complementares', 'Cobertura de vacinação', 'Total de exames'],
      responses: [
        { match: ['admissao', 'periodico', 'ocasional', 'tipo'],
          text: 'Os **83 exames de saúde** em 2024 distribuem-se por:\n\n• **Admissão**: 31 (19 mulheres + 12 homens)\n• **Periódicos**: 46 (24 mulheres + 22 homens)\n• **Ocasionais**: 6 (3 mulheres + 3 homens)' },
        { match: ['complementar', 'oftalmologico', 'hemograma', 'rx', 'torax'],
          text: 'Foram realizados **1.137 exames complementares** em 2024:\n\n• **Outros**: 959 (84,3%)\n• **Oftalmológico**: 78 (6,9%)\n• **Hemograma**: 71 (6,2%)\n• **Rx Tórax**: 29 (2,6%)' },
        { match: ['vacinacao', 'vacina', 'gripe', 'cobertura'],
          text: 'A vacinação contra a gripe atingiu **31% de cobertura**:\n\n• **27 dos 87** trabalhadores inoculados\n• **16 mulheres** (30,8% das mulheres)\n• **11 homens** (31,4% dos homens)' },
        { match: ['total', 'quantos', 'realizados'],
          text: 'Em 2024 foram realizados no total:\n\n• **83 exames de saúde** (admissão, periódicos e ocasionais)\n• **1.137 exames complementares**\n• **Total acumulado: 1.220 exames**' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Exames por tipo** (admissão, periódicos, ocasionais)\n• **Exames complementares** e distribuição\n• **Cobertura de vacinação** gripal\n• **Totais e distribuição** por género\n\nPode reformular a questão?' }
      ]
    },

    acidentes: {
      title: 'Assistente de Segurança',
      subtitle: 'Acidentes e Sinistralidade · 2024',
      greeting: 'Olá! Sou o Assistente de Segurança do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os dados de acidentes de trabalho e sinistralidade de 2024.',
      suggestions: ['Acidentes em 2024', 'Taxa de incidência', 'Dias perdidos', 'Riscos identificados'],
      responses: [
        { match: ['acidente', 'acidentes', 'ocorrencia', 'sinistro', 'quantos'],
          text: 'Em 2024 registaram-se **2 acidentes de trabalho**, ambos classificados como "sem baixa":\n\n• **0 dias perdidos**\n• **0 acidentes mortais**\n• **0 doenças profissionais**\n• Ambos envolveram trabalhadores do sexo **masculino**' },
        { match: ['taxa', 'incidencia', 'indicador', 'gravidade', 'mortalidade'],
          text: 'Indicadores de sinistralidade 2024:\n\n• **Taxa de Incidência**: 22,99‰\n• **Taxa de Gravidade**: 0,00\n• **Taxa de Mortalidade**: 0,00\n\nCalculados sobre **166.195 horas trabalhadas** e **87 trabalhadores**.' },
        { match: ['dia', 'dias', 'baixa', 'perdido'],
          text: 'O total de **dias perdidos por acidentes de trabalho em 2024 foi 0**.\n\nAmbos os acidentes registados foram classificados como "sem baixa" — ausência inferior a 1 dia de trabalho.' },
        { match: ['risco', 'riscos', 'quimico', 'fisico', 'avaliacao'],
          text: 'Riscos avaliados em 2024:\n\n• **Físico**: Não identificado\n• **Químico (H312)**: ⚠ Controlado — 87 trabalhadores expostos\n• **Biológico**: Não identificado\n• **Músculo-esquelético**: Não identificado\n• **Psicossocial**: Não identificado' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Acidentes** de trabalho e classificação\n• **Taxas** de incidência e gravidade\n• **Dias perdidos** e duração de baixas\n• **Riscos** identificados e medidas preventivas\n\nPode reformular a questão?' }
      ]
    },

    formacao: {
      title: 'Assistente de Formação',
      subtitle: 'Plano de Formação SST · 2024',
      greeting: 'Olá! Sou o Assistente de Formação do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os dados do plano de formação SST e as ações de informação realizadas em 2024.',
      suggestions: ['Cobertura de formação', 'Participantes por género', 'Tema da formação', 'Ações de informação'],
      responses: [
        { match: ['cobertura', 'percentagem', 'taxa', 'total', 'quantos'],
          text: 'A formação SST de 2024 (tema: **Ergonomia**) atingiu **99% de cobertura**:\n\n• **86 dos 87** trabalhadores participaram\n• **1 sessão** realizada\n• **1 trabalhador** não participou' },
        { match: ['participante', 'participantes', 'genero', 'homens', 'mulheres'],
          text: 'Participantes na formação SST 2024:\n\n• **46 mulheres** (88,5% do total de mulheres)\n• **40 homens** (100% do total de homens)\n• **Total: 86** colaboradores' },
        { match: ['tema', 'ergonomia', 'conteudo', 'assunto'],
          text: 'O tema da formação SST de 2024 foi **Ergonomia**, abrangendo conceitos de postura, prevenção de lesões músculo-esqueléticas e boas práticas no posto de trabalho.\n\nA sessão contou com **86 participantes** e decorreu com cobertura de 99%.' },
        { match: ['informacao', 'accao', 'acoes', 'admissao', 'sensibilizacao'],
          text: 'Ações de informação realizadas em 2024:\n\n• **Admissão** (Sit. 01): 31 ações · 31 destinatários\n• **Outras situações** (Sit. 99): 1 ação · 87 destinatários\n• **Consulta SST** (Razão 02): 1 ação · 87 participantes' },
        { match: ['*'], text: 'Posso ajudá-lo com informações sobre:\n\n• **Cobertura** do plano de formação\n• **Temas** e conteúdos da formação\n• **Participantes** por género\n• **Ações de informação** e sensibilização\n\nPode reformular a questão?' }
      ]
    }
  };

  const M = MODULES[page] || {
    title: 'Assistente QAS',
    subtitle: 'Gestão Integrada',
    greeting: 'Olá! Sou o Assistente do <strong>QAS-Digital</strong>. Posso ajudá-lo a analisar os dados apresentados neste módulo.',
    suggestions: ['O que posso perguntar?'],
    responses: [{ match: ['*'], text: 'Estou aqui para o ajudar a interpretar os dados apresentados no painel. Pode fazer perguntas sobre os indicadores disponíveis.' }]
  };

  /* ── REPLY ENGINE ─────────────────────────────────────────────── */
  function norm(str) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function getReply(userInput) {
    const t = norm(userInput);
    for (const rule of M.responses) {
      if (rule.match.includes('*')) continue;
      if (rule.match.some(kw => t.includes(norm(kw)))) return rule.text;
    }
    return M.responses.find(r => r.match.includes('*'))?.text
      || 'Desculpe, não consegui responder. Pode reformular a questão?';
  }

  /* ── UTILS ────────────────────────────────────────────────────── */
  function md(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
  function esc(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── CSS ──────────────────────────────────────────────────────── */
  const css = `
    /* Trigger */
    .qas-trigger {
      position: fixed; bottom: 28px; right: 28px; z-index: 1000;
      width: 54px; height: 54px; border-radius: 50%;
      background: var(--teal, #00D4B1); color: #0B1120;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(0,212,177,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .qas-trigger:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(0,212,177,0.55); }
    .qas-trigger svg { width: 24px; height: 24px; }
    .qas-trigger::before {
      content: ''; position: absolute; inset: -5px; border-radius: 50%;
      border: 2px solid var(--teal, #00D4B1);
      animation: qasPulse 2.4s ease-out infinite; opacity: 0;
    }
    @keyframes qasPulse {
      0%  { opacity: 0.65; transform: scale(1); }
      100%{ opacity: 0;    transform: scale(1.5); }
    }

    /* Panel */
    .qas-panel {
      position: fixed; top: 0; right: 0; width: 380px; height: 100vh;
      background: var(--navy-mid, #0F1729);
      border-left: 1px solid var(--border, rgba(255,255,255,0.07));
      display: flex; flex-direction: column; z-index: 999;
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
      box-shadow: -12px 0 48px rgba(0,0,0,0.3);
    }
    .qas-panel.qas-open { transform: translateX(0); }

    /* Header */
    .qas-head {
      padding: 18px 20px;
      border-bottom: 1px solid var(--border, rgba(255,255,255,0.07));
      display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    .qas-head-icon {
      width: 40px; height: 40px; border-radius: 12px;
      background: var(--teal-subtle, rgba(0,212,177,0.08));
      border: 1px solid rgba(0,212,177,0.2);
      display: flex; align-items: center; justify-content: center;
      color: var(--teal, #00D4B1); flex-shrink: 0;
    }
    .qas-head-icon svg { width: 20px; height: 20px; }
    .qas-head-info { flex: 1; min-width: 0; }
    .qas-head-name {
      font-family: var(--font-head, 'Bricolage Grotesque', sans-serif);
      font-size: 14px; font-weight: 700;
      color: var(--white, #F0F4FF);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .qas-head-sub { font-size: 11px; color: var(--muted, #8892A4); margin-top: 2px; }
    .qas-online {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--teal, #00D4B1);
      box-shadow: 0 0 6px rgba(0,212,177,0.6);
      flex-shrink: 0;
    }
    .qas-close {
      background: none; border: none; cursor: pointer;
      color: var(--muted, #8892A4);
      display: flex; align-items: center; justify-content: center;
      padding: 6px; border-radius: 8px;
      transition: color 0.2s, background 0.2s; flex-shrink: 0;
    }
    .qas-close:hover { color: var(--white, #F0F4FF); background: var(--navy-light, #1A2440); }
    .qas-close svg { width: 16px; height: 16px; }

    /* Messages */
    .qas-msgs {
      flex: 1; overflow-y: auto; padding: 20px;
      display: flex; flex-direction: column; gap: 16px;
    }
    .qas-msgs::-webkit-scrollbar { width: 4px; }
    .qas-msgs::-webkit-scrollbar-thumb { background: var(--navy-light, #1A2440); border-radius: 2px; }

    .qas-row { display: flex; gap: 8px; align-items: flex-end; }
    .qas-row.qas-user { flex-direction: row-reverse; }

    .qas-avatar {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700;
    }
    .qas-ai-avatar {
      background: var(--teal-subtle, rgba(0,212,177,0.08));
      border: 1px solid rgba(0,212,177,0.2);
      color: var(--teal, #00D4B1);
    }
    .qas-user-avatar {
      background: var(--navy-light, #1A2440);
      border: 1px solid var(--border, rgba(255,255,255,0.07));
      color: var(--muted, #8892A4);
    }

    .qas-col { display: flex; flex-direction: column; gap: 6px; max-width: 84%; }

    .qas-bubble {
      padding: 11px 14px; border-radius: 16px;
      font-size: 13px; line-height: 1.6;
      color: var(--white, #F0F4FF);
    }
    .qas-ai-bub {
      background: var(--navy-light, #1A2440);
      border: 1px solid var(--border, rgba(255,255,255,0.07));
      border-bottom-left-radius: 4px;
    }
    .qas-user-bub {
      background: var(--teal, #00D4B1); color: #0B1120;
      border-bottom-right-radius: 4px;
    }
    .qas-bubble strong { font-weight: 700; }

    /* Typing dots */
    .qas-dots {
      display: flex; gap: 5px; align-items: center;
      padding: 12px 14px; border-radius: 16px; border-bottom-left-radius: 4px;
      background: var(--navy-light, #1A2440);
      border: 1px solid var(--border, rgba(255,255,255,0.07));
      width: fit-content;
    }
    .qas-dots span {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--muted, #8892A4);
      animation: qasBounce 1.2s ease-in-out infinite;
    }
    .qas-dots span:nth-child(2) { animation-delay: 0.18s; }
    .qas-dots span:nth-child(3) { animation-delay: 0.36s; }
    @keyframes qasBounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-7px); }
    }

    /* Suggestions */
    .qas-sugs { display: flex; flex-wrap: wrap; gap: 6px; }
    .qas-sug {
      background: var(--teal-subtle, rgba(0,212,177,0.08));
      border: 1px solid rgba(0,212,177,0.2);
      color: var(--teal, #00D4B1);
      border-radius: 20px; padding: 5px 12px;
      font-size: 12px; font-family: var(--font-body, 'Inter', sans-serif);
      cursor: pointer; transition: background 0.2s;
    }
    .qas-sug:hover { background: rgba(0,212,177,0.16); }

    /* Input area */
    .qas-foot {
      padding: 14px 16px 18px;
      border-top: 1px solid var(--border, rgba(255,255,255,0.07));
      flex-shrink: 0;
    }
    .qas-input-row { display: flex; gap: 10px; align-items: flex-end; }
    .qas-input {
      flex: 1;
      background: var(--navy-light, #1A2440);
      border: 1px solid var(--border, rgba(255,255,255,0.07));
      border-radius: 12px; padding: 10px 14px;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 13px; color: var(--white, #F0F4FF);
      resize: none; outline: none;
      min-height: 42px; max-height: 120px;
      transition: border-color 0.2s, box-shadow 0.2s; line-height: 1.4;
    }
    .qas-input::placeholder { color: var(--muted, #8892A4); }
    .qas-input:focus {
      border-color: var(--teal, #00D4B1);
      box-shadow: 0 0 0 3px var(--teal-glow, rgba(0,212,177,0.18));
    }
    .qas-send {
      width: 42px; height: 42px; border-radius: 12px;
      background: var(--teal, #00D4B1); color: #0B1120;
      border: none; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    .qas-send:hover  { background: var(--teal-dark, #00B89A); }
    .qas-send:active { transform: scale(0.93); }
    .qas-send svg { width: 16px; height: 16px; }
    .qas-hint {
      font-size: 11px; color: var(--muted, #8892A4);
      text-align: center; margin-top: 10px;
    }

    @media (max-width: 480px) {
      .qas-panel { width: 100vw; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── HTML ─────────────────────────────────────────────────────── */
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button class="qas-trigger" id="qasTrigger" title="Abrir Assistente IA">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="9" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/>
      </svg>
    </button>

    <div class="qas-panel" id="qasPanel">
      <div class="qas-head">
        <div class="qas-head-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div class="qas-head-info">
          <div class="qas-head-name">${M.title}</div>
          <div class="qas-head-sub">${M.subtitle}</div>
        </div>
        <div class="qas-online"></div>
        <button class="qas-close" id="qasClose" title="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="qas-msgs" id="qasMsgs"></div>

      <div class="qas-foot">
        <div class="qas-input-row">
          <textarea class="qas-input" id="qasInput" placeholder="Faça uma pergunta sobre os dados…" rows="1"></textarea>
          <button class="qas-send" id="qasSend">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div class="qas-hint">QAS-Digital AI · Respostas baseadas nos dados deste módulo</div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  /* ── ELEMENTS ─────────────────────────────────────────────────── */
  const trigger = document.getElementById('qasTrigger');
  const panel   = document.getElementById('qasPanel');
  const closeBtn = document.getElementById('qasClose');
  const msgs    = document.getElementById('qasMsgs');
  const input   = document.getElementById('qasInput');
  const sendBtn = document.getElementById('qasSend');

  let greeted = false;

  /* ── EVENTS ───────────────────────────────────────────────────── */
  trigger.addEventListener('click', () => {
    panel.classList.toggle('qas-open');
    if (!greeted && panel.classList.contains('qas-open')) {
      greeted = true;
      setTimeout(() => addAI(M.greeting, M.suggestions), 380);
    }
  });

  closeBtn.addEventListener('click', () => panel.classList.remove('qas-open'));

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  /* ── LOGIC ────────────────────────────────────────────────────── */
  function send() {
    const text = input.value.trim();
    if (!text) return;
    addUser(text);
    input.value = '';
    input.style.height = 'auto';
    showTyping();
    const delay = 700 + Math.random() * 700;
    setTimeout(() => { hideTyping(); addAI(getReply(text)); }, delay);
  }

  function addUser(text) {
    const row = document.createElement('div');
    row.className = 'qas-row qas-user';
    row.innerHTML = `
      <div class="qas-avatar qas-user-avatar">${esc(userInitial)}</div>
      <div class="qas-col">
        <div class="qas-bubble qas-user-bub">${esc(text)}</div>
      </div>`;
    msgs.appendChild(row);
    scrollEnd();
  }

  function addAI(text, suggestions) {
    const row = document.createElement('div');
    row.className = 'qas-row';
    const col = document.createElement('div');
    col.className = 'qas-col';

    const bubble = document.createElement('div');
    bubble.className = 'qas-bubble qas-ai-bub';
    bubble.innerHTML = md(text);
    col.appendChild(bubble);

    if (suggestions && suggestions.length) {
      const sugDiv = document.createElement('div');
      sugDiv.className = 'qas-sugs';
      suggestions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'qas-sug';
        btn.textContent = s;
        btn.addEventListener('click', () => {
          panel.classList.add('qas-open');
          input.value = s;
          send();
        });
        sugDiv.appendChild(btn);
      });
      col.appendChild(sugDiv);
    }

    row.innerHTML = `<div class="qas-avatar qas-ai-avatar">IA</div>`;
    row.appendChild(col);
    msgs.appendChild(row);
    scrollEnd();
  }

  let typingRow = null;
  function showTyping() {
    typingRow = document.createElement('div');
    typingRow.className = 'qas-row';
    typingRow.innerHTML = `
      <div class="qas-avatar qas-ai-avatar">IA</div>
      <div class="qas-dots"><span></span><span></span><span></span></div>`;
    msgs.appendChild(typingRow);
    scrollEnd();
  }
  function hideTyping() { typingRow?.remove(); typingRow = null; }

  function scrollEnd() { msgs.scrollTop = msgs.scrollHeight; }

})();
