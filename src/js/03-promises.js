import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formPromises = document.querySelector('.form')
let delayInput = document.querySelector('[name="delay"]')
let stepInput = document.querySelector('[name="step"]')
let amountInput = document.querySelector('[name="amount"]')


formPromises.addEventListener('submit', onCreatePromisesForm)

function onCreatePromisesForm (event){
  event.preventDefault();
  let delayResult  = delayInput.valueAsNumber;
  const stepResult = stepInput.valueAsNumber;
  const amountResult = amountInput.valueAsNumber;

for (let position = 0; position < amountResult; position += 1)
{createPromise(position, delayResult + stepResult * position )
 }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  }
  )
  promise
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}