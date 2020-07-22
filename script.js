function EventLoader() {
  // Get html elements
  const html = {
    grid: document.querySelector("#grid"),
    query: document.querySelector("#filter-query"),
    type: document.querySelector("#filter-type"),
    date: document.querySelector("#filter-date"),
  };

  // Renders the header of cards
  function renderCardHeader(data) {
    const meta = metadata[data.type];

    return `
      <div class="badge ${meta.class}">
        <span class="badge-label">
          ${meta.name}
        </span>
      </div>
      <div class="info">
        ${
          meta.icon
            ? `<div class="round ${meta.class}"><i class="fas fa-${meta.icon}"></i></div>`
            : ""
        }
      </div>
    `;
  }

  // Renders the front card
  function renderCardFront(item) {
    const meta = metadata[item.type];

    return `
      <div class="flip-card-front ${meta.class}">
        <div style="background-image: url('${item.image}')" class="card-header">
          <div class="card-header-content">
            ${renderCardHeader(item)}          
          </div>
        </div>
        <div class="card-content">
          <div class="date">
            <span class="month ${meta.class}">SEP</span>
            <span class="day">18</span>
          </div>
          <div class="info">
            <span class="title">${item.title}</span>
            <span class="description">${item.description.substr(
              0,
              100
            )}...</span>
          </div>
        </div>
      </div>
    `;
  }

  // Renders the back card
  function renderCardBack(item) {
    const meta = metadata[item.type];

    return `
      <div class="flip-card-back ${meta.class}">
        <div class="info">
          <span class="title">${item.title}</span>
          <span class="description">${item.description}</span>
          <div class="share">          
            <strong>Share:</strong>
            <a href="https://linkedin.com" class="btn-share" target="_blank">
              <span class="${meta.class}">LinkedIn</span>
            </a>
            <a href="https://twitter.com" class="btn-share" target="_blank">
              <span class="${meta.class}">Twitter</span>
            </a>
            <a href="https://facebook.com" class="btn-share" target="_blank">
              <span class="${meta.class}">Facebook</span>
            </a>
          </div>
        </div>
        <button class="btn" onclick="${meta.subscribe}('${item.title}')">
          Checkout Now
        </button>
      </div>
    `;
  }

  // Creates a card element
  function generateCard(item) {
    const card = document.createElement("div");
    const html = `
      <div class="flip-card">
        <div class="flip-card-inner">
          ${renderCardFront(item)}
          ${renderCardBack(item)}        
        </div>
      </div>
    `;
    card.innerHTML = html;
    return card;
  }

  // Fetchs events data and saves into localstorage
  async function fetchAndSaveEvents() {
    localStorage.setItem("events", "[]");
    const res = await fetch(
      "https://raw.githubusercontent.com/hygorchristian/vanhack-events/master/mock.json"
    );

    const mock = await res.json();

    localStorage.setItem("events", JSON.stringify(mock));
    localStorage.setItem("filtered-events", JSON.stringify(mock));
  }

  function filterEventsByQuery(param) {
    const query = param.toLowerCase()
    const events = JSON.parse(localStorage.getItem('events'))
    const newEvents = events.filter(event => {
      const hasTitle = event.title.toLowerCase().includes(query);
      const hasDescription = event.description.toLowerCase().includes(query);
      const hasType = event.type.toLowerCase().includes(query);

      return hasTitle || hasDescription || hasType;
    })

    localStorage.setItem('filtered-events', JSON.stringify(newEvents));
  }

  function filterEventsByType(param) {
    const type = param.toLowerCase()
    const events = JSON.parse(localStorage.getItem('events'))
    const newEvents = events.filter(event => {
      const hasType = event.type.toLowerCase().includes(type);

      return hasType;
    })

    localStorage.setItem('filtered-events', JSON.stringify(newEvents));
  }

  function filterEventsByDate(date) {
    // todo
  }

  function setListeners() {
    // Query search input
    html.query.addEventListener("keyup", (event) => {
      const query = event.target.value;
      filterEventsByQuery(query);
      renderEvents();
    });

    // Select type input
    html.type.addEventListener("change", (event) => {
      const type = event.target.value;
      filterEventsByType(type);
      console.log(type);
      renderEvents();
    });

    // Select type input
    html.date.addEventListener("change", (event) => {
      const date = event.target.value;
      filterEventsByDate(date);
      console.log(date);
      renderEvents();
    });
  }

  // Clears grid elements and renders the data stores in localstorage
  function renderEvents() {
    html.grid.innerHTML = "";
    const events = JSON.parse(localStorage.getItem("filtered-events"));

    events.forEach((event) => {
      const card = generateCard(event);
      html.grid.appendChild(card);
    });
  }

  // Inits the event loader
  async function init() {
    await fetchAndSaveEvents();
    renderEvents();
    setListeners();
  }

  return { init };
}

window.addEventListener("load", function () {
  const eventLoader = new EventLoader();
  eventLoader.init();
});
