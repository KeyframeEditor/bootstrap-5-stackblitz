async function fetchGempa() {
  const API_URL = 'https://corsproxy.io/?' + encodeURIComponent('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.Infogempa.gempa[0];
  } catch(err) {
    console.log(err);
  }
}

async function fetchBerita(query) {
  const API_URL = `https://api.bing.microsoft.com/v7.0/news/search`;
  const API_KEY = '9f508fed787a4cfd9364a139d34cfb0e';
  const API_PARAMS = `?cc=ID&freshness=Week&sortBy=date&q=${encodeURIComponent(query)}`

  try {
    const response = await fetch(API_URL+API_PARAMS, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
      }
    });

    const data = await response.json();
    return data.value;

  } catch (err) {
    console.log(err);
  }
}

function getWilayah(wilayah) {
  const w = wilayah.split(' ')[3].split('-');
  return w.join(' ').toLowerCase();
}

async function app() {
  const gempa = await fetchGempa();
  showGempaCard(gempa);


  const wilayah = getWilayah(gempa.Wilayah);
  const berita = await fetchBerita(wilayah);
  showBeritaCard(berita);
}

function showGempaCard(data) {
  const el = document.querySelector('#gempa-card');
  const card =
    `<div>
      <h4 class="card-title card-title-dash">224 km BaratLaut MELONGUANE-SULUT</h4>
      <p class="card-subtitle card-subtitle-dash">${data.Tanggal} @ ${data.Jam}</p>
      <table class="table">
        <tbody>
          <tr>
            <td>Magnitude</td>
            <td>${data.Magnitude} SR</td>
          </tr>
          <tr>
            <td>Koordinat</td>
            <td>${data.Lintang} ${data.Bujur}</td>
          </tr>
          <tr>
            <td>Kedalaman</td>
            <td>${data.Kedalaman}</td>
          </tr>
          <tr>
            <td>Wilayah</td>
            <td>${data.Wilayah}</td>
          </tr>
          <tr>
            <td>Potensi</td>
            <td>${data.Potensi}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  el.innerHTML = card;
}

function showBeritaCard(data) {
  const el = document.querySelector('#berita-card');
  let result = '<h4 class="card-title  card-title-dash">Berita Gempa</h4>';

  data.forEach(news => {
    result+=
    `
      <a class="nav-link" href="${news.url}">
        <div class="list align-items-center border-bottom py-2">
          <div class="wrapper w-100">
            <p class="mb-2 font-weight-medium">
              ${news.name}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <i class="mdi mdi-calendar text-muted me-1"></i>
                <p class="mb-0 text-small text-muted">${(new Date(news.datePublished).toDateString())}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <i class="mdi mdi-mdi mdi-access-point text-muted me-1"></i>
                <p class="mb-0 text-small text-muted">${news.provider[0].name}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
  });
  el.innerHTML = result;
}

app();