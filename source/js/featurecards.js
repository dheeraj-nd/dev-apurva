fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    renderCards(jsonData.featurecards);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  function renderCards(data) {
    const cardDeckContainer = document.getElementById("featurecarousel-card");
    cardDeckContainer.innerHTML = "";
    const cardHTMLArray = [];
    let hasCardsToShow = false;
  
    // <div class="featurecards">
    //       <div class="featurehead">
    //         <img src="source/img/The CSR Universe Logo 2.png" alt="Card 1">
    //       </div>
    //       <div class="featurebody">
    //         <div class="featuredheader">
    //           <h5>TheCSRUniverse</h5>
    //         </div>
    //         <div class="featuretext">
    //           <a href="https://thecsruniverse.com/articles/crystallizing-collective-wisdom-through-ai-an-interview-with-anand-rajan-co-founder-apurva-ai"
    //             target="_blank">
    //             TheCSRUniverse
    //             Interview with Anand Rajan, Mission Leader and Co- founder at
    //             Apurva.ai</a>
    //         </div>
    //       </div>
    //     </div>
    data.forEach((featurecards) => {
      const { imageSrc, header, link, title} = featurecards;
        cardHTMLArray.push(`
    
          <div class="featurecards">
          <div class="featurehead">
            <img src="${imageSrc}" alt="Card 6">
          </div>
          <div class="featurebody">
            <div class="featuredheader">
              <h5>${header}</h5>
            </div>
            <div class="featuretext">
              <a href="${link}"
                target="_blank">
                ${title}</a>
            </div>
          </div>

        </div>
          `);
        hasCardsToShow = true;
      
    });
  
  
    cardDeckContainer.innerHTML = cardHTMLArray.join("");
  }