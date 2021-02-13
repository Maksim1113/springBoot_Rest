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

    @GetMapping("/start")
    public String start(){
        return "start";
    }

    @GetMapping("/registration")
    public ModelAndView regNewUser(Model model, Principal principal){
        ModelAndView modelAndView = new ModelAndView();
        UserModel userModel = userService.getUserByName(principal.getName());
        String text = userModel.getUsername() + " with roles:"
                + userService.textRole((Set<RoleModel>)userModel.getRoles());
        Set<RoleModel> set = roleService.getAllRoles();
        model.addAttribute("user", new UserModel());
        model.addAttribute("username", text);
        model.addAttribute("set", set);
        //return "registration";
        modelAndView.setViewName("getUsers");
        return modelAndView;

    }


    @PostMapping("/registration")
    public String regUser(@ModelAttribute("user") UserModel user){
        userService.addUser(user);
        return "redirect:/registration";
    }

    @GetMapping("/user")
    public ModelAndView userPage(Principal principal, Model model){
        ModelAndView modelAndView = new ModelAndView();
        List<UserModel> users = new ArrayList<>();
        UserModel userModel = userService.getUserByName(principal.getName());
        String text = userModel.getUsername() + " with roles:"
                + userService.textRole((Set<RoleModel>)userModel.getRoles());
        users.add(userModel);
        model.addAttribute("users", users);
        model.addAttribute("username", text);
        modelAndView.setViewName("userInfo");
        //return "userInfo";
        return modelAndView;

    }

   /* @GetMapping("/admin")
    //@ResponseBody
    public List<UserModel> getAllUsers(){
        return userService.getAllUsers();
    }*/

    @GetMapping("/admin")
    //@ResponseBody
    public String getAllUsers(){
        return "getUsers";
    }

  /*  @GetMapping("/admin/{id}")
    public String user(@ModelAttribute("user") UserModel edUser, Model model){
        UserModel user = userService.getUser(edUser.getId());
        model.addAttribute("user", user);
        return "newUser";
    }


    @GetMapping("/admin/new")
    public String setNewUser(Model model){
        model.addAttribute("user", new UserModel());
        return "newUser";

    }*/

    @RequestMapping("/getOne")
    @ResponseBody
    public Optional<UserModel> getOne(Long id){
        return userService.findById(id);
    }


    @PostMapping("/admin")
    public ModelAndView createUser(@ModelAttribute("user") UserModel user){
        ModelAndView modelAndView = new ModelAndView();
        userService.addUser(user);
        //return "redirect:/admin";
        modelAndView.setViewName("getUsers");
        return modelAndView;
    }


   /* @DeleteMapping("/admin")
    public String deleteUser(Long id){
        userService.deleteUser(id);
        return "redirect:/admin";
    }*/

    @RequestMapping(value = "/admin/delete", method = {RequestMethod.DELETE, RequestMethod.GET})
    public String deleteUser(Long id){
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
