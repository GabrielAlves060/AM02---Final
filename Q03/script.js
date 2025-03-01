let db;
const request = indexedDB.open("RatingsDB", 1);

request.onerror = (event) => console.error("Erro no IndexedDB:", event);

request.onsuccess = (event) => {
  db = event.target.result;
  loadRatings(); 
};

request.onupgradeneeded = (event) => {
  db = event.target.result;
  const store = db.createObjectStore("ratings", { keyPath: "id" });
};

// Função para salvar rating no IndexedDB
async function saveRating(id, rating) {
    if (!db) {
        console.error("Banco de dados não carregado ainda.");
        return;
    }

    const transaction = db.transaction("ratings", "readwrite");
    const store = transaction.objectStore("ratings");
    store.put({ id, rating });

    console.log(`✅ Rating de ${rating} salvo para ${id}`);

    // Atualiza a interface imediatamente
    document.getElementById("ratingDisplay").textContent = rating;
}

// Função para recuperar rating de uma imagem
async function getRating(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("ratings", "readonly");
    const store = transaction.objectStore("ratings");
    const request = store.get(id);
    
    request.onsuccess = () => resolve(request.result ? request.result.rating : null);
    request.onerror = () => reject("Erro ao obter rating");
  });
}

// Carregar todos os ratings ao iniciar a página
function loadRatings() {
  const transaction = db.transaction("ratings", "readonly");
  const store = transaction.objectStore("ratings");
  const request = store.getAll();
  
  request.onsuccess = () => {
    if (request.result.length > 0) {
      request.result.forEach(({ id, rating }) => {
        console.log(`Imagem ${id} tem rating ${rating}`);
    
      });
    }
  };
}
