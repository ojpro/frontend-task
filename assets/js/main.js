/* Users objects array */
let users = [
    {
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
    {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
]

// jQuery shortcut selector
let $ = (el) => document.querySelector(el);

// define necessary element
let tableBody = $('.users_list table tbody')
let modal = $('#modalBox');
let form = $('#form')
// helper functions

/**
 * Format date into our local standard
 * @param date
 * @returns {string}
 */

function formatDate(date) {
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString('fr-FR')
}

/**
 * Method to generate random numbers based on the passed length
 * @return int
 */
function randomInt(length) {
    return Math.floor(Math.random() * Math.pow(10, length));
}

/**
 * Toggle modal visibility
 */
function toggleModal() {
    modal.classList.toggle('hidden')
}

// list users from users array in the table's body
function listUsers() {
    // empty the table body
    tableBody.innerHTML = ''
    // Set color for each status
    let statusColor = {
        'Validé': 'valide',
        'Rejeté': 'rejected',
        'En validation': 'on-validation',

    }

    // loop through the users items
    users.map(user => {
        // define an tr element that hold the user's information
        let tr = `<tr>
                    <td>${user.id}</td>
                    <!-- format the date -->
                    <td>${formatDate(user.createdDate)}</td>
                    <td class="text-center">
                    <!--select status css class based n it value-->
                        <span class="highlight ${statusColor[user.status]}">
                            ${user.status}
                        </span>
                    </td>
                    <td>${user.lastName}</td>
                    <td>${user.firstName}</td>
                    <td>${user.userName}</td>
                    <td>${user.registrationNumber}</td>
                    <td class="text-center">
                        <button type="button" onclick="deleteUser('${user.id}')" class="delete_btn">
                            <img src="./assets/images/trash-outline.svg" alt="Delete icon">
                        </button>
                    </td>
                </tr>`;

        // add template literal to the end of the tbody
        tableBody.insertAdjacentHTML('beforeend', tr);
    })

}

/**
 * Add new user in the list
 */
function addUser() {
    let user = {
        // generate random int for the [id] then convert it to string!
        id: randomInt(9).toString(),
        createdDate: $('#creation_date').value,
        status: $('#etat').value,
        firstName: $('#prenom').value,
        lastName: $('#nom').value,
        userName: $('#username').value,
        registrationNumber: $('#matricule').value,
    }

    // add that use in to the users array
    users.push(user);

    // display the new users
    listUsers();

    // hide modal
    toggleModal()

}

/*
* Delete user based on his ID
*/
function deleteUser(id) {
    if (confirm(`Supprimer l\'utilisateur ?`)) {
        // remove the user by his id
        users = users.filter(user => user.id !== id)
        // display the new list

        listUsers()
    }
}

// prevent execute submit action on the form then add the new user
form.addEventListener('submit', function (e) {
    e.preventDefault()
    addUser()
})

// Stop propagation[event.bubbles] to not reach the modal click event
form.addEventListener('click', function (e) {
    e.stopPropagation()
})

// Hide the modal
modal.addEventListener('click', function (e) {
    toggleModal()
    return false
})

// show the list of users when the page is ready
window.onload = function () {
    listUsers()
}
