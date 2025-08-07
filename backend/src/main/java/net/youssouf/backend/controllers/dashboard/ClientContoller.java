package net.youssouf.backend.controllers.dashboard;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.youssouf.backend.dtos.AppUserDTO;
import net.youssouf.backend.services.UserService;

@RestController
@RequestMapping("/api/dashboard/clients")
@CrossOrigin(origins = "*")
public class ClientContoller {
      

    private final UserService clientService;

    public ClientContoller(UserService clientService) {
        this.clientService = clientService;
    }
    @GetMapping("")
    public List<AppUserDTO> getAllClients() {
        return clientService.getAllClients();
    }


}
