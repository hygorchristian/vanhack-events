const meta = {
  meetup: {
    name: 'MeetUp',
  },
  leap: {
    name: 'Leap',
    class: 'highlight',
    icon: 'running',
  },
  recruiting: {
    name: 'Recruiting Mission',
    class: 'highlight'
  },
  vanhackathon: {
    name: 'VanHackathon',
    class: 'highlight',
    icon: 'code',
  },
  webinar: {
    name: 'Webinar'
  },
  premium_webinar: {
    name: 'Premium Webinar',
    class: 'premium',
    icon: 'crown',
  }
}

function renderCardHeader(data){
  const metadata = meta[data.type];

  return `
    <div class="badge ${metadata.class}">
      <span class="badge-label">
        ${metadata.name}
      </span>
    </div>
    <div class="info">
      ${ metadata.icon ? `<div class="round ${metadata.class}"><i class="fas fa-${metadata.icon}"></i></div>` : '' }
    </div>
  `
}

function renderFront(data){
  return `
    <div class="flip-card-front ${meta[data.type].class}">
      <div style="background-image: url('${data.image}')" class="card-header">
        <div class="card-header-content">
          ${renderCardHeader(data)}          
        </div>
      </div>
      <div class="card-content">
        <div class="date">
          <span class="month ${meta[data.type].class}">SEP</span>
          <span class="day">18</span>
        </div>
        <div class="info">
          <span class="title">Dream World Wide in Jakarta</span>
          <span class="description">Soehanna, Daerah Khusus Ibukota Yogyakarta, Indonesia</span>
        </div>
      </div>
    </div>
  `
}

function renderBack(data){
  return `
    <div class="flip-card-back ${meta[data.type].class}">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  `
}

function generateCard(data) {
  const card = document.createElement('div');
  const html = `
    <div class="flip-card">
      <div class="flip-card-inner">
        ${renderFront(data)}
        ${renderBack(data)}        
      </div>
    </div>
  `
  card.innerHTML = html;
  return card;
}

function loadItems() {
  const grid = document.getElementById('grid');
  for(let i = 0; i < 12; i++){
    mock.forEach(item => {
      const card = generateCard(item);
      grid.appendChild(card);
    })
  }
}

(function () {
  loadItems()
})()
