package ru.khaustov.bootspring.service;

import org.springframework.stereotype.Service;
import ru.khaustov.bootspring.dao.RoleDao;
import ru.khaustov.bootspring.models.RoleModel;

import java.util.HashSet;
import java.util.Set;
@Service
public class RoleServiceImp implements RoleService{
    private final RoleDao roleDao;

    public RoleServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Set<RoleModel> getAllRoles() {
        Set<RoleModel> set = new HashSet<>(roleDao.findAll());
        return set;
    }

}
