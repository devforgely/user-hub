package com.devforgely.userhubbackend.model;

import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class User {
    private Long id;                   // bigint, primary key

    private String username;           // varchar(256)

    private String userAccount;        // varchar(256)

    private String avatarUrl;          // varchar(1024)

    private Integer gender;               // tinyint

    private String userPassword;       // varchar(512), not null

    private String phone;              // varchar(128)

    private String email;              // varchar(512)

    private Integer userStatus;        // int, default 0

    private LocalDateTime createTime;  // datetime, default CURRENT_TIMESTAMP

    private LocalDateTime updateTime;  // datetime, default CURRENT_TIMESTAMP on update

    @TableLogic
    private Integer isDelete;             // tinyint, default 0

    private Integer userRole;          // int, default 0

    private String planetCode;         // varchar(512)
}
