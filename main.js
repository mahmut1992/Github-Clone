const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);

    createUserCard(data);
    getRepos(username);
  } catch (error) {
    createErrCard("Aradığınız Kullanıcı bulunamadı...!");
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = ` <div class="card">
        <img
          class="user-image"
          src="${user.avatar_url}"
          alt=""
        />
        <div class="user-info">
          <div class="user-name">
            <h2> ${user.name}</h2>
            <small>${user.login} </small>
          </div>
        </div>
        <p>
          ${user.bio}
        </p>
        <ul>
          <li>
            <i class="fa-solid fa-user-group"></i> ${user.followers} <strong>Followers</strong>
          </li>
          <li>${user.following} <strong>Following</strong></li>
          <li>
            <i class="fa-solid fa-bookmark"></i>${user.public_repos} <strong>Repository</strong>
          </li>
        </ul>

        <div class="repos" id="repos"></div>
      </div>`;
  main.innerHTML = cardHTML;
}

function createErrCard(msg) {
  const cardErrHTML = `
    <div class="card">
    <h2>${msg}</h2>
    </div>
    
    `;
  main.innerHTML = cardErrHTML;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    addReposToCard(data);
  } catch (error) {
    createErrCard("Üzgünüz Repoları Çekerken beklenmedik Bir Hata Oluştu...!");
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repo.name} `;

    reposEl.appendChild(reposLink);
  });
}
