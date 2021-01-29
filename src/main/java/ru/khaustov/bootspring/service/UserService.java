package ru.khaustov.bootspring.service;

import ru.khaustov.bootspring.models.UserModel;

import java.util.List;

public interface UserService {
    public List<UserModel> getAllUsers();

    public UserModel getUser(Long id);

    public void addUser(UserModel user);

    public void deleteUser(long id);

    //public UserModel getUserByName(String username);
}
