import BibliotecaCriativos from "./BibliotecaCriativos";
import React, { useState, useEffect } from "react";
import PainelAIMA from "./Painel-aima-modulos";
import { criarCampanhaMeta } from "./api/meta";
import { salvarCampanha, listarResultados } from "./api/firebase";

function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [campanha, setCampanha] = useState({
    nome: "",
    texto: "",
    publico: "",
    orcamento: ""
  });
  const [resultados, setResultados] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Digite um prompt para gerar a imagem.");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) throw new Error("Chave da API não encontrada no ambiente Vercel.");

      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt,
          model: "dall-e-3",
          n: 1,
          size: "1024x1024"
        })
      });

      const data = await response.json();

      if (data?.data && data.data[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        throw new Error("Imagem não gerada. Verifique sua chave de API e o prompt.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    } else {
      alert("Por favor, selecione um arquivo .mp4 válido.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampanha((prev) => ({ ...prev, [name]: value }));
  };

  const publicarMeta = async () => {
    try {
      const resposta = await criarCampanhaMeta(campanha);
      await salvarCampanha({ ...campanha, id: resposta.id });
      alert("Campanha publicada com sucesso! ✅\nID: " + resposta.id);
    } catch (err) {
      alert("Erro ao publicar: " + err.message);
    }
  };

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const dados = await listarResultados();
        setResultados(dados);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      }
    };
    fetchResultados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎯 Criar Campanha com IA</h1>

      <form className="grid gap-4 max-w-xl">
        <div>
          <label className="block mb-1">Nome da Campanha</label>
          <input
            type="text"
            name="nome"
            value={campanha.nome}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Ex: Promoção Sexta VIP"
          />
        </div>

        <div>
          <label className="block mb-1">Texto para o Anúncio</label>
          <textarea
            name="texto"
            value={campanha.texto}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            rows="4"
            placeholder="Descreva o evento, estilo da balada, atrações..."
          />
        </div>

        <div>
          <label className="block mb-1">Orçamento (R$)</label>
          <input
            type="number"
            name="orcamento"
            value={campanha.orcamento}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Ex: 150"
          />
        </div>

        <div>
          <label className="block mb-1">Público-Alvo</label>
          <input
            type="text"
            name="publico"
            value={campanha.publico}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Ex: Jovens 18-25, Campo Grande, festas"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            {loading ? "Gerando..." : "🤖 Gerar com IA"}
          </button>

          <button
            type="button"
            onClick={publicarMeta}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            🚀 Publicar Campanha
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">🎥 Adicionar Vídeo (MP4)</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleVideoChange}
            className="block w-full text-sm text-white"
          />
        </div>

        {videoUrl && (
          <video
            controls
            className="w-full mt-4 rounded-xl shadow-md border border-gray-700"
          >
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        )}
      </form>

      {imageUrl && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">🧠 Imagem Gerada pela IA</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow max-w-xl mx-auto">
            <img src={imageUrl} alt="Imagem gerada" className="rounded shadow" />
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">📊 Resultados das Campanhas</h2>
        <ul className="space-y-2">
          {resultados.map((res, i) => (
            <li key={i} className="bg-gray-800 p-4 rounded-lg shadow">
              <strong>{res.nome}</strong><br />
              Público: {res.publico}<br />
              Orçamento: R$ {res.orcamento}<br />
              Status: <span className="text-green-400">Ativa</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <PainelAIMA />
      </div>

      <div className="mt-12">
        <BibliotecaCriativos />
      </div>
    </div>
  );
}

export default App;
