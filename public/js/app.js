console.log('Client-side javascript loaded from /public/js/app.js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const output1 = document.querySelector('#output1')
const output2 = document.querySelector('#output2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loc = search.value

    output1.textContent = 'Loading...'
    output2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                output1.textContent = data.error
            } else {
                output1.textContent = data.location
                output2.textContent = data.forecast
            }
        })
    })
})