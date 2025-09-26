package com.devforgely.userhubbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.devforgely.userhubbackend.common.ErrorCode;
import com.devforgely.userhubbackend.exception.BusinessException;
import com.devforgely.userhubbackend.mapper.UserMapper;
import com.devforgely.userhubbackend.model.User;
import com.devforgely.userhubbackend.service.UserService;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import jakarta.servlet.http.HttpServletRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.devforgely.userhubbackend.constant.UserConstant.USER_LOGIN_STATE;

@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    @Resource
    private UserMapper userMapper;

    // Technically the salt should be random and store per user
    // For simplicity we will just use a static value
    private static final String SALT = "d7A9f3L0pXqB8Nz2";

    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword, String planetCode) {
        // Validity checks
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword, planetCode)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Empty details");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Username too short");
        }
        if (userPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Password too short");
        }
        if (planetCode.length() < 5) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Planet Code too short");
        }

        // Cannot contain punctuations
        String invalidPattern = "[`~!@#$%^&*()+=|{}':;,\\\\.<>/?￥…（）—【】‘；：”“。，、？]";
        Matcher matcher = Pattern.compile(invalidPattern).matcher(userAccount);
        if (matcher.find()) {
            return -1;
        }

        // Password need to be equal
        if (!userPassword.equals(checkPassword)) {
            return -1;
        }

        // User account should not repeat
        LambdaQueryWrapper<User> accountWrapper = new LambdaQueryWrapper<>();
        accountWrapper.eq(User::getUserAccount, userAccount);
        long count = userMapper.selectCount(accountWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Duplicate account");
        }

        // Planet code should not repeat
        LambdaQueryWrapper<User> planetWrapper = new LambdaQueryWrapper<>();
        planetWrapper.eq(User::getPlanetCode, planetCode);
        count = userMapper.selectCount(planetWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Duplicate planet code");
        }

        String hashedPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        // Insert Data
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(hashedPassword);
        user.setPlanetCode(planetCode);
        boolean saveResult = this.save(user);
        if (!saveResult) {
            return -1;
        }
        return user.getId();
    }

    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        // Details checks
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            return null;
        }
        if (userAccount.length() < 4) {
            return null;
        }
        if (userPassword.length() < 8) {
            return null;
        }
        // Details cannot contain punctuations
        String invalidPattern = "[`~!@#$%^&*()+=|{}':;,\\\\.<>/?￥…（）—【】‘；：”“。，、？]";
        Matcher matcher = Pattern.compile(invalidPattern).matcher(userAccount);
        if (matcher.find()) {
            return null;
        }
        // Hashing
        String hashedPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        // Check if user exists
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserAccount, userAccount);
        queryWrapper.eq(User::getUserPassword, hashedPassword);
        User user = userMapper.selectOne(queryWrapper);

        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            return null;
        }
        // User wrapper
        User safetyUser = getSafetyUser(user);
        // Remember session
        request.getSession().setAttribute(USER_LOGIN_STATE, safetyUser);
        return safetyUser;
    }

    @Override
    public User getSafetyUser(User originUser) {
        if (originUser == null) {
            return null;
        }
        User safetyUser = new User();
        safetyUser.setId(originUser.getId());
        safetyUser.setUsername(originUser.getUsername());
        safetyUser.setUserAccount(originUser.getUserAccount());
        safetyUser.setAvatarUrl(originUser.getAvatarUrl());
        safetyUser.setGender(originUser.getGender());
        safetyUser.setPhone(originUser.getPhone());
        safetyUser.setEmail(originUser.getEmail());
        safetyUser.setPlanetCode(originUser.getPlanetCode());
        safetyUser.setUserRole(originUser.getUserRole());
        safetyUser.setUserStatus(originUser.getUserStatus());
        safetyUser.setCreateTime(originUser.getCreateTime());
        return safetyUser;
    }

    @Override
    public int userLogout(HttpServletRequest request) {
        // Remove login state
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 0;
    }
}




