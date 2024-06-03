document.addEventListener('DOMContentLoaded', () => {
  const roomName = window.location.pathname.substring(1);
  const messagesContainer = document.getElementById('messages');

  async function fetchMessages() {
    const response = await fetch(`/${roomName}/messages`);
    const messages = await response.json();
    messagesContainer.innerHTML = '';
    messages.forEach(msg => {
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${msg.user}</strong>: ${msg.content} <em>(${msg.time})</em>`;
      messagesContainer.appendChild(messageElement);
    });
  }

async function postMessage(nickname, body) {
  await fetch(`/${roomName}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user, content, time: new Date().toISOString() })
  });
  fetchMessages();
}

setInterval(fetchMessages, 3000);

  // document.getElementById('message-form').addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const user = event.target.elements.user.value;
  //   const content = event.target.elements.message.value;
  //   postMessage(user, content);
  //   event.target.reset();
  // });

  // document.getElementById('message-form').addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const user = event.target.querySelector('input[name="user"]').value;
  //   const content = event.target.querySelector('input[name="content"]').value;
  //   postMessage(user, content);
  //   event.target.reset();
  // });

// document.getElementById('message-form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const form = event.target;
//   const user = form.querySelector('#user').value; // Selecting by ID
//   const content = form.querySelector('#content').value; // Selecting by ID
//   const time = new Date().toLocaleString();

//   await fetch(`/${roomName}/messages`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ user, content, time })
//   });

//   form.querySelector('#content').value = ''; // Clearing the content input field
//   fetchMessages();
// });

// fetchMessages();
// });


  document.getElementById('message-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const user = form.querySelector('#user').value; // Selecting by ID
    const content = form.querySelector('#content').value; // Selecting by ID
    const time = new Date().toLocaleString();
  
    await fetch(`/${roomName}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, content, time })
    });
  
    form.querySelector('#content').value = ''; // Clearing the content input field
    fetchMessages();
  });

fetchMessages();
});