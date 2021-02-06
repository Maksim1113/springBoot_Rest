package ru.khaustov.bootspring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.khaustov.bootspring.models.RoleModel;
import ru.khaustov.bootspring.models.UserModel;
@Repository
public interface RoleDao extends JpaRepository<RoleModel, Long> {

}
