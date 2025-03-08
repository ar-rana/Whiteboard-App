package com.practice.wsServer.Controller;

import com.practice.wsServer.Model.DrawObject;
import com.practice.wsServer.Model.EraseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Slf4j
public class WebSocketController {

    @MessageMapping("/collab/draw/{boardId}")
    @SendTo("/board/{boardId}")
    public ResponseEntity<DrawObject> whiteboardDraw(@RequestBody DrawObject drawObject) {
        log.info("DrawObject Received: {}", drawObject);
        return ResponseEntity.ok().body(drawObject);
    }

    @MessageMapping("/collab/erase/{boardId}")
    @SendTo("/board/{boardId}")
    public ResponseEntity<EraseObject> whiteboardErase(@RequestBody EraseObject eraseObject) {
        log.info("EraseObject Received: {}", eraseObject);
        return ResponseEntity.ok().body(eraseObject);
    }
}
