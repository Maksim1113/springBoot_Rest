package ru.khaustov.bootspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import ru.khaustov.bootspring.models.UserModel;
import ru.khaustov.bootspring.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/start")
    public String start(){
        return "start";
    }

    @GetMapping("/registration")
    public String regNewUser(Model model){
        model.addAttribute("user", new UserModel());
        return "registration";

    }


    @PostMapping("/registration")
    public String regUser(@ModelAttribute("user") UserModel user){
        userService.addUser(user);
        return "redirect:/start";
    }

    /*@GetMapping("/user")
    public String userPage(Principal principal, Model model){
        List<UserModel> users = new ArrayList<>();
        users.add(userService.getUserByName(principal.getName()));
        model.addAttribute("users", users);
        return "userInfo";


    }*/

    @GetMapping("/admin")
    public String getAllUsers(Model model){
        List<UserModel> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "getUsers";
    }

    @GetMapping("/admin/{id}")
    public String user(@ModelAttribute("user") UserModel edUser, Model model){
        UserModel user = userService.getUser(edUser.getId());
        model.addAttribute("user", user);
        return "newUser";
    }


    @GetMapping("/admin/new")
    public String setNewUser(Model model){
        model.addAttribute("user", new UserModel());
        return "newUser";

    }

    @PostMapping("/admin")
    public String createUser(@ModelAttribute("user") UserModel user){
        userService.addUser(user);
        return "redirect:/admin";
    }


    @DeleteMapping("/admin/{id}")
    public String deleteUser(@ModelAttribute("user") UserModel user){
        Long userId = user.getId();
        userService.deleteUser(userId);
        return "redirect:/admin";
    }
}
