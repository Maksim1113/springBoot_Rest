

$('document').ready(function () {
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
   })
});
