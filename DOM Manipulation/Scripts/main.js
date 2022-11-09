const NameFieldId = "#Name";
const SurNameFieldId = "#SurName";
const AddresFieldId = "#Address";
const CityFieldId = "#City";



const CardHolderId = "#card__holder";

const buttonId = "#btn";

let users = [];

let Name = document.querySelector(NameFieldId);
let SurName = document.querySelector(SurNameFieldId);
let Addres = document.querySelector(AddresFieldId);
let City = document.querySelector(CityFieldId);



let cardHolder = document.querySelector(CardHolderId);


let button = document.querySelector(buttonId);

button.onclick = () => {
    //Валидация полей
    if(Name.value === ''){
        if(!Name.classList.contains("error-input")){
            Name.classList.add("error-input");
        }
    }else Name.classList.remove("error-input");

    if(SurName.value === ''){
        if(!SurName.classList.contains("error-input")){
            SurName.classList.add("error-input");
        }
    }else SurName.classList.remove("error-input");

    if(Addres.value === ''){
        if(!Addres.classList.contains("error-input")){
            Addres.classList.add("error-input");
        }
    }else Addres.classList.remove("error-input");

    if(Name.value === '' || SurName.value === '' || Addres.value === '' || City.value === '') return;


    //Создаем новый объект
    let user = {
        id: (users.length > 0) ? users[users.length - 1].id + 1 : 0,
        name: Name.value,
        surName: SurName.value,
        address: Addres.value,
        city: City.value,
    }

    

    //Добавляем созданный объект в массив
    users.push(user);
    cardHolder.append(CreateCard(user));
}

//Метод удаления карточки
function RemoveElement(id) {
    //Проверка на Null
    if(id === null) return;
    //Находим нужную карточку
    const card = cardHolder.querySelector(`#card_${id}`);

    //Удаляем карточку
    cardHolder.removeChild(card);

    //Удаляем объект из массива
    users.splice(id,1);
}

function CreateCard(user){
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `card_${user.id}`;
    card.innerHTML =`
    <div class="field">
        <span>Имя</span>
        <span id="NameText"></span> 
    </div>
    <div class="field">
        <span>Фамилия</span>
        <span id="SurnNameText"></span>
    </div>
    <div class="field">
        <span>Адресс</span>
        <span id="AddressText"></span>
    </div>
    <div class="field">
        <span>Город</span>
        <span id="CityText"></span>
    </div>
    <div class="field">
        <a class="btn blue" onclick="DisplayEditorCard(${user.id})">Редактировать</a>
        <a class="btn red" onclick="RemoveElement(${user.id})">Удалить</a>
    </div>`;
    card.querySelector('#NameText').insertAdjacentText('beforeend',user.name);
    card.querySelector('#SurnNameText').insertAdjacentText('beforeend',user.surName);
    card.querySelector('#AddressText').insertAdjacentText('beforeend',user.address);
    card.querySelector('#CityText').insertAdjacentText('beforeend',user.city);
    return card;
}

function DisplayEditorCard(id){
    //const user = users[id];
    const user = users.find(item => item.id == id);
    
    const editor = document.createElement('div');
    editor.classList.add('edit__card');
    editor.innerHTML = `
    <div class="editor">
        <h2>Редактировать</h2>
        <div class="field">
            <span>Имя</span>
            <input type="text" placeholder="Имя" id="Name">
        </div>
        <div class="field">
            <span>Фамилия</span>
            <input type="text" placeholder="Фамилия" id="SurName">
        </div>
        <div class="field">
            <span>Адресс</span>
            <input type="text" placeholder="Адресс" id="Address">
        </div>
        <div class="field">
            <span>Город</span>
            <select name="City" id="City">
                <option value="Самара">Самара</option>
                <option value="Москва">Москва</option>
                <option value="Уфа">Уфа</option>
            </select>
        </div>
        <div class="field field__btn">
            <a class="btn blue" onclick="SaveChanges(${user.id})">Сохранить</a>
            <a class="btn gray" onclick="CloseEditorCard()">Отмена</a>
        </div>
    </div>
    `;
    editor.style.opacity = 1;

    const editorNameField = editor.querySelector('#Name').value = user.name;
    const editorSurNameField = editor.querySelector('#SurName').value = user.surName;
    const editorAddressField = editor.querySelector('#Address').value = user.address;
    const editorCityField = editor.querySelector('#City').value = user.city;

    document.body.append(editor);
}

function SaveChanges(id) {
    const editor = document.querySelector('.edit__card');

    const editorNameField = editor.querySelector('#Name');
    const editorSurNameField = editor.querySelector('#SurName');
    const editorAddressField = editor.querySelector('#Address');
    const editorCityField = editor.querySelector('#City');

    const user = {
        name: editorNameField.value,
        surName: editorSurNameField.value,
        address: editorAddressField.value,
        city: editorCityField.value,
    }

    users[id] = user;

    const card = document.querySelector(`#card_${id}`);
    card.querySelector('#NameText').textContent = '';
    card.querySelector('#NameText').insertAdjacentText('beforeend',user.name);

    card.querySelector('#SurnNameText').textContent = '';
    card.querySelector('#SurnNameText').insertAdjacentText('beforeend',user.surName);
    
    card.querySelector('#AddressText').textContent = '';
    card.querySelector('#AddressText').insertAdjacentText('beforeend',user.address);

    card.querySelector('#CityText').textContent = '';
    card.querySelector('#CityText').insertAdjacentText('beforeend',user.city);

    CloseEditorCard();
}

function CloseEditorCard() {
    const editor = document.querySelector('.edit__card').remove();
}