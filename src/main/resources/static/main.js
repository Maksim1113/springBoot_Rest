
$(function(){
    viewAllUsers();
    newUserTable();
    editModal();
    deleteModal();
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
        let roles = addFormNewUser.find('#rolesNew').val();
        let rolesa = [];
         await rolesJson.then(roles => {
             roles.forEach(role => {
                 roles.forEach(roleId => {
                     if (role.id == roleId) {
                         rolesa.push(role);
                     }
                 });
             });
         });
        let data = {
            name: name,
            age: age,
            username: username,
            password: password,
            roles: rolesa
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


    /*let idInput = `<div class="form-group">
                <label for="id">ID</label>
                <input type="text" class="form-control" id="id" name="id" disabled>
                <div class="invalid-feedback"></div>
            </div>`;

    modal.find(modalTitle).html('Edit User');

    let userFormHidden = $('.userForm:hidden')[0];
    modal.find(modalBody).html($(userFormHidden).clone());
    let userForm = modal.find('.userForm');

    userForm.prop('id', 'updateUserForm');
    modal.find(userForm).prepend(idInput);
    modal.find(userForm).show();

    dismissButton.html('Cancel');
    modal.find(modalFooter).append(dismissButton);

    primaryButton.prop('id', 'updateUserButton');
    primaryButton.html('Update');
    modal.find(modalFooter).append(primaryButton);*/

    // заполняем форму данными юзера
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

        // ROLES
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

       /* if (userResponse.status == 200) {
            adminTabAllUsers();
            modal.find('.modal-title').html('Success');
            modal.find('.modal-body').html('User updated!');

            dismissButton.html('Close');
            modal.find(modalFooter).html(dismissButton);

            $('#defaultModal').modal('show');
        } else {
            let maybeBody = await userResponse.json();
            $('#sharaBaraMessageError').remove();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                                ${maybeBody.info}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
            modal.find('.modal-body').prepend(alert);
        }*/
    });
}

async function deleteUser(modal, id) {
    const userResponse = await userService.findById(id);
    const userJson = userResponse.json();

    /*modal.find(modalTitle).html('Delete user');

    let message = '<strong>Are you sure to delete the following user?</strong>';
    modal.find(modalBody).html(message);

    let viewUserTableHidden = $('.userForm:hidden')[0];
    modal.find(modalBody).append($(viewUserTableHidden).clone());
    let viewUserTable = modal.find('.userForm');
    modal.find(viewUserTable).show();

    dismissButton.html('Close');
    modal.find(modalFooter).append(dismissButton);

    dangerButton.prop('id', 'deleteUserButton');
    dangerButton.html('Delete');
    modal.find(modalFooter).append(dangerButton);

    let idInput = `<div class="form-group">
                <label for="id">ID</label>
                <input type="text" class="form-control" id="id" name="id" disabled>
                <div class="invalid-feedback"></div>
            </div>`;
    modal.find(viewUserTable).prepend(idInput);*/

    // заполняем форму данными юзера
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
        //e.preventDefault();
        const userResponse = await userService.delete(id);

    });
}





const userService = {
    findAll: async () => {
        return await http.fetch('/admin/rst');
    },
    add: async (data) => {
        return await http.fetch('/registration', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    findById: async (id) => {
        return await http.fetch('/users/' + id);
    },
    update: async (id, data) => {
        return await http.fetch('/users/' + id, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    delete: async (id) => {
        return await http.fetch('/users/' + id, {
            method: 'DELETE'
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


