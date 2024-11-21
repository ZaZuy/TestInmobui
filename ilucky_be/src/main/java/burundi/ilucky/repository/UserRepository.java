package burundi.ilucky.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import burundi.ilucky.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);

    @Modifying
    @Query("UPDATE User u SET u.totalPlay = u.totalPlay + 1")
    void incrementTotalPlayForAllUsers();
    
    List<User> findAllByOrderByTotalStarDesc();

}