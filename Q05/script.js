async function fetchData() {
    try {
      const response = await fetch('https://api.exemplo.com');
      if (!response.ok) {
        throw new Error('Falha na rede');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error; 
    }
  }
  
  async function processData() {
    try {
      const data = await fetchData();
      console.log("Dados recebidos:", data);
    } catch (error) {
      console.error("Erro ao processar os dados:", error);
    }
  }
  
  processData();
  