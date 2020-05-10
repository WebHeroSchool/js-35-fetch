const container = document.getElementById('container')
const body = document.body;
const loader = document.getElementById('loader');
const url = window.location.toString();
const date = new Date();
const responseFromPromise, dateFromPromise;

let hideLoader = () => {
	loader.style.display = 'none';
}

let getNameFromUrl= (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1];  
  if(name == undefined) {
    name = 'EPShepelev';
   }
   return name;
}

let getDate = new Promise((resolve, reject) =>
  setTimeout(() => date ? resolve(date) : reject('Дата неизвеста'), 3000)
);

let getResponse = fetch('https://api.github.com/users/' + getNameFromUrl(url));

Promise.all([getResponse, getDate])
  .then(([response, date]) => {
    responseFromPromise = response;
    dateFromPromise = date;
  })
  .then(res => responseFromPromise.json())
  .then(json => {
    avatar = json.avatar_url;
    userName = json.name;
    description = json.bio;
    url = json.url;

    let createName = () => {
      let userSetName = document.createElement('h2');
      userSetName.innerHTML = userName;
      container.appendChild(userSetName);
      
    }
    let createDescription = () => {
      let userDescription = document.createElement('p');
      userDescription.innerHTML = description;
      container.appendChild(userDescription);
    }
    let createAvatar = () => {
      let userAvatar = document.createElement('img');
      let newString = document.createElement('br');
      userAvatar.src = avatar;
      container.appendChild(userAvatar);
      container.appendChild(newString);
    }
    let createUrl = () => {
      let userUrl = document.createElement('a');
      let text = document.createTextNode(userName);
      userUrl.appendChild(text);
      userUrl.href = 'https://github.com/' + getNameFromUrl(url);
      container.appendChild(userUrl);
    }
    createName();
    createDescription();
    createAvatar();
    createUrl();
  })
  .then(res => {
    let createDate = document.createElement('p');
    createDate.innerHTML = dateFromPromise;
    body.appendChild(createDate);
    hideLoader();
  })
  .catch(err => alert('Информация о пользователе не доступна'))