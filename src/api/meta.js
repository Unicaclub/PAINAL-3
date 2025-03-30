export async function criarCampanhaMeta({ nome, objetivo }) {
  const token = import.meta.env.VITE_META_ACCESS_TOKEN;
  const adAccountId = import.meta.env.VITE_META_AD_ACCOUNT_ID;

  if (!token || !adAccountId) {
    throw new Error("❌ Variáveis de ambiente da Meta não estão configuradas.");
  }

  const url = `https://graph.facebook.com/v19.0/${adAccountId}/campaigns`;

  const body = {
    name: nome,
    objective: objetivo,
    status: "PAUSED",
    special_ad_categories: [],
    access_token: token,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Erro da API Meta:", data.error.message);
      throw new Error(data.error.message);
    }

    return data;
  } catch (err) {
    console.error("Erro ao conectar com a Meta API:", err.message);
    throw new Error("Erro ao conectar com a Meta API.");
  }
}
