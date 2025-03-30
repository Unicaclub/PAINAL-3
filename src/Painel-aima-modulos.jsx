import React, { useState } from "react";

export default function PainelAIMA() {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleClick = (index, label) => {
    setLoadingIndex(index);
    setTimeout(() => {
      alert(`${label} executado com sucesso! ✅`);
      setLoadingIndex(null);
    }, 1500);
  };

  const botoes = [
    {
      titulo: "✅ Módulo 1 – Criativos com IA",
      descricao: "Gere imagens, vídeos e textos automaticamente com IA generativa.",
      cor: "bg-purple-600 hover:bg-purple-700",
      texto: "🎨 Gerar Criativo com IA",
    },
    {
      titulo: "✅ Módulo 2 – Segmentação Inteligente",
      descricao: "Sugestões automáticas de públicos com base no histórico.",
      cor: "bg-blue-600 hover:bg-blue-700",
      texto: "🧠 Sugerir Segmentação",
    },
    {
      titulo: "✅ Módulo 3 – Publicação no Meta Ads",
      descricao: "Transforma formulário em campanha real via API da Meta.",
      cor: "bg-green-600 hover:bg-green-700",
      texto: "🚀 Publicar no Meta",
    },
    {
      titulo: "✅ Módulo 4 – Painel de Resultados",
      descricao: "Veja métricas em tempo real com sugestões automáticas da IA.",
      cor: "bg-yellow-600 hover:bg-yellow-700 text-black",
      texto: "📊 Ver Desempenho",
    },
    {
      titulo: "✅ Módulo 5 – Testes A/B com Aprendizado",
      descricao: "Teste diferentes criativos automaticamente e escale os vencedores.",
      cor: "bg-pink-600 hover:bg-pink-700",
      texto: "🧪 Iniciar Teste A/B",
    },
    {
      titulo: "✅ Módulo 6 – Biblioteca de Criativos",
      descricao: "Acesse os criativos que deram mais resultado e reutilize com 1 clique.",
      cor: "bg-indigo-600 hover:bg-indigo-700",
      texto: "📂 Ver Criativos",
    },
    {
      titulo: "✅ Módulo 7 – Integrações com CRM/WhatsApp",
      descricao: "Leads direto pro seu CRM, Zapier, WhatsApp ou landing page.",
      cor: "bg-emerald-600 hover:bg-emerald-700",
      texto: "💬 Enviar para WhatsApp / CRM",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto text-white space-y-8">
      <h1 className="text-3xl font-bold">🧠 Módulos Inteligentes – AIMA</h1>

      {botoes.map((modulo, index) => (
        <div key={index} className="bg-zinc-800 p-6 rounded-2xl shadow-md space-y-2">
          <h2 className="text-xl font-semibold">{modulo.titulo}</h2>
          <p>{modulo.descricao}</p>
          <button
            disabled={loadingIndex === index}
            onClick={() => handleClick(index, modulo.texto)}
            className={`px-4 py-2 rounded font-medium transition-all duration-300 ${
              modulo.cor
            } ${loadingIndex === index ? "opacity-50 cursor-wait" : ""}`}
          >
            {loadingIndex === index ? "⏳ Processando..." : modulo.texto}
          </button>
        </div>
      ))}
    </div>
  );
}
