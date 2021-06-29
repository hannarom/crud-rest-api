const url = "https://reqres.in/api/users";
const usersWraper = document.getElementById("users-wrapper");
const btnCreate = document.getElementById("btn-create");
const btnUpdate = document.getElementById("btn-update");
let usersList = [];


btnCreate.addEventListener("click", () => {
    createUser();
});

btnUpdate.addEventListener("click", () => {
    updateUser();
});

// GET
const getUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            usersList = json.data;
            let inner = "";
            usersList.forEach(item =>{
                inner += createTemplate(item)
            });
            usersWraper.insertAdjacentHTML("beforeend", inner);
        })
        .then(() => {
            const btnDelete = document.querySelectorAll(".btn-delete");
            for(let elem of btnDelete) {
                elem.addEventListener("click", e => {
                    let idElem = e.target.parentNode.dataset.id;
                    deletePost(idElem)
                })
            }
        })
}

// DELETE
const deletePost = id => {
    fetch(`${url}/${id}`, {
        method : "DELETE" 
    })
}

// CREATE
const createUser = () => {
    const inputName = document.getElementById("new_username").value;
    const inputJob = document.getElementById("job").value;

    const raw = {
        name: inputName,
        job: inputJob,
    };
    
    addOrUpdateData(raw, "POST");
    document.getElementById("form-create").reset();
}

// UPDATE
const updateUser = () => {
    const inputName = document.getElementById("updateUsername").value;
    const inputJob = document.getElementById("updateJob").value;
    const inputId = document.getElementById("updateId").value;

    const raw = {
        name: inputName,
        job: inputJob,
    };
    
    addOrUpdateData(raw, "PUT", inputId);
    document.getElementById("form-update").reset();
}

const addOrUpdateData = (data, method, userId = "") => {
    const requestOptions = {
        method,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    };
    
    fetch(`${url}/${userId}`, requestOptions)
        .then(response => response.json());
}

const createTemplate = data => {
    return template = `
        <div class="user">
            <div class="user__img">
                <img src="${data.avatar}" alt="${data.first_name}" class="user__avatar">
            </div>
            <div class="user__data" data-id=${data.id}>
                <h3 class="user__firstname">FirstName: ${data.first_name}</h3>
                <h3 class="user__firstname">LastName: ${data.last_name}</h3>
                <p class="user__ID">ID: ${data.id}</p>
                <p class="user__email">E-Mail <a href="mailto: ${data.email}" class="user__email-link">${data.email}</a></p>
                <button class="btn-delete">Delete User</button>
            </div>
        </div>
    `
}

getUsers();


// получается следующее:
// вся проблема была в функции getUsers, с innerHTML есть нюанс, я охерел пока его вспомнил(нагуглил и потом вспомнил что я его помню)
// итак, после того, как ты добавляешь блоки с инфой о юзере с помощью innerHTML, теряются ссылки, которые прописаны в addEventListener
// (см. https://stackoverflow.com/a/63965257/4958560) 

// поэтому надо записывать эти блоки чемто другим, например insertAdjacentHTML или через createElement (через него не очень, потому что надо добавить еще один div)

// в этом и была вся трабла, но в том примере что ты скинула с лекции, отрабатывает, я затрудняюсь сказать почему, потому что там отрабатывает, возможно
// зависит от самого апи, но это не точно

// задавай вопросы