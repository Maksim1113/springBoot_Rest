package ru.khaustov.bootspring.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.khaustov.bootspring.exception.UserIncorrectData;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;
import ru.khaustov.bootspring.service.RoleService;
import ru.khaustov.bootspring.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
public class UserRestController {

    private final UserService userService;
    private final RoleService roleService;

    public UserRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

   @GetMapping("/admin/rst")
    //@ResponseBody
    public List<UserModel> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/registration")
    public ResponseEntity<?> addUser(@RequestBody UserModel user) {
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public String apiDeleteUser(@PathVariable("id") long id) {
            userService.deleteUser(id);
        return "getUsers";
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> apiUpdateUser(@PathVariable("id") long id, @RequestBody UserModel user) {
            userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public UserModel apiGetOneUser(@PathVariable("id") long id) {
        return userService.showById(id);
    }

    @GetMapping("/user/rst")
    public UserModel getUser(Principal principal){
        UserModel userModel = userService.getUserByName(principal.getName());
        return userModel;
    }



}
