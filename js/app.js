// Beispielhafte Nährstoffdaten
const nutrientsData = [
  {
    name: "Vitamin C",
    type: "Mikronährstoff",
    description: "Vitamin C ist wichtig für das Immunsystem.",
    deficiency: "Schwäche, Immunschwäche",
    excess: "Magenbeschwerden, Übelkeit",
    interaction: "Fördert die Aufnahme von Eisen.",
    supplementation: "Kann in speziellen Fällen hilfreich sein.",
    recommendedDailyAmount: "75-90 mg"
  },
  {
    name: "Eiweiß",
    type: "Makronährstoff",
    description: "Eiweiß ist wichtig für den Muskelaufbau.",
    deficiency: "Muskelschwund, Müdigkeit",
    excess: "Nierenprobleme, Dehydration",
    interaction: "Fördert die Aufnahme von Eisen.",
    supplementation: "Für Sportler empfehlenswert.",
    recommendedDailyAmount: "2g/kg Körpergewicht",
    caloriesPerGram: 4
  }
];

let activeNutrient = null; // Speichert den aktuell geöffneten Nährstoff

// Suche nach Nährstoff
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const results = nutrientsData.filter(nutrient =>
    nutrient.name.toLowerCase().includes(query)
  );

  displayResults(results);
});

// Ergebnisse anzeigen
function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>Kein Nährstoff gefunden.</p>";
    return;
  }

  results.forEach(nutrient => {
    const nutrientDiv = document.createElement('div');
    nutrientDiv.classList.add('nutrient-item');
    nutrientDiv.innerHTML = `<h2>${nutrient.name}</h2>`;
    nutrientDiv.addEventListener('click', function() {
      toggleNutrientDetails(nutrient);
    });
    resultsDiv.appendChild(nutrientDiv);
  });
}

// Details eines Nährstoffs ein- oder ausblenden
function toggleNutrientDetails(nutrient) {
  const detailsDiv = document.getElementById('details');

  if (activeNutrient === nutrient.name) {
    // Falls derselbe Nährstoff angeklickt wird, schließen
    detailsDiv.style.display = "none";
    activeNutrient = null;
  } else {
    // Falls ein anderer Nährstoff angeklickt wird, öffnen
    activeNutrient = nutrient.name;
    detailsDiv.style.display = "block";
    detailsDiv.innerHTML = `
      <h2>${nutrient.name}</h2>
      <p><strong>Typ:</strong> ${nutrient.type}</p>
      <p><strong>Beschreibung:</strong> ${nutrient.description}</p>
      <p><strong>Empfohlene tägliche Menge:</strong> ${nutrient.recommendedDailyAmount}</p>
      <p><strong>Was passiert bei Mangel:</strong> ${nutrient.deficiency}</p>
      <p><strong>Was passiert bei Übermaß:</strong> ${nutrient.excess}</p>
      <p><strong>Interaktionen:</strong> ${nutrient.interaction}</p>
      <p><strong>Ergänzungen:</strong> ${nutrient.supplementation}</p>
    `;
  }
}
