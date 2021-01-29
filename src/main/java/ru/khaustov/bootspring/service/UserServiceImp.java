package ru.khaustov.bootspring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.khaustov.bootspring.dao.UserDao;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;

import java.util.*;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserDao userDao;

    @Override
    public List<UserModel> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public UserModel getUser(Long id) {
        return userDao.getOne(id);
    }

    @Override
    public void addUser(UserModel user) {
        user.setRoles(Collections.singleton(new RoleModel(1L, "ROLE_USER")));

        userDao.save(user);
    }

    @Override
    public void deleteUser(long id) {
        userDao.deleteById(id);
    }

    /*@Override
    public UserModel getUserByName(String username) {

        return userDao.getUserByName(username);
    }*/
}
