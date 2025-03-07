package com.practice.wsServer.Controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.type.TypeReference;
import com.practice.wsServer.Service.RedisCacheService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room")
@Slf4j
public class RoomController {

    @Autowired
    RedisCacheService cache;

    private final SimpMessagingTemplate messagingTemplate;
    public RoomController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/create")
    public String createRoom(@RequestBody Map<String, String> item) {
        String user = item.get("user");
        String PIN = item.get("pin");

        String uuid = UUID.randomUUID().toString();

        String key = String.format("room/%s", uuid);
        String adminKey = String.format("admin/%s", uuid);
        String roomKey = String.format("PIN/%s", uuid);

        cache.setCache(key, List.of(user), 24);
        cache.setCache(adminKey, user, 24);
        cache.setCache(roomKey, PIN, 24);

        log.info("Room Created: {}", uuid);

        return uuid;
    }

    @PostMapping("/authenticate") // security
    public ResponseEntity<?> verify(@RequestBody Map<String, String> item) {
        String user = item.get("user");
        String PIN = item.get("pin");
        String boardId = item.get("boardId");

        String key = String.format("room/%s", boardId);
        String adminKey = String.format("admin/%s", boardId);
        String roomKey = String.format("PIN/%s", boardId);

        String admin = cache.getCache(adminKey, String.class);
        String roomPIN = cache.getCache(roomKey, String.class);

        if (!roomPIN.equals(PIN)) {
            return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
        }

        List<String> users = cache.getCache(key, new TypeReference<List<String>>() {});
        if (!users.contains(user)) {
            users.add(user);
            cache.setCache(key, users, 24);
//            messagingTemplate.convertAndSend("/board/" + boardId, users); // publish to all WS servers "/board/{boardId}"
        } else {
            return new ResponseEntity<>("User Already inside the Room", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok().body(admin);
    }

    @GetMapping("/verify/{user}/{boardId}") // security
    public ResponseEntity<?> verify(@PathVariable(required = true) String user, @PathVariable(required = true) String boardId) {
        String key = String.format("room/%s", boardId);

        List<String> users = cache.getCache(key, new TypeReference<List<String>>() {});
        if (users.contains(user)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(401).build();
    }

    @GetMapping("/getCollabs/{boardId}")
    public ResponseEntity<?> getCollaborators(@PathVariable(required = true) String boardId) {
        String key = String.format("room/%s", boardId);
        List<String> users = cache.getCache(key, new TypeReference<List<String>>() {});

        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/reset/{user}/{boardId}/{pin}")
    public ResponseEntity<String> resetPin(@PathVariable(required = true) String user, @PathVariable(required = true) String boardId, @PathVariable(required = true) String pin) {
        String roomKey = String.format("PIN/%s", boardId);
        String adminKey = String.format("admin/%s", boardId);
        String admin = cache.getCache(adminKey, String.class);

        if (!admin.equals(user)) {
            return new ResponseEntity<>("Unauthorized User, Ask the admin for help", HttpStatus.UNAUTHORIZED);
        }
        cache.setCache(roomKey, pin, 24);

        return ResponseEntity.ok().body("Pin Successfully reset!");
    }

    @GetMapping("/remove/{admin}/{boardId}/{user}")
    public ResponseEntity<String> removeUser(@PathVariable(required = true) String admin, @PathVariable(required = true) String boardId, @PathVariable(required = true) String user) {
        String key = String.format("room/%s", boardId);
        String adminKey = String.format("admin/%s", boardId);
        String supremeUser = cache.getCache(adminKey, String.class);

        if (!admin.equals(supremeUser)) {
            return new ResponseEntity<>("Unauthorized User, Ask the admin for help", HttpStatus.UNAUTHORIZED);
        }
        List<String> users = cache.getCache(key, new TypeReference<List<String>>() {});
        users.remove(user);
        cache.setCache(key, users, 24);

        messagingTemplate.convertAndSend("/board/" + boardId, Map.of("removed" ,user));

        return ResponseEntity.ok().body("Successfully Removed");
    }
}
