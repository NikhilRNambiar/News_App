async function getNews() {
    const dataArr = [];
    for (let i = 0; i < magazines.length; i++) {
      let res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`);
      let data = await res.json();
      dataArr.push(data);
    }
    return dataArr;
  }
  
  function accordion(data) {
    const accordionContainer = document.getElementById("accordian");
    const accordion=document.createElement('div');
    accordion.className="accordion";
    accordion.id="accordionExample";
  
    data.forEach((feed, feedIdx) => {
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");
      accordionItem.style.marginBottom = "15px";
  
      const accordionHeader = document.createElement("h2");
      accordionHeader.classList.add("accordion-header");
      accordionHeader.id = `heading${feedIdx + 1}`;
  
      const accordionButton = document.createElement("button");
      accordionButton.className="accordion-button";
      accordionButton.setAttribute("type", "button");
      accordionButton.setAttribute("data-bs-toggle", "collapse");
      accordionButton.setAttribute("data-bs-target", `#collapse${feedIdx + 1}`);
      accordionButton.setAttribute("aria-expanded", "true");
      accordionButton.setAttribute("aria-controls", `collapse${feedIdx + 1}`);
      accordionButton.innerHTML = `<h5 class=accHeading>${feed.feed.title}</h5>`;
  
      accordionHeader.appendChild(accordionButton);
      accordionItem.appendChild(accordionHeader);
      accordion.appendChild(accordionItem);
  
      const accordionCollapse = document.createElement("div");
      accordionCollapse.id = `collapse${feedIdx + 1}`;
      accordionCollapse.classList.add("accordion-collapse", "collapse");
      accordionCollapse.setAttribute("aria-labelledby", `heading${feedIdx + 1}`);
      accordionCollapse.setAttribute("data-bs-parent", "#accordionExample");
      if(feedIdx==0){
        accordionCollapse.classList.add("show");
      }
  
      const accordionBody = document.createElement("div");
      accordionBody.classList.add("accordion-body");
  
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel", "slide");
      carouselContainer.setAttribute("data-bs-ride", "carousel");
      carouselContainer.id=`carouselExampleControls${feedIdx + 1}`;

      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner");

      feed.items.forEach((item, idx) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (idx === 0) {
          carouselItem.classList.add("active");
        }
        
        carouselItem.innerHTML = `<a href="${item.link}"><img src="${item.enclosure.link}" class="d-block w-100 image" alt="${item.title}">
        <h3 class="heading">${item.title}</h3>
        <div class="d-flex align-items-center mb-2">
          <div class="author">${item.author}</div>
          <div class="mx-2 ellipse"></div>
          <div class="date">${new Date(item.pubDate).toLocaleDateString("en-IN",{
            day:"numeric",
            year:"numeric",
            month:"numeric",
          })}</div>
        </div>
        <p class="content">${item.content}</p></a>  `;
        
        carouselInner.appendChild(carouselItem);
      });
      carouselContainer.appendChild(carouselInner);
  
      carouselContainer.innerHTML += `
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${feedIdx + 1}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${feedIdx + 1}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`;

    accordionBody.appendChild(carouselContainer);
    accordionCollapse.appendChild(accordionBody);
    accordionItem.appendChild(accordionCollapse);

    accordionContainer.appendChild(accordion);
    });
  }
  
  
  // Call the functions
  async function fetchDataAndPopulateAccordion() {
    const data = await getNews();
    accordion(data);
  }
  
  // Call the main function to fetch data and populate the accordion
  fetchDataAndPopulateAccordion();
  
