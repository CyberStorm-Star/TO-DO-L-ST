
// Tüm Elementleri seçme
const form = document.querySelector("#todo-form");
const todoİnput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const todoEkle = document.querySelector("#todo-ekle");

eventListener();


function eventListener() {  // Tüm Event Listener
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keydown", filterTodos);
}
function filterTodos(e) {
    const searchText = e.target.value.toLowerCase(); // Bütün harfleri küçük harfe çevirme
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const todoText = listItem.textContent.toLowerCase();
        if (todoText.indexOf(searchText) === -1){

            //Bulamadı
            listItem.setAttribute("style","display : none !important");  // !important ile öncelikli sıraya koymuş olduk


        }else {
            listItem.setAttribute("style","display : block");
        }

    });

}
function deleteTodo(e) {

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove(); // Arayüzden Silme
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
}
function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1); //Arrayden değeri silebiliriz

        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);


    });

}
function addTodo(e) {
    const newTodo = todoİnput.value.trim();  // trim = başındaki ve sonundaki gereksiz boşlukları silmek

    if (newTodo === "") {

        //         <div class="alert alert-danger" role="alert">
        //   A simple danger alert—check it out!
        // </div>

        // alert("Bir Todo Ekleyin!");
        showAlert("danger", "Yapacak bir şeyin yok ise neden buradasın ?");

    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "TODO Eklendi");

    }



    e.preventDefault();
}
function getTodosFromStorage() { // Storageden bütün Todoları almış olucak 
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // Set Timeout
    // alert.remove();  // Alertin geri kaldırılması

    setTimeout(function () {
        alert.remove();     // Alertin Süre ile kaldırılması
    }, 3000);   // 3000 = 3s    1000 = 1s


}

function addTodoToUI(newTodo) { // String değerini list item olarak UI'ya ekleyecek
    // List item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";


    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);



    // Todo Lisst'e List Item'ı ekleme

    todoList.appendChild(listItem);

    todoİnput.value = "";  // todo girildikten sonra girilen metnin silinmesi


}

clearButton.addEventListener("click", clearAllTodos);

function clearAllTodos() {
    if (confirm("Tüm Taskları Temizlemek İstediğinizden Emin Misiniz?")) {
        // Todoları temizleme işlemleri burada yapılacak
        // Örneğin: localStorage'dan todos'u temizle
        localStorage.removeItem("todos");
        // UI'daki todoları temizle
        //todoList.innerHTML = "";  // Yavaş bir yöntem

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);  // Hızlı yöntem
        }
    }
}


