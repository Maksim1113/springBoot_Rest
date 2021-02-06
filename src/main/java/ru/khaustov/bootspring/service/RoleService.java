package ru.khaustov.bootspring.service;

import ru.khaustov.bootspring.models.RoleModel;

import java.util.Set;

public interface RoleService {
    public Set<RoleModel> getAllRoles();

}
