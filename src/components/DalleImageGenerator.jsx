import React, { useState } from "react";

const DalleImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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
        throw new Error("Imagem não gerada. Verifique a chave da API.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl max-w-xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">🎨 Gerador de Imagem com IA</h2>

      <input
        type="text"
        placeholder="Descreva sua ideia de imagem..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Gerando..." : "Gerar Imagem"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Imagem gerada" className="rounded shadow" />
        </div>
      )}
    </div>
  );
};

export default DalleImageGenerator;
