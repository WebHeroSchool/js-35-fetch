let body = document.body;
let url = window.location.toString();

let getNameFromUrl= (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1];  
  if(name == undefined) {
    name = 'EPShepelev';
   }
   return name;
}

let name = getNameFromUrl(url);

fetch('https://api.github.com/users/' + name)
  .then(res => res.json())
  .then(json => {
    avatar = json.avatar_url;
    userName = json.name;
    description = json.bio;
    url = json.url;
    
    let createName = () => {
      let userName = document.createElement('h2');
      userName.innerHTML = name;
      body.appendChild(userName);
    }
    let createDescription = () => {
      let userDescription = document.createElement('p');
      userDescription.innerHTML = description;
      body.appendChild(userDescription);
    }
    let createAvatar = () => {
      let userAvatar = document.createElement('img');
      let newString = document.createElement('br');
      userAvatar.src = avatar;
      body.appendChild(userAvatar);
      body.appendChild(newString);
    }
    let createUrl = () => {
      let userUrl = document.createElement('a');
      let text = document.createTextNode('profile');
      userUrl.appendChild(text);
      userUrl.href = 'https://github.com/' + name;
      body.appendChild(userUrl);
    }
    createName();
    createDescription();
    createAvatar();
    createUrl();
  })
  .catch(err => alert('Информация о пользователе недоступна')) 