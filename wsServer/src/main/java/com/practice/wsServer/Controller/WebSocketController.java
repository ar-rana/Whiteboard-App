package com.practice.wsServer.Controller;

import com.practice.wsServer.Model.DrawObject;
import com.practice.wsServer.Model.EraseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WebSocketController {

    @MessageMapping("/collab/draw")
    @SendTo("/board/{boardId}")
    public ResponseEntity<DrawObject> whiteboardDraw(@RequestBody DrawObject drawObject) {
        return ResponseEntity.ok().body(drawObject);
    }

    @MessageMapping("/collab/erase")
    @SendTo("/board/{boardId}")
    public ResponseEntity<EraseObject> whiteboardErase(@RequestBody EraseObject eraseObject) {
        return ResponseEntity.ok().body(eraseObject);
    }
}
