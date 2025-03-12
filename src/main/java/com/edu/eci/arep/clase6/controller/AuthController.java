package com.edu.eci.arep.clase6.controller;

import com.edu.eci.arep.clase6.dto.UserDto;
import com.edu.eci.arep.clase6.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody UserDto userDto) {
        if (userService.authenticate(userDto.getUsername(), userDto.getPassword())) {
            return ResponseEntity.status(HttpStatus.FOUND) // Código 302 para redirección
                    .header("Location", "/index.html")
                    .build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        try {
            userService.createUser(userDto.getUsername(), userDto.getPassword());
            return ResponseEntity.ok("{\"message\": \"Usuario registrado con éxito\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Error al registrar usuario\"}");
        }
    }
}
