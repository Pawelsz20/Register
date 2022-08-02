const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");


const showError = (input, msg) => {
  const formBox = input.parentElement
  const errorMess = formBox.querySelector('.error-text')

  formBox.classList.add('error')
  errorMess.textContent = msg
}

const clearError = (input) => {
  const formBox = input.parentElement
  formBox.classList.remove('error')
}

const checkLength = (input, min) => {
  if (input.value.length < min && input.value.length !== 0) {
    showError(input, `${input.previousElementSibling.innerHTML.slice(0, -1)} musi składać sie przynajmniej z ${min} znaków.`)
  }
}

const checkPass = (pass1, pass2) => {
  if (pass1.value.length !== pass2.value.length) {
    showError(pass2, 'Hasła nie są takie same')
  }
}

const checkMail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  if (re.test(email.value)) {
    clearError(email)
  } else if (email.value === '') {
    showError(email, email.placeholder)
  } else {
    showError(email, 'E-mail jest nieprawidłowy')
  }
}

const showPopup = () => {
  let count = 0
  const allInputs = document.querySelectorAll('.form-box')

  allInputs.forEach(el => {
    if (el.classList.contains('error')) {
        count++
      }
  })
  
  if (count === 0) {
     popup.classList.add('show-popup')
   }
}

const checkForm = (input) => {
  input.forEach(el => {
    if (el.value === '') {
      showError(el, el.placeholder)
    } else {
      clearError(el)
    }
  })
}

sendBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkForm([username, pass, pass2, email])
  checkLength(username, 3)
  checkLength(pass, 8)
  checkPass(pass, pass2)
  checkMail(email)
  showPopup()

})

clearBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const list = [username, pass, pass2, email].forEach(el => {
    el.value = ''
    clearError(el)
  })
})