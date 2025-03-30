import React, { useState } from "react";

function LandingPageIA({ campanha }) {
  const [lead, setLead] = useState({ nome: "", telefone: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const enviarParaWhatsApp = () => {
    const mensagem = `Oi! Me chamo ${lead.nome} e quero participar da campanha \"${campanha.nome}\". Meu telefone: ${lead.telefone}`;
    const url = `https://wa.me/5567999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📩 Landing Page Inteligente</h2>
      <p className="mb-4">
        Receba um cupom exclusivo para a campanha: <strong>{campanha.nome}</strong>
      </p>
      <input
        type="text"
        name="nome"
        value={lead.nome}
        onChange={handleInputChange}
        placeholder="Seu nome"
        className="w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600 text-white"
      />
      <input
        type="tel"
        name="telefone"
        value={lead.telefone}
        onChange={handleInputChange}
        placeholder="Telefone (com DDD)"
        className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
      />
      <button
        onClick={enviarParaWhatsApp}
        className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
      >
        💬 Enviar para WhatsApp
      </button>
    </div>
  );
}

export default LandingPageIA;
