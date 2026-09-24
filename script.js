const properties = [
  {
    id: 1, code: 'MAG-101', purpose: 'aluguel', type: 'kitnet', title: 'Kitnet prática no Centro', neighborhood: 'Centro', address: 'Rua Dr. Melo Viana, 11 · Apto. 9', price: 650, priceText: 'R$ 650', suffix: '/mês', beds: 1, baths: 1, garage: 0, area: 32, image: 'assets/imovel-01.jpg', badge: 'Excelente localização',
    photos: ['assets/imovel-01.jpg', 'assets/galeria-01.jpg', 'assets/galeria-03.jpg', 'assets/galeria-06.jpg'],
    features: ['Cozinha funcional', 'Área de serviço', 'Boa iluminação', 'Região central'],
    description: 'Uma opção compacta e funcional para quem quer praticidade no dia a dia e fácil acesso à região central.'
  },
  {
    id: 2, code: 'MAG-102', purpose: 'aluguel', type: 'apartamento', title: 'Apartamento perto da UFLA', neighborhood: 'Centro', address: 'Rua Francisco Cardoso, 53 · Apto. 403', price: 1100, priceText: 'R$ 1.100', suffix: '/mês', beds: 3, baths: 2, garage: 1, area: 86, image: 'assets/imovel-02.jpg', badge: 'Destaque',
    photos: ['assets/imovel-02.jpg', 'assets/galeria-05.jpg', 'assets/galeria-03.jpg', 'assets/galeria-01.jpg'],
    features: ['Sala arejada', 'Cozinha independente', 'Área de serviço', 'Próximo à UFLA'],
    description: 'Ambientes bem distribuídos, boa iluminação e localização conveniente para a rotina de estudantes e famílias.'
  },
  {
    id: 3, code: 'MAG-103', purpose: 'aluguel', type: 'casa', title: 'Casa ampla no Bairro dos Ipês', neighborhood: 'Bairro dos Ipês', address: 'Rua 13 de Outubro, 26', price: 1800, priceText: 'R$ 1.800', suffix: '/mês', beds: 3, baths: 2, garage: 2, area: 148, image: 'assets/imovel-03.jpg', badge: 'Oportunidade',
    photos: ['assets/imovel-03.jpg', 'assets/galeria-02.jpg', 'assets/galeria-04.jpg', 'assets/galeria-06.jpg'],
    features: ['Garagem para 2 carros', 'Quintal', 'Sala ampla', 'Bairro residencial'],
    description: 'Casa confortável, com ambientes espaçosos e garagem para dois carros em região residencial tranquila.'
  },
  {
    id: 4, code: 'MAG-204', purpose: 'venda', type: 'casa', title: 'Casa contemporânea com jardim', neighborhood: 'Jardim Glória', address: 'Região do Jardim Glória', price: 498000, priceText: 'R$ 498.000', suffix: '', beds: 3, baths: 3, garage: 2, area: 186, image: 'assets/imovel-04.jpg', badge: 'Novo', isNew: true,
    photos: ['assets/imovel-04.jpg', 'assets/galeria-02.jpg', 'assets/galeria-04.jpg', 'assets/galeria-03.jpg', 'assets/galeria-06.jpg'],
    features: ['Jardim privativo', 'Espaços integrados', 'Suíte', 'Acabamento contemporâneo', 'Área gourmet'],
    description: 'Arquitetura contemporânea, integração entre os ambientes e área externa pensada para receber bem.'
  },
  {
    id: 5, code: 'MAG-205', purpose: 'venda', type: 'apartamento', title: 'Apartamento com vista e varanda', neighborhood: 'Vila São Francisco', address: 'Região da Vila São Francisco', price: 385000, priceText: 'R$ 385.000', suffix: '', beds: 2, baths: 2, garage: 1, area: 92, image: 'assets/imovel-05.jpg', badge: 'Bem localizado',
    photos: ['assets/imovel-05.jpg', 'assets/galeria-01.jpg', 'assets/galeria-05.jpg', 'assets/galeria-03.jpg'],
    features: ['Varanda', 'Vista aberta', 'Suíte', '1 vaga coberta'],
    description: 'Apartamento claro e acolhedor, com varanda e uma planta que aproveita muito bem cada espaço.'
  },
  {
    id: 6, code: 'MAG-306', purpose: 'aluguel', type: 'comercial', title: 'Sala comercial no coração da cidade', neighborhood: 'Centro', address: 'Região central de Lavras', price: 1500, priceText: 'R$ 1.500', suffix: '/mês', beds: 0, baths: 1, garage: 1, area: 65, image: 'assets/imovel-06.jpg', badge: 'Comercial',
    photos: ['assets/imovel-06.jpg', 'assets/galeria-01.jpg', 'assets/galeria-05.jpg'],
    features: ['Endereço estratégico', 'Ambiente versátil', 'Boa iluminação', 'Fácil acesso'],
    description: 'Espaço versátil para escritório ou atendimento, com acesso fácil e endereço estratégico no centro.'
  }
];

const state = { purpose: 'todos', type: 'todos', location: '', maxPrice: 0 };
const grid = document.querySelector('#property-grid');
const count = document.querySelector('#results-count');
const empty = document.querySelector('#empty-state');
const clearButton = document.querySelector('#clear-filters');
const modal = document.querySelector('#property-modal');
const modalContent = document.querySelector('#modal-content');
const favorites = new Set(JSON.parse(localStorage.getItem('magnoFavorites') || '[]'));

const icons = {
  bed: '<svg viewBox="0 0 24 24"><path d="M3 19v-7h18v7M3 16h18M6 12V7h5a3 3 0 0 1 3 3v2M3 19v2M21 19v2"/></svg>',
  bath: '<svg viewBox="0 0 24 24"><path d="M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM7 13V6a3 3 0 0 1 6 0M4 10h3"/></svg>',
  area: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M4 7h3l2-2h6l2 2h3v12H4z"/><circle cx="12" cy="13" r="3"/></svg>'
};

function normalize(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

function filteredProperties() {
  return properties.filter(p =>
    (state.purpose === 'todos' || p.purpose === state.purpose) &&
    (state.type === 'todos' || p.type === state.type) &&
    (!state.location || normalize(`${p.neighborhood} ${p.address}`).includes(normalize(state.location))) &&
    (!state.maxPrice || p.price <= state.maxPrice)
  );
}

function propertyCard(p) {
  const specs = [p.beds ? `<span>${icons.bed}${p.beds} quarto${p.beds > 1 ? 's' : ''}</span>` : '', `<span>${icons.bath}${p.baths} banheiro${p.baths > 1 ? 's' : ''}</span>`, `<span>${icons.area}${p.area} m²</span>`].join('');
  return `<article class="property-card" data-property="${p.id}" role="button" tabindex="0" aria-label="Ver mais informações e fotos de ${p.title}">
    <div class="property-image">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <span class="property-badge ${p.isNew ? 'new' : ''}">${p.badge}</span>
      <button class="favorite ${favorites.has(p.id) ? 'active' : ''}" type="button" data-favorite="${p.id}" aria-label="${favorites.has(p.id) ? 'Remover dos' : 'Adicionar aos'} favoritos">${icons.heart}</button>
      <span class="photo-count">${icons.camera}${p.photos.length} fotos</span>
    </div>
    <div class="property-body">
      <span class="property-location">${icons.pin}${p.neighborhood} · Lavras</span>
      <h3>${p.title}</h3>
      <div class="property-specs">${specs}</div>
      <div class="property-footer">
        <div class="property-price"><small>${p.purpose === 'aluguel' ? 'Aluguel' : 'Venda'}</small><strong>${p.priceText}</strong> <em>${p.suffix}</em></div>
        <button class="details-btn" type="button" data-details="${p.id}" aria-label="Ver detalhes de ${p.title}">→</button>
      </div>
    </div>
  </article>`;
}

function render() {
  const list = filteredProperties();
  grid.innerHTML = list.map(propertyCard).join('');
  grid.hidden = !list.length;
  empty.hidden = Boolean(list.length);
  count.textContent = `${list.length} ${list.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;
  clearButton.hidden = state.purpose === 'todos' && state.type === 'todos' && !state.location && !state.maxPrice;
}

function resetFilters() {
  Object.assign(state, { purpose: 'todos', type: 'todos', location: '', maxPrice: 0 });
  document.querySelector('#search-type').value = 'todos';
  document.querySelector('#search-location').value = '';
  document.querySelector('#search-price').value = '0';
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'todos'));
  render();
}

document.querySelectorAll('.search-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.search-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
}));

document.querySelector('#search-form').addEventListener('submit', e => {
  e.preventDefault();
  state.purpose = document.querySelector('.search-tab.active').dataset.purpose;
  state.type = document.querySelector('#search-type').value;
  state.location = document.querySelector('#search-location').value.trim();
  state.maxPrice = Number(document.querySelector('#search-price').value);
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.filter === state.purpose));
  render();
  document.querySelector('#imoveis').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active'); state.purpose = chip.dataset.filter; render();
}));

grid.addEventListener('click', e => {
  const favoriteButton = e.target.closest('[data-favorite]');
  const detailsButton = e.target.closest('[data-details]');
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    localStorage.setItem('magnoFavorites', JSON.stringify([...favorites]));
    render(); showToast(favorites.has(id) ? 'Imóvel salvo nos favoritos' : 'Imóvel removido dos favoritos'); return;
  }
  if (detailsButton) { openProperty(Number(detailsButton.dataset.details)); return; }
  const card = e.target.closest('[data-property]');
  if (card) openProperty(Number(card.dataset.property));
});

grid.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-property]')) {
    e.preventDefault(); openProperty(Number(e.target.dataset.property));
  }
});

let currentProperty = null;
let currentPhotoIndex = 0;
function openProperty(id) {
  const p = properties.find(item => item.id === id);
  currentProperty = p; currentPhotoIndex = 0;
  const message = encodeURIComponent(`Olá, tenho interesse no imóvel ${p.code}: ${p.title} — ${p.neighborhood}. Gostaria de mais informações e de agendar uma visita.`);
  const thumbnails = p.photos.map((photo, index) => `<button class="modal-thumb ${index === 0 ? 'active' : ''}" type="button" data-gallery-index="${index}" aria-label="Ver foto ${index + 1} de ${p.photos.length}"><img src="${photo}" alt="Foto ${index + 1} de ${p.title}"></button>`).join('');
  const features = p.features.map(feature => `<li><span>✓</span>${feature}</li>`).join('');
  modalContent.innerHTML = `<div class="modal-layout">
    <div class="modal-media">
      <div class="modal-main-photo">
        <img id="modal-main-image" src="${p.photos[0]}" alt="Foto 1 de ${p.title}">
        <button class="gallery-nav gallery-prev" type="button" data-gallery-nav="-1" aria-label="Foto anterior">‹</button>
        <button class="gallery-nav gallery-next" type="button" data-gallery-nav="1" aria-label="Próxima foto">›</button>
        <span class="photo-progress" id="photo-progress">1 / ${p.photos.length}</span>
      </div>
      <div class="modal-thumbnails" aria-label="Galeria de fotos">${thumbnails}</div>
    </div>
    <div class="modal-info">
      <div class="modal-meta"><span>${p.purpose === 'aluguel' ? 'Para alugar' : 'À venda'}</span><small>Cód. ${p.code}</small></div>
      <span class="property-location">${icons.pin}${p.neighborhood} · Lavras</span>
      <h2>${p.title}</h2>
      <p class="modal-address">${p.address}</p>
      <p>${p.description}</p>
      <div class="modal-specs"><span><strong>${p.beds || '—'}</strong> quarto(s)</span><span><strong>${p.baths}</strong> banheiro(s)</span><span><strong>${p.garage}</strong> vaga(s)</span><span><strong>${p.area}</strong> m²</span></div>
      <h3>Diferenciais do imóvel</h3>
      <ul class="modal-features">${features}</ul>
      <div class="modal-price">${p.priceText} <small>${p.suffix}</small></div>
      <a class="btn btn-primary btn-full" href="https://wa.me/5535988451665?text=${message}" target="_blank" rel="noopener">Agendar uma visita pelo WhatsApp →</a>
      <p class="modal-disclaimer">Imóvel e valores sujeitos à disponibilidade e confirmação.</p>
    </div>
  </div>`;
  modal.showModal(); document.body.classList.add('modal-open');
}

function updateGallery(index) {
  if (!currentProperty) return;
  currentPhotoIndex = (index + currentProperty.photos.length) % currentProperty.photos.length;
  const image = document.querySelector('#modal-main-image');
  image.src = currentProperty.photos[currentPhotoIndex];
  image.alt = `Foto ${currentPhotoIndex + 1} de ${currentProperty.title}`;
  document.querySelector('#photo-progress').textContent = `${currentPhotoIndex + 1} / ${currentProperty.photos.length}`;
  document.querySelectorAll('.modal-thumb').forEach((thumb, thumbIndex) => thumb.classList.toggle('active', thumbIndex === currentPhotoIndex));
}

modalContent.addEventListener('click', e => {
  const thumb = e.target.closest('[data-gallery-index]');
  const nav = e.target.closest('[data-gallery-nav]');
  if (thumb) updateGallery(Number(thumb.dataset.galleryIndex));
  if (nav) updateGallery(currentPhotoIndex + Number(nav.dataset.galleryNav));
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
modal.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') updateGallery(currentPhotoIndex - 1);
  if (e.key === 'ArrowRight') updateGallery(currentPhotoIndex + 1);
});
modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); currentProperty = null; });

document.querySelector('#owner-form').addEventListener('submit', e => {
  e.preventDefault(); const data = new FormData(e.currentTarget);
  const text = `Olá, meu nome é ${data.get('name')} e quero anunciar um imóvel.

Finalidade: ${data.get('purpose')}
Tipo: ${data.get('type')}
Endereço: ${data.get('street')}, ${data.get('number')}${data.get('complement') ? ` — ${data.get('complement')}` : ''}
Bairro: ${data.get('neighborhood')}
Cidade: ${data.get('city')}${data.get('zip') ? ` — CEP ${data.get('zip')}` : ''}
Quartos: ${data.get('bedrooms') || 'não informado'}
Banheiros: ${data.get('bathrooms') || 'não informado'}
Vagas: ${data.get('garage') || 'não informado'}
Área aproximada: ${data.get('area') ? `${data.get('area')} m²` : 'não informada'}
Informações adicionais: ${data.get('details') || 'nenhuma'}

Meu telefone: ${data.get('phone')}.`;
  window.open(`https://wa.me/5535988451665?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); mobileMenu.setAttribute('aria-hidden', String(!open));
});
mobileMenu.addEventListener('click', e => { if (e.target.closest('a')) { mobileMenu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); } });
clearButton.addEventListener('click', resetFilters); document.querySelector('#empty-clear').addEventListener('click', resetFilters);
document.querySelector('#year').textContent = new Date().getFullYear();
let toastTimer; function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200); }
render();
