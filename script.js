var map = L.map('map').setView([-24.9555, -53.4552], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

map.on('click', function(e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  var form = `
    <b>Cadastro de Ponto</b><br>
    <label>Nome: </label><input type="text" id="nome"><br>
    <label>Email: </label><input type="email" id="email"><br>
    <button onclick="salvar(${lat}, ${lng})">Salvar</button>
  `;

  L.popup()
    .setLatLng(e.latlng)
    .setContent(form)
    .openOn(map);
});

function salvar(lat, lng) {
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;

  L.marker([lat, lng]).addTo(map)
    .bindPopup(`<b>${nome}</b><br>${email}`).openPopup();

  map.closePopup();
}
