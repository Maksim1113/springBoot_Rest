package ru.khaustov.bootspring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.khaustov.bootspring.dao.UserDao;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;

import java.util.*;

@Service
public class UserServiceImp implements UserService{

    private final UserDao userDao;

    public UserServiceImp(UserDao userDao) {
        this.userDao = userDao;
    }

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
        /*if (role.equals("ROLE_ADMIN")) {
            RoleModel roleModel1 = new RoleModel(2L, "ROLE_USER");
            RoleModel roleModel2 = new RoleModel(1L, "ROLE_ADMIN");
            Set<RoleModel> set = new HashSet<>();
            set.add(roleModel1);
            set.add(roleModel2);
            user.setRoles(set);
        } else  {
            user.setRoles(Collections.singleton(new RoleModel(2L, "ROLE_USER")));
        }*/

        userDao.save(user);
    }

    @Override
    public void deleteUser(long id) {
        userDao.deleteById(id);
    }

    @Override
    public UserModel getUserByName(String username) {

        return userDao.getUserByUsername(username);
    }

    public String textRole(Set<RoleModel> roles){
        StringBuilder text = new StringBuilder();

        for (RoleModel roleModel : roles) {
            text.append(" ");
            text.append(roleModel.getRole());
        }
        return text.toString();
    }

    @Override
    public Optional<UserModel> findById(Long id) {
        return userDao.findById(id);
    }
}
