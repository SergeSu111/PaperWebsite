// for front-end request of submit
let myForm = document.querySelector("form"); // grab the form 


myForm.addEventListener("submit", submit); // 每当提交form的submit 就调用submit函数 来给server 请求
async function submit(event)
{

    event.preventDefault();  //阻止提交默认表单

    var username = document.getElementById('name').value;
    // do a post fetch 
        const response = await fetch(`/submit_form/${username}`, {
            method: 'POST',
            body: new FormData(event.target) // formData is json object?
        });
        if (response.ok)
        {
            localStorage.setItem("username", username);  // Store username in localStorage
            socket.send(JSON.stringify({ username: localStorage.getItem("username")}));
            console.log("The form is submitted successfully."); 
            //alert("The form is submitted successfully.");
        }
        else
        {
            console.error("The form is submitted failed: ", response.statusText);
            // response.statusText 返回状态码的描述 而response.status只返回状态码
        }
    }


function displayQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }

  displayQuote();
  let socket;
  function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            const text = message.username;
            displayMsg(text + " submit the suggestion.");
        };
    }

configureWebSocket();
  function displayMsg(msg) {
    const chatText = document.querySelector(".web_socket");
    chatText.innerHTML +=
    `<div class="event"><span class="player-event">${msg}</span></div>`;
  }

