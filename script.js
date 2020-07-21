const metadata = {
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
    class: 'highlight',
    icon: 'search',
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
    subscribe: 'premiumSubscribe()'
  }
}

function renderCardHeader(data){
  const meta = metadata[data.type];

  return `
    <div class="badge ${meta.class}">
      <span class="badge-label">
        ${meta.name}
      </span>
    </div>
    <div class="info">
      ${ meta.icon ? `<div class="round ${meta.class}"><i class="fas fa-${meta.icon}"></i></div>` : '' }
    </div>
  `
}

function renderCardFront(item){
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
          <span class="description">${item.description.substr(0, 100)}...</span>
        </div>
      </div>
    </div>
  `
}

function renderCardBack(item){
  const meta = metadata[item.type];

  return `
    <div class="flip-card-back ${meta.class}">
      <div class="info">
        <span class="title">${item.title}</span>
        <span class="description">${item.description}</span>
      </div>
      <button class="btn" onclick="${meta.subscribe}">
        Checkout Now
      </button>
    </div>
  `
}

function generateCard(item) {
  const card = document.createElement('div');
  const html = `
    <div class="flip-card">
      <div class="flip-card-inner">
        ${renderCardFront(item)}
        ${renderCardBack(item)}        
      </div>
    </div>
  `
  card.innerHTML = html;
  return card;
}

async function loadItems() {
  const grid = document.getElementById('grid');
  // const res = await fetch('https://raw.githubusercontent.com/hygorchristian/vanhack-events/master/mock.json');
  const res = await fetch('mock.json');
  const mock = await res.json();

  mock.forEach(item => {
    const card = generateCard(item);
    grid.appendChild(card);
  })
}

/* Actions */

function showSuccessMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    variant: 'error'
  })
}

function premiumSubscribe() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-premium ml-8',
      cancelButton: 'btn'
    },
    buttonsStyling: false,
    iconHtml: '<span>sdfsdfsdf</span>',
  })

  swalWithBootstrapButtons.fire({
    title: 'You are not premium',
    text: "Join our premium community ;)",
    iconHtml: '<h1>sdfsdfsdf</h1>',
    showCancelButton: true,
    confirmButtonText: 'Become premium!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'info'
      )
    } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'info'
      )
    }
  })
}

(function () {
  loadItems()
})()
