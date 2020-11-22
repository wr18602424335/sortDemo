package BubbleSortUtil;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * 冒泡排序
 */
public class BubbleSortTest {
    //排序方法测试
    public static void main(String[] args) {
        int[] a={2,77,900,345,11,88,235,111,77};
        int[] a1=BubbleSort.sort(a);
        System.out.println(Arrays.toString(a1));
    }

}
