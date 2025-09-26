package com.devforgely.userhubbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import com.devforgely.userhubbackend.model.User;

@Mapper
public interface UserMapper extends BaseMapper<User> {

}
