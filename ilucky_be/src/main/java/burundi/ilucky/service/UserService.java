package burundi.ilucky.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import burundi.ilucky.login.RegisterRequest;
import burundi.ilucky.model.User;
import burundi.ilucky.payload.Response;
import burundi.ilucky.repository.UserRepository;

@Service
public class UserService {
	@Autowired
    private UserRepository userRepository;


	public User findByUserName(String username) {
		try {
			return userRepository.findByUsername(username);
		} catch (Exception e) {
			return null;
		}
	}

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest registerRequest) throws Exception {
        if (userRepository.findByUsername(registerRequest.getUsername())!=null) {
            throw new Exception("Tên đăng nhập đã tồn tại!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAddTime(new Date());
        return userRepository.save(user);
    }

    public User buyLucky(User user) throws Exception {
        if (userRepository.findByUsername(user.getUsername())==null) {
            throw new Exception("ERROR!!!");
        }
        user.setLastUpdate(new Date());
        return userRepository.save(user);
    }
    
    public User findById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

}
