package com.devforgely.userhubbackend.service;

import com.devforgely.userhubbackend.model.User;
import com.baomidou.mybatisplus.extension.service.IService;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService extends IService<User> {
    long userRegister(String userAccount, String userPassword, String checkPassword, String planetCode);

    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /* Safety wrapper */
    User getSafetyUser(User originUser);

    int userLogout(HttpServletRequest request);
}
