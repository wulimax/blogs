package com.spring.company.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/topn")
public class TopnController {
    private long[]  arr_num = new long[500];
    /**文件流读取*/
    @RequestMapping(value="/stut",method=RequestMethod.GET)
    private void stutdyuv() throws IOException {
        ArrayList List = new ArrayList();
        Random random = new Random();
        for( int i=0;i <2000;i++ ){
            ArrayList List2 = new ArrayList();
            for( int j=0;j <random.nextInt(500);j++ ){
               List2.add(random.nextLong());
            }
            List.add(List2);
        }
        this.s1(List);
    }

    /**
     *
     * @param
     */
    private void  s1(ArrayList list){
        List<Long> list1 = new ArrayList<>();
        List<Long> list2 = new ArrayList<>();
        long a = 0;
        long b= 0;
        int  c =0;
        for(int i = 0;i < list.size(); i ++){
             list2.clear();
            list2 = (List<Long>) list.get(i);
            //越界结束循环
            if(list2.size() < 1){ continue;}
         //判断当前集合大小
            if(list1.size() >= 500){
                a = Collections.max(list2);
                b = Collections.min(list1);
                if(a > b){
                    //控制top大小
                    if(list1.size() > 500){
                        list1.remove(Collections.min(list1));
                    }
                    for(int j = 0;j < list2.size(); j ++){
                        c++;
                        a = Collections.max(list2);
                        b = Collections.min(list1);
                        if(a > b){
                            list1.remove(b);
                            list1.add(a);
                            list2.remove(a);
                        }else{
                            break;
                        }
                    }
                }else{
                    //没有大于list1的值将跳出循环
                    continue;
                }
            }else{
                for(int j = 0;j < list2.size(); j ++){
                    c++;
                    list1.add(list2.get(j));
                }
            }
        }
        System.out.println(list1);
        System.out.println(c);
    }
}
