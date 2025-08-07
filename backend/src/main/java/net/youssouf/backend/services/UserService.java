package net.youssouf.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import net.youssouf.backend.dtos.AppUserDTO;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.repositories.AppUserRepository;

@Service
public class UserService {

    private final AppUserRepository appUserRepository;

    public UserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public List<AppUserDTO> getAllClients() {
        List<AppUser> users = appUserRepository.findByRoleName("ROLE_CLIENT");

        return users.stream()
                .map(user -> {
                    AppUserDTO dto = new AppUserDTO();
                    dto.setId(user.getId());
                    dto.setUsername(user.getUsername());
                    dto.setEmail(user.getEmail());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
