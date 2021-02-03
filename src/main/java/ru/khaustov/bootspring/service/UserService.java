package ru.khaustov.bootspring.service;

import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {
    public List<UserModel> getAllUsers();

    public UserModel getUser(Long id);

    public void addUser(UserModel user);

    public void deleteUser(long id);

    public UserModel getUserByName(String username);

    public String textRole(Set<RoleModel> roles);

    public Optional<UserModel> findById(Long id);
}
