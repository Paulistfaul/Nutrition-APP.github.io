document.addEventListener("DOMContentLoaded", function () {
    fetch("data/nutrients.json")
        .then(response => response.json())
        .then(data => {
            const searchInput = document.getElementById("searchInput");
            const nutrientList = document.getElementById("nutrientList");

            function renderList(query = "") {
                nutrientList.innerHTML = "";
                let filtered = data.filter(nutrient => 
                    nutrient.name.toLowerCase().includes(query.toLowerCase())
                );

                if (query.trim() === "" || filtered.length === 0) {
                    return; // Leere Liste, wenn keine Sucheingabe da ist
                }

                filtered.forEach(nutrient => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<strong>${nutrient.name}</strong>`;

                    let detailDiv = document.createElement("div");
                    detailDiv.classList.add("details");
                    detailDiv.innerHTML = `
                        <p><strong>Wofür ist es gut?</strong> ${nutrient.benefits}</p>
                        <p><strong>Mangelerscheinungen</strong> ${nutrient.deficiency}</p>
                        <p><strong>Überdosierung</strong> ${nutrient.overdose}</p>
                        <p><strong>Interaktionen</strong> ${nutrient.interactions}</p>
                        <p><strong>Supplementation</strong> ${nutrient.supplementation}</p>
                    `;
                    listItem.appendChild(detailDiv);

                    listItem.addEventListener("click", function () {
                        detailDiv.style.display = detailDiv.style.display === "block" ? "none" : "block";
                    });

                    nutrientList.appendChild(listItem);

                    // Automatisches Aufklappen, wenn exakter Name eingegeben wurde
                    if (query.toLowerCase() === nutrient.name.toLowerCase()) {
                        detailDiv.style.display = "block";
                    }
                });
            }

            searchInput.addEventListener("input", () => renderList(searchInput.value));
        });
});
