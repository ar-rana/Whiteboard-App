package com.practice.wsServer.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EraseObject {
    Integer xvalue;
    Integer yvalue;
    Integer eraser;
    String boardId;
}
