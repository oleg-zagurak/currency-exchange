const f1 = document.forms.form;
const URL = '/api/';

function validation() {
    let value = f1.elements.amount.value;
    let reg = new RegExp(/^((\d+)|(\d+\.?\d{1,2}))$/);
    if (value === '') {
        console.log(value)
        f1.elements.amount.classList.remove('error');
        f1.elements.amount.classList.remove('correct');
    } else {
        if (reg.test(value)) {
            f1.elements.submit.removeAttribute('disabled');
            f1.elements.amount.classList.remove('error');
            f1.elements.amount.classList.add('correct');
        } else {
            f1.elements.submit.setAttribute('disabled', 'disabled');
            f1.elements.amount.classList.remove('correct');
            f1.elements.amount.classList.add('error');
        }
    }
}

function createTableExchange(data) {
    let table = ``;
    document.querySelector('.res tbody').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        table += `
            <tr>
                <td>${obj.amount}</td><td>${obj.sum} ${obj.translatedCcy}</td>
            </tr>
            `;
    }
    table += `</table>`;
    document.querySelector('.res tbody').innerHTML += table;
    document.querySelector('.res').classList.remove('hide');
}

async function request() {
    try {
        let amount = f1.elements.amount.value;
        f1.elements.amount.value = '';
        f1.elements.amount.classList.remove('correct');
        f1.elements.submit.setAttribute('disabled', 'disabled');
        const response = await fetch(`${URL}${amount}`);
        let data = await response.json();
        createTableExchange(data);
    } catch (e) {
        console.warn('Error: ', e.message);
    }
}
f1.elements.amount.addEventListener('input', validation);
f1.elements.submit.addEventListener('click', request);