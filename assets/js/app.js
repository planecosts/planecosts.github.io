function calculate() {
    alert('submitted!')
}

function init() {
    document.getElementById('.dkh-form-footer').onsubmit = calculate
}

window.onload = init
