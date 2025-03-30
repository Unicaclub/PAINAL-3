import React, { useState } from "react";

function TesteAB() {
  const [executando, setExecutando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const iniciarTeste = async () => {
    setExecutando(true);
    setResultado(null);

    // Simulação IA – aqui entrará o algoritmo de Machine Learning real futuramente
    setTimeout(() => {
      setResultado({
        vencedor: "Anúncio B",
        taxaConversao: "8.7%",
        publico: "Jovens 18-24 - Interesse em baladas"
      });
      setExecutando(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-800 p-6 mt-10 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-3">🔁 Teste A/B Inteligente</h2>
      <p className="mb-4 text-sm text-gray-300">
        O sistema irá gerar variações automáticas de anúncios e testar o que funciona melhor.
      </p>
      <button
        onClick={iniciarTeste}
        disabled={executando}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
      >
        {executando ? "Rodando Teste A/B..." : "Iniciar Teste A/B"}
      </button>

      {resultado && (
        <div className="mt-5 text-sm text-green-400">
          <p>✅ Vencedor: <strong>{resultado.vencedor}</strong></p>
          <p>🎯 Conversão: {resultado.taxaConversao}</p>
          <p>👥 Público-Alvo: {resultado.publico}</p>
        </div>
      )}
    </div>
  );
}

export default TesteAB;
