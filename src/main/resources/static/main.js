
/*$('document').ready(function () {
   $('.table .btn').on('click',function (event) {
       event.preventDefault();

       var href= $(this).attr('href');

       $.get(href, function (userModel, status){
           $('#idEdit').val(userModel.id);
           $('#nameEdit').val(userModel.name);
           $('#ageEdit').val(userModel.age);
           $('#usernameEdit').val(userModel.username);
           $('#passwordEdit').val(userModel.password);

       });

       $('#updateModal').modal();
   });

    $('table #deleteBut').on('click',function (event) {
        event.preventDefault();

       var href= $(this).attr('href');

        $.get(href, function (userModel, status){
            $('#idDel').val(userModel.id);
            $('#nameDel').val(userModel.name);
            $('#ageDel').val(userModel.age);
            $('#usernameDel').val(userModel.username);
            $('#passwordDel').val(userModel.password);
        });

        $('#deleteModal').modal();
    });

});*/

$(document).ready(function(){
    viewAllUsers();
});



async function viewAllUsers() {
    $('#userTable tbody').empty();
    const userResponse = await userService.findAll();
    console.log(userResponse)
    const userJson = await userResponse.json()
    userJson.then(users => {
        users.forEach(user => {
            let userRow = `$(<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.name}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                      <td>${user.roles[0].role}</td>
                        <td class="text-center">
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                                <button class="btn btn-success btn-sm" data-id="${user.id}" data-action="editBook" data-toggle="modal" data-target="#defaultModal"><i class="far fa-edit"></i></button>
                            </div>
                        </td>
                        <td class="text-center">
                            <div class="btn-group" role="group" aria-label="Action Buttons">
                                <button class="btn btn-danger btn-sm" data-id="${user.id}" data-action="deleteBook" data-toggle="modal" data-target="#defaultModal"><i class="far fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </tr>)`;
            $('#userTable tbody').append(userRow);
        });
    });
}

const userService = {
    findAll: async () => {
        return await http.fetch('/admin/rst');
    }
};

const http = {
    fetch: async function(url, options = {}) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...options,
        });

        return response;
    }
};

