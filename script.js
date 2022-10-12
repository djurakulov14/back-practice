// import {useHTTP} from './modules/useHTTP.js'
// let {request} = useHTTP()
let row1 = document.querySelector('.row1')
let row2 = document.querySelector('.row2')
let row3 = document.querySelector('.row3')
let form = document.forms.form

function fetchUsers() {
    axios.get('http://localhost:3001/users')
        .then(res => reload(res.data))
}
fetchUsers()

const createItem = (item) => {
    return (`
            <div class="box" id="${item.id}" >
                <div class="imgBlock">
                    <p class="name">${item.firstName}</p>
                    <img src="${item.image}" alt="" class="img">
                </div>
                <div class="ageBlock">
                    <p class="ages">age</p>
                    <p class="age">${item.age}</p>
                </div>
                <button class="del" >delete</button>
                <button class="edit" >edit</button>
            </div>
    `)
}
const reload = (arr) => {
    row1.innerHTML = ""
    row2.innerHTML = ""
    row3.innerHTML = ""

    for(let item of arr) {
        if(item.age < 25) {
            row1.innerHTML += createItem(item)
        } else if(item.age < 50) {
            row2.innerHTML += createItem(item)
        } else {
            row3.innerHTML += createItem(item)
        }
    }

    let edit_btn = document.querySelectorAll('.edit')

    edit_btn.forEach(btn => {
        btn.onclick = (event) => {
            let id = event.target.parentNode.id

            axios.patch('http://localhost:3001/users' + '/' + id, {
                firstName: "Nefor",
                image:"https://robohash.org/laboriosamfacilisrem.png"
            })
                .then(res => fetchUsers())
                .catch(err => console.log(err))
        }
    })


}
const postUser = (data) => {
    request('/users', "post", data)
        .then(res => console.log(res))

} 

form.onsubmit = event => {
    event.preventDefault()

    let arr = {
        id: Math.random(),
        image: 'https://robohash.org/aliquamcumqueiure.png'
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        arr[key] = value
    })
    
    postUser(arr)
}





// let {request} = useHTTP()

// request(users)
//     .then(res => console.log(res))