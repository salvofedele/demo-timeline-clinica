const urlDati = './dati-clinici.json';

async function caricaDatiClinici() {
  try {
    const risposta = await fetch(urlDati);
    const dati = await risposta.json();
    
    // Troviamo il contenitore vuoto nell'HTML
    const container = document.getElementById('timeline-container');
    
    // Svuotiamo il testo "Caricamento in corso..."
    container.innerHTML = '';
    
    // Per ogni evento nel file JSON, creiamo un pezzo di HTML
    dati.eventi.forEach(evento => {
      
      // Creiamo un nuovo "div"
      const card = document.createElement('div');
      card.className = 'evento';
      
      // Ci "iniettiamo" dentro i dati del JSON usando i backtick (`)
      card.innerHTML = `
        <div class="data">${evento.date} <span class="categoria">${evento.cat}</span></div>
        <h3>${evento.title}</h3>
        <p><strong>${evento.summary}</strong></p>
        <p>${evento.detail}</p>
      `;
      
      // Aggiungiamo il div finito al contenitore principale
      container.appendChild(card);
    });
    
  } catch (errore) {
    console.error("Ops! Problema:", errore);
    document.getElementById('timeline-container').innerHTML = "<p>Errore nel caricamento dei dati.</p>";
  }
}

// Avviamo il motore
caricaDatiClinici();