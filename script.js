let container = document.getElementById('container')
const loader = document.getElementById('loader');
let url = window.location.toString();

// debug
console.log(url);
// debug

let date = new Date();
let responseFromPromise, dateFromPromise;

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

// debug
console.log(getNameFromUrl(url));
console.log(getResponse);
// debug

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
      let userName = document.createElement('h2');
      userName.innerHTML = getNameFromUrl(url);
      container.appendChild(userName);
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
      let text = document.createTextNode(getNameFromUrl(url));
      userUrl.appendChild(text);
      userUrl.href = 'https://github.com/' + getNameFromUrl(url);
      container.appendChild(userUrl);
    }
    createName();
    createDescription();
    createAvatar();
    createUrl();
  })
  .catch(err => alert('Информация о пользователе не доступна'))
  .then(res => {
    let createDate = document.createElement('p');
    createDate.innerHTML = dateFromPromise;
    container.appendChild(createDate);
    hideLoader();
  })