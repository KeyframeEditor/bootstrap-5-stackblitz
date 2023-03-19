async function fetchGempa() {
    const API_URL = 'https://corsproxy.io/?' + encodeURIComponent('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data.Infogempa.gempa[0]);
  
    } catch(err) {
      console.log(err);
    }
  }
  
  async function fetchNews(query) {
    const API_URL = `https://api.bing.microsoft.com/v7.0/news/search`;
    const API_KEY = '9f508fed787a4cfd9364a139d34cfb0e';
    const API_PARAMS = `?cc=ID&freshness=Week&q=${encodeURIComponent(query)}`
  
    try {
      const response = await fetch(API_URL+API_PARAMS, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': API_KEY,
        }
      });
  
      const data = await response.json();
      console.log(data.value[0].name);
  
    } catch (err) {
      console.log(err);
    }
  }