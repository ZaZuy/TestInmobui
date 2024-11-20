package burundi.ilucky.repository;

import burundi.ilucky.model.LuckyHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LuckyHistoryRepository extends JpaRepository<LuckyHistory, Long> {
    List<LuckyHistory> findByUserIdOrderByAddTimeDesc(Long userId);
}

