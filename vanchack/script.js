const mock = [
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'meetup',
    image: 'https://mk0organicadigi7cpr1.kinstacdn.com/wp-content/uploads/2019/11/meetup-orga.jpg',
    url: '',
  },
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'leap',
    image: 'https://www.truthinsideofyou.org/wp-content/uploads/2016/05/Leap-of-Faith.jpg',
    url: '',
  },
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'recruiting',
    image: 'https://specials-images.forbesimg.com/imageserve/862718314/960x0.jpg?cropX1=11&cropX2=5331&cropY1=0&cropY2=2660',
    url: '',
  },
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'vanhackathon',
    image: 'https://www.dds.com.br/blog/wp-content/uploads/sites/2/2017/10/o-que-e-hackathon-atendimento-ao-cliente-v1.jpg',
    url: '',
  },
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'webinar',
    image: 'https://blog.eventials.com/wp-content/uploads/2019/11/34.jpg',
    url: '',
  },
  {
    deadline: new Date(2020, 6, 2),
    title: 'sdsdd',
    description: '',
    type: 'premium_webinar',
    image: 'https://image.freepik.com/fotos-gratis/webinar-homem-mao-na-mesa-de-negocios_36325-2273.jpg',
    url: '',
  },
]

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
