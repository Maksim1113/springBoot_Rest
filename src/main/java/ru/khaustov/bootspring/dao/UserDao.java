package ru.khaustov.bootspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.khaustov.bootspring.models.UserModel;
@Repository
public interface UserDao extends JpaRepository<UserModel, Long> {
    //UserModel getUserByName(String username);
    UserModel getUserByUsername(String username);
    UserModel getUserById(Long id);
}
