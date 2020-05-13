const container = document.getElementById('container')
const body = document.body;
const url = window.location.toString();
const date = new Date();
const loader = document.getElementById('loader');
let responseFromPromise, dateFromPromise;

const hideLoader = () => {
	loader.style.display = 'none';
}

const getNameFromUrl= (url) => {
  let getUrl = url.split('=');
  let userNameOnString = getUrl[1];  
  if(userNameOnString == undefined) {
    userNameOnString = 'EPShepelev';
   }
   return userNameOnString;
}

const getDate = new Promise((resolve, reject) =>
  setTimeout(() => date ? resolve(date) : reject('Дата неизвеста'), 3000)
);

const getResponse = fetch(`https://api.github.com/users/${getNameFromUrl(url)}`);

Promise.all([getResponse, getDate])
  .then(([response, date]) => {
    responseFromPromise = response;
    dateFromPromise = date;
  })
  .then(res => responseFromPromise.json())
  .then(json => {
    avatar = json.avatar_url;
    // userName = json.name;
    description = json.bio;
    UserUrl = json.url;
    const createName = () => {
      const userName = document.createElement('h2');
      userName.innerHTML = getNameFromUrl(url);
      container.appendChild(userName);
    }
    const createDescription = () => {
      const userDescription = document.createElement('p');
      userDescription.innerHTML = description;
      container.appendChild(userDescription);
    }
    const createAvatar = () => {
      const userAvatar = document.createElement('img');
      const newString = document.createElement('br');
      userAvatar.src = this.avatar;
      container.appendChild(userAvatar);
      container.appendChild(newString);
    }
    const createUrl = () => {
      const UrlToUser = document.createElement('a');
      const textOfUrl = document.createTextNode(getNameFromUrl(url));
      UrlToUser.appendChild(textOfUrl);
      UrlToUser.href = 'https://github.com/' + getNameFromUrl(url);
      container.appendChild(UrlToUser);
    }
    createName();
    createDescription();
    createAvatar();
    createUrl();
  })
  .then(res => {
    const date = document.createElement('p');
    date.innerHTML = dateFromPromise;
    container.appendChild(date);
    hideLoader();
  })
  .catch(err => alert('Информация о пользователе не доступна'));