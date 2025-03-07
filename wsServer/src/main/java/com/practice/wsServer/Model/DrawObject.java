package com.practice.wsServer.Model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrawObject {
    String color;
    List<Integer> start;
    List<Integer> end;
    String boardId;
}
