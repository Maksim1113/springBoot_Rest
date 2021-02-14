
$(function(){
    viewAllUsers();
    newUserTable();
    editModal();
    deleteModal();
    userTableInfo();
});

async function newUserTable() {
    let roleResponse = await roleService.findAll();
    let rolesJson = roleResponse.json();
    let addFormNewUser = $('#addFormNewUser');

    $('#addNewUser').on('click', async e => {

        let name = addFormNewUser.find('#nameNew').val().trim();
        let age = addFormNewUser.find('#ageNew').val().trim();
        let username = addFormNewUser.find('#usernameNew').val().trim();
        let password = addFormNewUser.find('#passwordNew').val().trim();
        let rolesIdArr = addFormNewUser.find('#rolesNew').val();
        let userRoles = [];
        await rolesJson.then(roles => {
            roles.forEach(role => {
                rolesIdArr.forEach(roleId => roleId == role.id ? userRoles.push(role) : null)
            });
        });


        let data = {
            name: name,
            age: age,
            username: username,
            password: password,
            roles: userRoles
        }
        const addResponse = await userService.add(data);

    })
};

async function viewAllUsers() {
    $('#userTable tbody').empty();
    const userResponse = await userService.findAll();
    console.log(userResponse)
    const userJson = userResponse.json()
    userJson.then(users => {
        users.forEach(user => {
            let userRole = '';
            for(let role of user.roles){
                userRole += role.role + ', '
            }
            let userRow = `$(<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.name}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                      <td>${userRole.slice(0, -2)}</td>
                        <td class="text-center">
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                            <button type="button" class="btn btn-info" data-toggle="modal" id="editButton"
                            data-id="${user.id}" data-action="editUser" data-toggle="modal" data-target="#updateModal">
                                        Update
                            </button>
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                            <button type="button" class="btn btn-danger btn-primary" data-toggle="modal" id="deleteButton"
                            data-id="${user.id}" data-action="deleteUser" data-toggle="modal" data-target="#deleteModal">
                                            Delete
                            </button>
                            </div>
                        </td>
                    </tr>)`;
            $('#userTable tbody').append(userRow);
        });
    });
}

function editModal() {
    $('#updateModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false,
    }).on("show.bs.modal", function(event){
        let button = $(event.relatedTarget);
        let id = button.data('id');
        let action = button.data('action');
        switch(action) {
            case 'editUser':
                editUser($(this), id);
                break;
        }
    })
}

function deleteModal() {
    $('#deleteModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false,
    }).on("show.bs.modal", function(event){
        let button = $(event.relatedTarget);
        let id = button.data('id');
        let action = button.data('action');
        switch(action) {
            case 'deleteUser':
                deleteUser($(this), id);
                break;
        }
    })
}

async function editUser(modal, id) {
    const userResponse = await userService.findById(id);
    const userJson = userResponse.json();

    const rolesResponse = await roleService.findAll();
    const rolesJson = rolesResponse.json();

    userJson.then(user => {
        modal.find('#idEdit').val(user.id);
        modal.find('#nameEdit').val(user.name);
        modal.find('#ageEdit').val(user.age);
        modal.find('#usernameEdit').val(user.username);
        modal.find('#passwordEdit').val(user.password);
        //modal.find('#rolesEdit').val(' ');
        rolesJson.then(roles => {
            roles.forEach(role => {
                user.roles.forEach(userRole => {
                    if (userRole.id == role.id) {
                        modal.find('#rolesEdit').append(new Option(role.role, role.id, false, true));
                        role = true;
                    }
                });
                (role !== true) ? modal.find('#rolesEdit').append(new Option(role.role, role.id)) : null;
            });
        });
    });

    $('#updateUserButton').click(async function(e){
        let addForm = $('#updateModal');
        let id = addForm.find('#idEdit').val().trim();
        let name = addForm.find('#nameEdit').val().trim();
        let age = addForm.find('#ageEdit').val().trim();
        let username = addForm.find('#usernameEdit').val().trim();
        let password = addForm.find('#passwordEdit').val().trim();
        let rolesIdArr = addForm.find('#rolesEdit').val();

        let userRoles = [];
        await rolesJson.then(roles => {
            roles.forEach(role => {
                rolesIdArr.forEach(roleId => roleId == role.id ? userRoles.push(role) : null)
            });
        });

        let data = {
            id: id,
            name: name,
            age: age,
            username: username,
            password: password,
            roles: userRoles
        };
        const userResponse = await userService.update(id, data);
    });
}

async function deleteUser(modal, id) {
    const userResponse = await userService.findById(id);
    const userJson = userResponse.json();

    userJson.then(user => {
        modal.find('#idDel').val(user.id);
        modal.find('#nameDel').val(user.name);
        modal.find('#ageDel').val(user.age);
        modal.find('#usernameDel').val(user.username);
        modal.find('#passwordDel').val(user.password);

        modal.find('#age').append(new Option(user.age, user.age, false, true));
        modal.find('#age').prop('disabled', true);

        user.roles.forEach(userRole => {
            modal.find('#rolesDel').append(new Option(userRole.role, userRole.id, false, true));
        })
        modal.find('#rolesDel')
    })


    $('#deleteUserButton').click(async function(e){
        const userResponse = await userService.delete(id);
    });
}

async function userTableInfo() {
    let table = $('#userInfo tbody');

    const userResponse = await userService.findAuthUser();
    const userJson = userResponse.json();

    table.empty();
    let data = '';
    await userJson.then(async user => {
        let rolesString = ''
        await user.roles.forEach(role => rolesString += `${role.role}, `);
        data += `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${rolesString.slice(0, -2)}</td>
                </tr>`
    })
    table.append(data);
}

const userService = {
    findAll: async () => {
        return await http.fetch('/api/users');
    },
    add: async (data) => {
        return await http.fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    findById: async (id) => {
        return await http.fetch('/api/user/' + id);
    },
    update: async (id, data) => {
        return await http.fetch('/api/user/' + id, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    delete: async (id) => {
        return await http.fetch('/api/user/' + id, {
            method: 'DELETE'
        });
    },
    findAuthUser: async () => {
        return await http.fetch('/api/user', {
            method: 'GET'
        });
    },
};

const roleService = {
    findAll: async () => {
        return await http.fetch('/roles');
    }
};

const http = {
    fetch: async function (url, options = {}) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...options,
        });

        return response;
    }
}


