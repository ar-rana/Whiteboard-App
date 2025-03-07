package com.practice.wsServer.Service;

import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisCacheService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public <T> T getCache(String key, Class<T> entityClass) {
        Object o = redisTemplate.opsForValue().get(key);
        if (o == null) return null;

        ObjectMapper om = new ObjectMapper();
        try {
            return om.readValue((String) o, entityClass);
        } catch (Exception e) {
            log.error("Failed to Parse Object: {}", e.getMessage());
        }
        return null;
    }

    public <T> T getCache(String key, TypeReference<T> typeReference) {
        Object o = redisTemplate.opsForValue().get(key);
        if (o == null) return null;

        ObjectMapper om = new ObjectMapper();
        try {
            return om.readValue((String) o, typeReference);
        } catch (Exception e) {
            log.error("Failed to Parse Object: {}", e.getMessage());
        }
        return null;
    }

    public void setCache(String key, Object o, Integer ttl) {
        try {
            String jsonValue = new ObjectMapper().writeValueAsString(o);
            redisTemplate.opsForValue().set(key, jsonValue, ttl, TimeUnit.HOURS);
        } catch (Exception ex) {
            log.error("Failed to SAVE in cache: {}", ex.getMessage());
        }
    }

    public void deleteCache(String key) {
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            log.error("Failed to DELETE cache: {}", e.getMessage());
        }
    }

}
