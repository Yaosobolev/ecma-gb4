"use strict";

class User {
  static #list = [];
  id;
  username;
  name;
  phone;
  constructor(data) {
    // Задание 1 "Получение данных о пользователе"

    /* Реализуйте функцию getUserData, которая принимает идентификатор пользователя (ID)
        в качестве аргумента и использует fetch для получения данных о пользователе с
        заданным ID с удаленного сервера. Функция должна возвращать промис, который разрешается
        с данными о пользователе в виде объекта. Если пользователь с указанным ID не найден,
        промис должен быть отклонен с соответствующим сообщением об ошибке.
        
        Подсказка, с последовательностью действий:
        getUserData использует fetch для получения данных о пользователе с удаленного сервера.
        Если запрос успешен (с кодом 200), функция извлекает данные из ответа с помощью
        response.json() и возвращает объект с данными о пользователе. Если запрос неуспешен,
        функция отклоняет промис с сообщением об ошибке. */

    async function getUserData(ID) {
      const responce = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const users = await responce.json();
      if (responce.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        const user = users.find((el) => el.id === ID);
        console.log(user === undefined ? "Пользователь не найден" : user);
      }
    }
    getUserData(10);
    getUserData(25);

    // --------------------------------------------------------------------
    // Задание 2 "Отправка данных на сервер"
    /* 
        Реализуйте функцию saveUserData, которая принимает объект с данными о пользователе в
        качестве аргумента и использует fetch для отправки этих данных на удаленный сервер для
        сохранения. Функция должна возвращать промис, который разрешается, если данные успешно
        отправлены, или отклоняется в случае ошибки.
        
        Пример использования функции:
        const user = {
        name: 'John Smith',
        age: 30,
        email: 'john@example.com'
        };
        saveUserData(user)
        .then(() => {
        console.log('User data saved successfully');
        })
        .catch(error => {
        console.log(error.message);
        });
        
        saveUserData использует fetch для отправки данных о пользователе на удаленный сервер
        для сохранения. Она отправляет POST-запрос на URL-адрес /users с указанием типа
        содержимого application/json и сериализует объект с данными о пользователе в
        JSON-строку с помощью JSON.stringify(). Если запрос успешен (с кодом 200), функция
        разрешает промис. Если запрос неуспешен, функция отклоняет промис с сообщением */

    // --------------------------------------------------------------------

    async function saveUserData(user, url) {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Что-то пошло не так: " + response.status);
      } else {
        console.log(response.status);
      }
    }
    const user = {
      name: "John Smith",
      age: 30,
      email: "john@example.com",
    };
    const url1 = "https://jsonplaceholder.typicode.com/us";
    const url2 = "https://jsonplaceholder.typicode.com/users";

    saveUserData(user, url1)
      .then(() => {
        console.log("User data saved successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });

    saveUserData(user, url2)
      .then(() => {
        console.log("User data saved successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });

    // --------------------------------------------------------------------
    // Задание 3 "Изменение стиля элемента через заданное время"

    /* Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента и
        время задержки (в миллисекундах) в качестве аргументов. Функция должна изменить
        стиль элемента через указанное время.
        Пример использования функции
        changeStyleDelayed('myElement', 2000); // Через 2 секунды изменяет стиль элемента
        с id 'myElement' */

    // --------------------------------------------------------------------

    const btnEl = document.querySelector(".btn");
    btnEl.addEventListener("click", () => {
      changeStyleDelayed("my-element", 1000);
    });
    function changeStyleDelayed(nameClass, time) {
      const divEl = document.querySelector(`.${nameClass}`);
      setTimeout(() => {
        divEl.classList.toggle("colorBlue");
      }, time);
    }
    this.id = data.id;
    this.username = data.username;
    this.name = data.name;
    this.phone = data.phone;
    User.#create(this);
  }
  static getList() {
    return User.#list.filter((e) => e.obj !== null);
  }
  static #remove(id) {
    const user = User.#list.find((e) => Number(e.id) === Number(id));
    user.obj.remove();
    user.obj = null;
  }
  static #create(obj) {
    console.log("@create");
    const usernameEl = User.#createBlock(obj.username);
    const nameEl = User.#createBlock(obj.name);
    const phoneEl = User.#createBlock(obj.phone);
    const removeEl = User.#createEl(
      "button",
      {
        innerHTML: "remove",
      },
      {
        background: "none",
        color: "#D23030",
        border: "1px solid #D23030",
        borderRadius: "5px",
      }
    );

    removeEl.addEventListener("click", (e) => {
      User.#remove(e.currentTarget.parentElement.id.slice(5));
      console.log("USERS", User.getList());
    });

    obj.obj = User.#createEl(
      "div",
      {
        id: `user-${obj.id}`,
      },
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "600px",
        padding: "5px 10px",
      }
    );
    [usernameEl, nameEl, phoneEl, removeEl].forEach((e) =>
      obj.obj.appendChild(e)
    );

    document.body.append(obj.obj);
    User.#list.push(obj);
  }
  static #createBlock(value) {
    return User.#createEl(
      "div",
      {
        innerHTML: `${value}`,
      },
      {
        display: "flex",
        minWidth: "200px",
      }
    );
  }
  static #createEl(el, data = {}, style = {}) {
    const obj = document.createElement(el);
    Object.entries(data).forEach((e) => (obj[e[0]] = e[1]));
    Object.entries(style).forEach((e) => (obj.style[e[0]] = e[1]));
    return obj;
  }
}

class Request {
  #request = new XMLHttpRequest();
  #method;
  #url;
  #data;
  constructor(method, url) {
    this.#method = method;
    this.#url = url;
    this.#request.onload = () => this.#load();
    this.#request.onerror = () => this.#error("Request error");
    this.#request.ontimeout = () => this.#error("Timeout");
    // this.#request.onreadystatechange = () => {
    //     if (this.#request.readyState === 3) {
    //         // load
    //     } else if (this.#request.readyState === 4) {
    //         func
    //     }
    // };
    this.#request.open(this.#method, this.#url);
  }
  send(data = null) {
    this.#data = {
      status: null,
      data: null,
      error: null,
    };
    this.#request.send(data);
  }
  #load() {
    this.#data.status = this.#request.status;
    if (this.#data.status === 200) {
      this.#data.data = JSON.parse(this.#request.response);
      // USERS
      this.#data.data.forEach((e) => new User(e));
    } else {
      this.#data.error = this.#request.statusText;
    }
  }
  #error(message) {
    console.error(message);
    this.#data.status = this.#request.status;
    this.#data.error = message;
  }
  getData() {
    return this.#data;
  }
}

const request = new Request(
  "GET",
  "https://jsonplaceholder.typicode.com/users"
);
request.send();
