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

                if (filtered.length === 0) {
                    nutrientList.innerHTML = "<li>Kein Treffer</li>";
                    return;
                }

                filtered.forEach(nutrient => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<strong>${nutrient.name}</strong>`;
                    listItem.addEventListener("click", function () {
                        let details = this.querySelector(".details");
                        if (details) {
                            details.remove();
                        } else {
                            let detailDiv = document.createElement("div");
                            detailDiv.classList.add("details");
                            detailDiv.innerHTML = `
                                <p><strong>Wofür ist es gut?</strong> ${nutrient.benefits}</p>
                                <p><strong>Mangelerscheinungen:</strong> ${nutrient.deficiency}</p>
                                <p><strong>Überdosierung:</strong> ${nutrient.overdose}</p>
                                <p><strong>Interaktionen:</strong> ${nutrient.interactions}</p>
                                <p><strong>Supplementation:</strong> ${nutrient.supplementation}</p>
                            `;
                            this.appendChild(detailDiv);
                        }
                    });
                    nutrientList.appendChild(listItem);
                });
            }

            searchInput.addEventListener("input", () => renderList(searchInput.value));
            renderList();
        });
});
