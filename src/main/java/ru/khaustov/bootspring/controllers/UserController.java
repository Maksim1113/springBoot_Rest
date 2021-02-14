package ru.khaustov.bootspring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;
import ru.khaustov.bootspring.service.RoleService;
import ru.khaustov.bootspring.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping("/registration")
    public String regNewUser(Model model, Principal principal){
        UserModel userModel = userService.getUserByName(principal.getName());
        String text = userModel.getUsername() + " with roles:"
                + userService.textRole((Set<RoleModel>)userModel.getRoles());
        Set<RoleModel> set = roleService.getAllRoles();
        model.addAttribute("username", text);
        model.addAttribute("set", set);
        return "registration";
    }

    @GetMapping("/user")
    public String userPage(Principal principal, Model model){
        UserModel userModel = userService.getUserByName(principal.getName());
        String text = userModel.getUsername() + " with roles:"
                + userService.textRole((Set<RoleModel>)userModel.getRoles());
        model.addAttribute("username", text);
        return "userinfo";
    }


    @GetMapping("/users")
    public String getAllUsers(Principal principal, Model model){
        UserModel userModel = userService.getUserByName(principal.getName());
        String text = userModel.getUsername() + " with roles:"
                + userService.textRole((Set<RoleModel>)userModel.getRoles());
        model.addAttribute("username", text);
        return "getUsers";
    }


    /*@RequestMapping("/getOne")
    @ResponseBody
    public Optional<UserModel> getOne(Long id){
        return userService.findById(id);
    }*/


   /* @PostMapping("/admin")
    public ModelAndView createUser(@ModelAttribute("user") UserModel user){
        ModelAndView modelAndView = new ModelAndView();
        userService.addUser(user);
        //return "redirect:/admin";
        modelAndView.setViewName("getUsers");
        return modelAndView;
    }*/


   /* @DeleteMapping("/admin")
    public String deleteUser(Long id){
        userService.deleteUser(id);
        return "redirect:/admin";
    }*/

  /*  @RequestMapping(value = "/admin/delete", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteUser(Long id){
        userService.deleteUser(id);
        return "redirect:/admin";
    }*/
}
