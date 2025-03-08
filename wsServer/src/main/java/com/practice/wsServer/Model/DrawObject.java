package com.practice.wsServer.Model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DrawObject {
    String color;
    List<Integer> start;
    List<Integer> end;
    String boardId;
}
