package ru.khaustov.bootspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.khaustov.bootspring.models.UserModel;

import java.util.List;
@Repository
public interface UserDao extends JpaRepository<UserModel, Long> {
    UserModel getUserByName(String username);
}
