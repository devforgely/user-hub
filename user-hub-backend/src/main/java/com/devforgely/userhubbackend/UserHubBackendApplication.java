package com.devforgely.userhubbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.devforgely.userhubbackend.mapper")
public class UserHubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserHubBackendApplication.class, args);
    }

}
