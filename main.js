const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"

const dataPanel = document.querySelector('#data-panel')

//1. 存取用戶資料並顯示
const users = []
axios
.get(INDEX_URL)
.then(response =>{
   users.push(...response.data.results)//存取
   showUsers(users)//顯示
})
.catch(err =>console.log(err))

//顯示用戶資料function
function showUsers(data){
  let panelContent = ''
  data.forEach(item =>{
    panelContent += `
       <div class="col">
        <div class="card mb-2" >
          <a href="#myModal" data-bs-toggle="modal" data-bs-target="#user-modal" data-id=${item.id} class="avatar">
            <img src=${item.avatar} class="card-img-top img-thumbnail h-100" alt="User Avatar">
          </a>
          <div class="card-body">
            <h5 class="card-title mb-4">${item.name}</h5>    
            <button type="button" class="btn btn-info btn-add-favorite" data-bs-toggle="modal" data-bs-target="#exampleModal">
              +
            </button>
          </div>
        </div>
      </div>
    `
  })
  dataPanel.innerHTML = panelContent
}

// 2. 互動視窗事件監聽
dataPanel.addEventListener('click', function onclickAvatar(event){
  if (event.target.matches('.img-thumbnail')){
    axios
      .get(INDEX_URL + event.target.parentElement.dataset.id)
      .then(response =>{
        showDescription(response.data)//顯示該用戶資訊
      })
      .catch(err => console.log(err))
  }
})

//顯示該用戶資訊function
function showDescription(data){
  const userName = document.querySelector('#user-modal-title')
  const userImage = document.querySelector('#user-modal-image')
  const userDescription = document.querySelector('#user-modal-description')
  userName.innerText = data.name
  userImage.src = data.avatar
  userDescription.innerText = `Surname:${data.surname}\n Email:${data.email}\n Gender:${data.gender}\n Age:${data.age}\n Region:${data.region}\n Birthday:${data.birthday}`
}