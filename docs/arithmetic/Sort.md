## 排序

### 选择排序

```java
/**每日一练 2018/12/05
 * 选择排序: 每次选择一个数 然后遍历其后的每一个数,和这个数比较
 * 时间复杂度:O(N^2)
 * 算法特点: 排序时间和初始顺序无关 无论顺序如何都是O(N^2)
 * */
private void sortIntegers(int[] arr){
    if(arr == null || arr.length <= 1){ return; }
    for ( int i =0;i < arr.length ;i++){
        int min = i;
        for (int j = i +1;j<arr.length;j++){
            if(arr[j] < arr[min]){
                min = j;
            }
        }
        int tmp = arr[min];
        arr[min] = arr[i];
        arr[i] = tmp;
    }
}
```

### 插入排序

```java
/**每日一练 2018/12/06
 * 插入排序:像打牌时整理牌,小的插入到左边,大的插入到右边
 * 算法特点: 最坏的情况下复杂度O(N^2)
 * 依赖于初始排序顺序 ,特别适合于部分有序数组 完全是有序数组的情况下 复杂度为O(N)
 * 逆时排序是复杂度为 O(N^2)
 * */
private void sortIntegers2(int[] arr){
    if(arr == null || arr.length <= 1){ return; }
    for(int i=1;i<arr.length ;i++){
        for(int j =i;j>0;j++){
            if(arr[j] <arr[j-1]){
                int tmp = arr[j];
                arr[j-1] = tmp;
            }else{
                break;
            }
        }
    }
}
```

### 冒泡排序

```java
/**每日一练:冒泡排序
 * 冒泡排序 :像冒泡泡一样,每次一个数滚到最后去
 * 时间复杂度: O(N^2)
 * @param arr
 */
private void sortIntegers3(int[] arr){
    if(arr == null || arr.length < 1){ return; }
    boolean needNextPass = true;
    //经历一次外层循环最大的数到最后
    for (int i=0;i<arr.length-1 && needNextPass;i++){
        needNextPass = false;
        for (int j =0;j < arr.length -i-1;j++){
            //如果亮亮比较左边数均小于右边的数那说明已经排序好了,无须进行下一次遍历
            if(arr[j] > arr[j+1]){
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                needNextPass = true;
            }
        }
    }
}

 public static void Bubble(int[] array){
        for( int end = array.length -1 ;end >0 ;end--){
            int sortedIndex = end;
            for (int begin =1 ; begin <= end;begin++){
                if(array[begin] < array[begin-1]){
                    int tmp = array[begin];
                    array[begin] = array[begin -1];
                    array[begin -1]  = tmp;
                    sortedIndex = begin;
                }
                nums++;
            }
            end = sortedIndex;
        }
    }

```

