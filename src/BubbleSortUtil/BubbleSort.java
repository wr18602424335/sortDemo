package BubbleSortUtil;

import java.util.Arrays;

/**
 * 冒泡排序
 */
public class BubbleSort {
    //排序方法
    public static int[] sort(int[] data){
        if(data.length==0){
            return null;
        }
        //第一层
        for(int i=0;i<data.length;i++){
        //第二层
            for(int j=0;j<data.length-i-1;j++){
                if(data[j+1]<data[j]){
                    int lsData=data[j+1];
                    data[j+1]=data[j];
                    data[j]=lsData;
                }
            }
            System.out.println("第"+i+"次排序结果"+Arrays.toString(data));
        }
        return data;
    }
}
