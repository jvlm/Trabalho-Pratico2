document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault()
  var username = document.getElementById('input').value
  if (username != '') {
    console.log(username)
    searchUsers(username)
  }
})

function searchUsers(username) {
  const resultado = document.getElementById('result')
  resultado.empty
  fetch(`https://api.github.com/search/users?q=${username}+in:user&per_page=5`)
    .then(response => response.json())
    .then(data => {
      data.items.forEach(item => {
        resultado.innerHTML += `<div class="row">
<div class="col-xl-12 col-lg-12 col-md-12">
    <div class="cardB profile-header">
        <div class="body">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="profile-image float-md-right">    <img src="${item.avatar_url}" alt=""> </div>
              </div>
              <div class="col-lg-8 col-md-8 col-12">
                  <h3 class="m-t-0 m-b-0"><strong>${item.login}</strong></h3>
                  <br>
                  <div>
                  <a class="btn btn-primary btn-round"  href="${item.html_url}" target="_blank">Ver perfil</a>
                      
                  </div>
                  
              </div>                
          </div>
      </div>                    
  </div>
</div>
</div>`
      })
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    })
}

function montaPerfil(){
  let xhr = new XMLHttpRequest ()
  
  xhr.onload = function (){

    let data = JSON.parse(this.responseText)

    let perfil = `<div class="avatar-flip">
                    <img src="${data.avatar_url}" height="150" width="150">
                  </div>
                  <h2 id="nome">${data.name}</h2>
                  <h4 id="username">${data.login}</h4>
                  <p id="descricao">${data.bio}</p>
                  <a class="btn_saibamais" href="${data.html_url}" target="_blank">Saiba Mais</a>
                  <br>
                  <br>
                  <br>
                  <p></p>`

    document.getElementById ('perfil').innerHTML += perfil
  }
  xhr.onerror = function (){
    alert('Erro na requisição!')
  }
  xhr.open ('GET', 'https://api.github.com/users/jvlm')
  xhr.send ()
}
function montaRepositorio(){
  let xhr = new XMLHttpRequest ()
  
  xhr.onload = function (){

    let info = JSON.parse(this.responseText)
    let rep = ""
    let perfil = ""
    for (i=0; i<3; i++){
      let data
      data = info[i]['updated_at'][0]
      data += info[i]['updated_at'][1]
      data += info[i]['updated_at'][2]
      data += info[i]['updated_at'][3]
      data += info[i]['updated_at'][4]
      data += info[i]['updated_at'][5]
      data += info[i]['updated_at'][6]
      data += info[i]['updated_at'][7]
      data += info[i]['updated_at'][8]
      data += info[i]['updated_at'][9]
      rep += `<a href="${info[i]['html_url']}" target="_blank" id="posCards">
                    <div class="card" id="sobrepostoDepois">
                      <div class="box">
                        <div class="content">
                          <h3><em>${info[i]['name']}</em></h3>
                          <p>${info[i]['description']}</p>
                          <h6>Atualizado em: ${data}</h6>
                        </div>
                      </div>
                    </div>
                    </a>`
    
    }
    
    document.getElementById ('rep').innerHTML += rep
  }
  xhr.onerror = function (){
    alert('Erro na requisição!')
  }
  xhr.open ('GET', 'https://api.github.com/users/jvlm/repos')
  xhr.send ()
}   
window.onload = function montaTela(){
  montaPerfil()
  montaRepositorio()
}