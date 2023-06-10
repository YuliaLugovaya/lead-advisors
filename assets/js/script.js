// timer

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = "July 24 2023 00:00:00 GMT+0300";
initializeClock('countdown', deadline);




//form

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#form');
  const input = document.querySelector('#email');
  const btn = document.querySelector('.footer__input-button');
  const modalTitle = document.querySelector('.modal-title');
  const modalText = document.querySelector('.modal-body');
  form.addEventListener('submit', formSend);

  const modal = new bootstrap.Modal(document.querySelector('#exampleModal'));

  async function formSend(e) {
    e.preventDefault();

    if (input.classList.contains('valid')) {
      try {
        let response = await fetch("https://httpbin.org/post",
          {
            method: 'POST',
            body: JSON.stringify(input.value),
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          });

        let data = await response.json();
        console.log(data);
        form.reset();
        modal.show();
        modalTitle.innerHTML = `SUCCESS!`
        modalText.innerHTML = `You have successfully subscribed to the email newsletter!`
      } catch (error) {
        console.log(error);
        modal.show();
        modalTitle.innerHTML = `ERROR`
        modalText.innerHTML = `Try again!`
      }
    }
  }

  // function formValidate(form) {
  //   let error = 0;
  //   formRemoveError(input);
  //   if (emailTest(input)) {
  //     formAddError(input)
  //     error++;
  //   }
  //   if (input.classList.contains('valid')) {
  //     error = 0;
  //   }
  //   console.log(error);
  //   return error;

  // }

  // function formAddError(input) {
  //   input.parentElement.classList.add('_error');
  //   input.classList.add('_error');
  // }

  // function formRemoveError(input) {
  //   input.parentElement.classList.remove('_error');
  //   input.classList.remove('_error');
  // }

  // function emailTest(input) {
  //   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  // }
})


