const orders = [
  {
    id: 'ORD-2408',
    route: 'Delhi NCR → Mumbai',
    material: 'FMCG cartons',
    truck: '32 ft Multi Axle',
    rate: '₹78,500',
    status: 'In Transit',
    eta: '17h 35m',
    owner: 'Raj Roadlines',
  },
  {
    id: 'ORD-2411',
    route: 'Chennai → Pune',
    material: 'Auto parts',
    truck: '20 ft Container',
    rate: '₹54,200',
    status: 'Loading',
    eta: '31h 10m',
    owner: 'Western Carriers',
  },
  {
    id: 'ORD-2418',
    route: 'Ahmedabad → Kolkata',
    material: 'Industrial machinery',
    truck: '40 ft Trailer',
    rate: '₹1,28,000',
    status: 'Truck Assigned',
    eta: '46h 45m',
    owner: 'East India Fleet',
  },
];

const rates = [
  { lane: 'Delhi NCR → Mumbai', vehicle: '32 ft Multi Axle', price: '₹78,500', time: '32-38 hrs' },
  { lane: 'Bengaluru → Hyderabad', vehicle: '20 ft Container', price: '₹32,800', time: '10-13 hrs' },
  { lane: 'Ahmedabad → Kolkata', vehicle: '40 ft Trailer', price: '₹1,28,000', time: '44-50 hrs' },
  { lane: 'Chennai → Pune', vehicle: '20 ft Container', price: '₹54,200', time: '28-34 hrs' },
];

const trucks = [
  {
    id: 'GJ-01-FT-8891',
    owner: 'Raj Roadlines',
    route: 'Delhi NCR → Mumbai',
    origin: 'Delhi NCR',
    destination: 'Mumbai',
    current: 'Jaipur Bypass',
    available: 'After Mumbai unloading',
    capacity: '32 ft / 18 MT',
    etaOrigin: 'Available at origin now',
    etaDestination: '17h 35m',
    progress: 42,
    status: 'In Transit',
  },
  {
    id: 'MH-12-LK-4568',
    owner: 'Western Carriers',
    route: 'Chennai → Pune',
    origin: 'Chennai',
    destination: 'Pune',
    current: 'Krishnagiri Toll',
    available: 'Chennai warehouse',
    capacity: '20 ft / 9 MT',
    etaOrigin: '2h 20m to origin',
    etaDestination: '31h 10m',
    progress: 18,
    status: 'Loading',
  },
  {
    id: 'WB-19-TR-3021',
    owner: 'East India Fleet',
    route: 'Ahmedabad → Kolkata',
    origin: 'Ahmedabad',
    destination: 'Kolkata',
    current: 'Vadodara NE-1',
    available: 'Ahmedabad Ring Road',
    capacity: '40 ft / 25 MT',
    etaOrigin: '1h 05m to origin',
    etaDestination: '46h 45m',
    progress: 9,
    status: 'Truck Assigned',
  },
];

let selectedRole = 'booking';
let selectedTruckIndex = 0;
let tick = 0;

const orderList = document.querySelector('#orderList');
const rateTable = document.querySelector('#rateTable');
const truckSelect = document.querySelector('#truckSelect');
const trackingDetails = document.querySelector('#trackingDetails');
const truckMarker = document.querySelector('#truckMarker');
const ownerActions = document.querySelector('#ownerActions');
const loginButton = document.querySelector('#loginButton');

function renderOrders() {
  orderList.innerHTML = orders.map((order) => `
    <article class="order-card">
      <div class="order-card__top">
        <div>
          <h3>${order.id}</h3>
          <p>${order.route}</p>
        </div>
        <span class="status-pill">${order.status}</span>
      </div>
      <div class="meta-grid">
        <div><span>Material</span><strong>${order.material}</strong></div>
        <div><span>Truck Type</span><strong>${order.truck}</strong></div>
        <div><span>Rate / ETA</span><strong>${order.rate} · ${order.eta}</strong></div>
      </div>
    </article>
  `).join('');
}

function renderRates() {
  rateTable.innerHTML = rates.map((rate) => `
    <div class="rate-row">
      <div>
        <strong>${rate.lane}</strong>
        <small>${rate.vehicle} · ${rate.time}</small>
      </div>
      <strong>${rate.price}</strong>
    </div>
  `).join('');
}

function renderTruckOptions() {
  truckSelect.innerHTML = trucks.map((truck, index) => `
    <option value="${index}">${truck.id} · ${truck.route}</option>
  `).join('');
}

function renderTracking() {
  const truck = trucks[selectedTruckIndex];
  const progress = Math.min(98, truck.progress + (tick % 8));
  const x = 90 + (206 * progress / 100);
  const y = 102 + (242 * progress / 100) + Math.sin(progress / 9) * 24;

  truckMarker.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  trackingDetails.innerHTML = `
    <article class="truck-card">
      <div class="truck-card__top">
        <div>
          <h3>${truck.id}</h3>
          <p>${truck.owner} · ${truck.capacity}</p>
        </div>
        <span class="status-pill ${truck.status === 'Loading' ? 'status-pill--blue' : ''}">${truck.status}</span>
      </div>
      <div class="progress-track" aria-label="Route progress">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="meta-grid">
        <div><span>Current Location</span><strong>${truck.current}</strong></div>
        <div><span>Available At</span><strong>${truck.available}</strong></div>
        <div><span>ETA to Origin</span><strong>${truck.etaOrigin}</strong></div>
      </div>
      <div class="meta-grid">
        <div><span>Origin</span><strong>${truck.origin}</strong></div>
        <div><span>Destination</span><strong>${truck.destination}</strong></div>
        <div><span>ETA to Destination</span><strong>${truck.etaDestination}</strong></div>
      </div>
    </article>
  `;
}

function renderOwnerActions() {
  ownerActions.innerHTML = trucks.map((truck, index) => `
    <article class="owner-card">
      <strong>${truck.id}</strong>
      <p>${truck.current}</p>
      <p><strong>${truck.capacity}</strong> · ${truck.status}</p>
      <button class="button ${index === selectedTruckIndex ? 'button--primary' : ''}" type="button" data-owner-truck="${index}">
        ${index === selectedTruckIndex ? 'Tracking Live' : 'Track / Accept Load'}
      </button>
    </article>
  `).join('');
}

function setRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach((card) => {
    const isActive = card.dataset.role === role;
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-selected', String(isActive));
  });
  loginButton.textContent = `Continue as ${role === 'booking' ? 'Booking Party' : 'Truck Owner'}`;
}

function initEvents() {
  document.querySelectorAll('.role-card').forEach((card) => {
    card.addEventListener('click', () => setRole(card.dataset.role));
  });

  truckSelect.addEventListener('change', (event) => {
    selectedTruckIndex = Number(event.target.value);
    tick = 0;
    renderTracking();
    renderOwnerActions();
  });

  ownerActions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-owner-truck]');
    if (!button) return;
    selectedTruckIndex = Number(button.dataset.ownerTruck);
    truckSelect.value = selectedTruckIndex;
    setRole('owner');
    renderTracking();
    renderOwnerActions();
  });

  document.querySelector('#refreshRates').addEventListener('click', () => {
    rates.push(rates.shift());
    renderRates();
  });
}

function boot() {
  renderOrders();
  renderRates();
  renderTruckOptions();
  renderTracking();
  renderOwnerActions();
  initEvents();
  window.setInterval(() => {
    tick += 1;
    renderTracking();
  }, 2200);
}

boot();
