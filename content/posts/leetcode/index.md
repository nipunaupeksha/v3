---
title: LeetCode Solutions
description: My LeetCode Solutions Bundle
date: '2022-08-23'
draft: false
slug: '/pensieve/leetcode'
tags:
  - DSA
  - Java
---

## Question 1 - Two Sum

```java:title=S1
class Solution{
    public int[] twoSum(int[] nums, int target){
        int arr[] = new int[2];
        for(int i=0; i<nums.length; i++){
            for(int j=i+1; j<nums.length; j++){
                if(nums[i]+nums[j]==target){
                    arr[0] = i;
                    arr[1] = j;
                }
            }
        }
        return arr;
    }
}
```

```java:title=S2
class Solution{
    public int[] twoSum(int[] nums, int target){
        int arr[] = new int[2];
        int n = nums.length;
        Map<Integer,Integer> hm = new HashMap<>();
        for(int i=0; i<n; i++){
            if(hm.containsKey(nums[i])){
                arr[0] = hm.get(nums[i]);
                arr[1] = i;
                break;
            }else{
                hm.put(target-nums[i], i);
            }
        }
        return arr;
    }
}
```

## Question 2 - Add Two Numbers

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode temp = new ListNode(0);
        ListNode curr = temp;
        int carry = 0;
        while(l1!=null || l2!=null || carry!=0){
            int x = (l1!=null)?l1.val:0;
            int y = (l2!=null)?l2.val:0;
            int sum = carry + x + y;
            carry = sum/10;
            curr.next = new ListNode(sum%10);
            curr = curr.next;
            if(l1!=null){
                l1=l1.next;
            }
            if(l2!=null){
             l2=l2.next;
            }
        }
        return temp.next;
    }
}
```

## Question 3 - Longest Substring Without Repeating Characters

```java
class Solution{
    public int lengthOfLongestSubstring(String s){
        int n = s.length();
        Map<Character, Integer> map = new HashMap<>();
        int L = 0, R = 0, ans = 0;
        while(R<n){
            if(map.containsKey(s.charAt(R))){
                L = Math.max(map.get(s.charAt(R)), L);
            }
            ans = Math.max(ans, R-L+1);
            map.put(s.charAt(R), R+1);
            R++;
        }
        return ans;
    }
}
```

## Question 4 - Median of two sorted arrays

```java:title=S1
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int temp[] = new int[nums1.length + nums2.length];
        for(int i=0;i<nums1.length;i++){
            temp[i] = nums1[i];
        }
        for(int i=nums1.length;i<temp.length;i++){
            temp[i] = nums2[i-nums1.length];
        }
        Arrays.sort(temp);
        if(temp.length%2==1){
            return temp[(temp.length+1)/2 -1];
        }
        int n = (temp.length)/2 -1 ;
        return (double)(temp[n] + temp[n+1])/2;
    }
}
```

```java:title=S2
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if(nums1.length>nums2.length){
            int temp[] = nums1;
            nums1 = nums2;
            nums2 = temp;
        }
        int lo = 0, hi = nums1.length;
        int combinedLength = nums1.length + nums2.length;
        while(lo <= hi){
            int partX = (lo + hi)/2;
            int partY = (combinedLength + 1)/2 - partX;
            int leftX = getMax(nums1, partX);
            int rightX = getMin(nums1, partX);

            int leftY = getMax(nums2, partY);
            int rightY = getMin(nums2, partY);

            if(leftX <= rightY && leftY <= rightX){
                if(combinedLength %2 == 0){
                    return (Math.max(leftX, leftY) + Math.min(rightX, rightY))/2.0;
                }
                return Math.max(leftX, leftY);
            }
            if(leftX > rightY){
                hi = partX - 1;
            }else{
                lo = partX + 1;
            }
        }
        return -1;
    }

    private int getMax(int[] nums, int partition){
        if(partition == 0){
            return (int)Double.NEGATIVE_INFINITY;
        }else{
            return nums[partition - 1];
        }
    }

    private int getMin(int[] nums, int partition){
        if(partition == nums.length){
            return (int)Double.POSITIVE_INFINITY;
        }else{
            return nums[partition];
        }
    }
}
```

## Question 11 - Container With Most Water

```java
class Solution{
    public int maxArea(int[] height){
        int n = height.length;
        //define pointers
        int L = 0, R = n-1;
        //define max area
        int maxArea = Integer.MIN_VALUE;
        while(L<R){
            int area = Math.min(height[R], height[L])*(R-L);
            maxArea = Math.max(maxArea, area);
            if(height[R] < height[L]){
                R--;
            }else{
                L++;
            }
        }
        return maxArea;
    }
}
```

## Question 15 - 3Sum

```java
class Solution{
    public List<List<Integer>> threeSum(int[] nums){
        //base case
        List<List<Integer>> res = new LinkedList<>();
        int n = nums.length;
        if(n<3)return res;
        //sort array
        Arrays.sort(nums);
        //iterate the array
        for(int i = 0;i < n;i++){
            if(i != 0 && nums[i] == nums[i-1]) continue;
            int L = i + 1, R = n - 1;
            while(L < R){
                int curSum = nums[i] + nums[R] + nums[L];
                if(curSum == 0){
                    List<Integer> sub = new LinkedList<>();
                    sub.add(nums[i]);
                    sub.add(nums[L]);
                    sub.add(nums[R]);
                    res.add(sub);
                    L++;
                    R--;
                    while(L < R && nums[L] == nums[L - 1]){
                        L++;
                    }
                    while(L < R && nums[R] == nums[R + 1]){
                        R--;
                    }
                }else if(curSum < 0){
                    L++;
                }else{
                    R--;
                }
            }
        }
        //return the res
        return res;
    }
}
```

## Question 16 - 3Sum Closest

```java
class Solution{
    public int threeSumClosest(int[] nums, int target){
        //sort array
        Arrays.sort(nums);
        //define gap, ans
        int gap = Integer.MAX_VALUE, ans = 0, n = nums.length;
        //iteration
        for(int i = 0;i < n;i++){
            int L = i + 1, R = n - 1;
            while(L < R){
                int curSum = nums[L] + nums[R] + nums[i];
                if(curSum == target){
                    return target;
                }else if(curSum < target){
                    L++;
                }else{
                    R--;
                }
                int curGap = Math.abs(curSum - target);
                if(curGap < gap){
                    gap = curGap;
                    ans = curSum;
                }
            }
        }

        //return the sume that has smallest gap between target and the sum
        return ans;
    }
}
```

## Question 20 - Valid Parentheses

```java
class Solution{
    public boolean isValid(String s){
        Stack<Character> stack =  new Stack<>();
        for(char c: s.toCharArray()){
            if(c == '(' || c == '[' || c == '{'){
                stack.push(c);
            } else if(c == ')' && !stack.isEmpty() && stack.peek() == '('){
                stack.pop();
            } else if(c == ']' && !stack.isEmpty() && stack.peek() == '['){
                stack.pop();
            } else if(c == '}' && !stack.isEmpty() && stack.peek() == '{'){
                stack.pop();
            } else{
                return false;
            }
        }
        return stack.isEmpty();
    }
}
```

## Question 26 - Remove Duplicates from Sorted Array

```java
class Solution{
    public int removeDuplicates(int[] nums){
        //base case
        int n = nums.length;
        if(n<2) return n;
        //define pointers
        int L = 0, R = 1;
        //remove duplicates in place
        while(R<n){
            if(nums[L]!=nums[R]){
                L++;
                nums[L] = nums[R];
            }
            R++;
        }
        //return the size of the subarray
        return L+1;
    }
}
```

## Question 42 - Trapping Rain Water

```java
class Solution{
    public int trap(int[] height){
        int n = height.length;
        int max = 0;
        for(int i = 0; i < n; i++){
            if(height[max] < height[i]){
                max = i;
            }
        }
        int sum = 0;
        int LMax  = 0;
        for(int i = 0;i < max;i++){
            if(height[LMax] < height[i]){
                LMax = i;
            }
            sum += Math.min(height[LMax], height[max]) - height[i];
        }

        int RMax = n - 1;
        for(int i = n - 1; i > max; i--){
            if(height[RMax] < height[i]){
                RMax = i;
            }
            sum += Math.min(height[LMax], height[max]) - height[i];
        }
        return sum;
    }
}
```

## Question 75 - Sort Colors

```java
class Solution{
    public void sortColors(int[] nums){
        int n = nums.length;
        int L = 0, R = n - 1, cur = 0;
        while(cur <= R){
            if(nums[cur] == 2){
                swap(nums, cur, R);
                R--;
            }else if(nums[cur]==1){
                cur++;
            }else{
                swap(nums, cur, L);
                L++;
                cur++;
            }
        }
    }

    private void swap(int[]nums, int p1, int p2){

        int temp = nums[p1];
        nums[p1] = nums[p2];
        nums[p2] = temp;
    }
}
```

## Question 80 - Remove Duplicates from Sorted Array II

```java
class Solution{
    public int removeDuplicates(int[] nums){
        //base case
        int n = nums.length;
        if(n<3)return n;
        //define pointers and counter
        int L = 0, R = 1, count = 0;
        //remove duplicates in place
        while(R<n){
            if(nums[L]!=nums[R]){
                L++;
                nums[L] = nums[R];
                count = 0;
            }else if(nums[L]==nums[R] && count<1){
                count++;
                nums[++L] = nums[R];
            }
            R++;
        }
        return L+1;
    }
}
```

## Remove Duplicates from Sorted List II

```java
/**
* Definition for singly-linked list.
*public class ListNode{
*    int val;
*    ListNode next;
*    ListNode(){}
*    ListNode(int val){this.val = val};
*    ListNode(int val, ListNode next){this.val = val; this.next = next;}
*}
*/

class Solution{
    public ListNode deleteDuplicates(ListNode head){
        if(head == null || head.next == null) return head;
        ListNode dummy = new ListNode();
        dummy.next = head;
        ListNode pre = dummy, cur = head;
        while(cur != null){
            if(cur.next != null && cur.val == cur.next.val){
                while(cur.next != null && cur.val == cur.next.val){
                    cur = cur.next;
                }
                pre.next = cur.next;
            }else{
                pre = cur;
            }
            cur = cur.next;
        }
        return dummy.next;
    }
}
```

## Question 167 - Two Sum II - Input Array is Sorted

```java
class Solution{
    public int[] twoSum(int[] numbers, int target){
        //define pointers
        int L = 0, n = numbers.length, R = n - 1;
        //two pointers find the sum
        while(L<R){
            int sum = numbers[L] + numbers[R];
            if(sum == target){
                return new int[]{L+1, R+1};
            }else if(sum<target){
                L++;
            }else{
                R--;
            }
        }
        return new int[]{-1,-1};
    }
}
```

## Question 259 - 3Sum Smaller

```java
class Solution{
    public int threeSumSmaller(int[] nums, int target){
        //sort the array
        Arrays.sort(nums);
        //define the counter
        int counter = 0, n = nums.length;
        //find out three sum
        for(int i = 0;i < n;i++){
            int L = i + 1, R = n - 1;
            while(L<R){
                int curSum = nums[L] + nums[R] + nums[i];
                if(curSum < target){
                    counter += R - L;
                    L++;
                }else{
                    R--;
                }
            }
        }
        return counter;
    }
}
```

## Question 283 - Move Zeros

```java
class Solution {
    public void moveZeroes(int[] nums) {

        int n = nums.length;
        if(n<2) return;
        int L = 0;
        int R = 1;
        while(R<n){
            if(nums[L]!=0){
                L++;
                R++;
            }else if(nums[R]==0){
                R++;
            }else{
                int temp = nums[R];
                nums[R] = nums[L];
                nums[L] = temp;
            }
        }
    }
}
```

## Question 763 - Partition Labels

```java
class Solution{
    public List<Integer> partitionLabels(String s){
        char[] arr = s.toCharArray();
        int[] cache = new int[128];
        for(int i = 0;i < arr.length;i++){
            char cur = arr[i];
            cache[cur] = i;
        }
        int L = 0, R = 0, index = 0;
        List<Integer> res = new LinkedList<>();
        while(index < arr.length){
            char cur = arr[index];
            R = Math.max(R, cache[cur]);
            if(R==index){
                int size = R - L + 1;
                res.add(size);
                R++;
                L = R;
            }
            index++;
        }
        return res;
    }
}
```

## Question 977 - Squares of a Sorted Array

```java
class Solution{
    public int[] sortedSquares(int nums[]){
        //define pointers
        int n = nums.length;
        int L = 0, R = n-1, index = n-1;
        //define the array to store squares
        int res[] = new int[n];
        //find the squares and assign them
        while(0 <= index){
            int leftNum =  nums[L] * nums[L];
            int rightNum = nums[R] * nums[R];
            if(leftNum < rightNum){
                res[index--] = rightNum;
                R--;
            }else{
                res[index--] = leftNum;
                L++;
            }
        }
    }
    return res;
}
```
