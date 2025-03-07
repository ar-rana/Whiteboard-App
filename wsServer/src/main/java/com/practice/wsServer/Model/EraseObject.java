package com.practice.wsServer.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EraseObject {
    Integer xOffset;
    Integer yOffset;
    Integer eraser;
    String boardId;
}
