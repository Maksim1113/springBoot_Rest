package ru.khaustov.bootspring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.service.RoleService;

import java.util.Set;

@RestController
public class RoleRestController {
    RoleService roleService;

    @Autowired
    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/roles")
    public Set<RoleModel> getAllRoles() {
        return roleService.getAllRoles();
    }
}
