---
title: Elements of Programming Interviews in Java Solutions
description: My EPI Solutions Bundle
date: '2022-08-23'
draft: false
slug: '/pensieve/epi'
tags:
  - DSA
  - Java
---

## Important Notes

### Primitive Types

- `x & ~(x - 1)` isolates the lowest bit that is 1 → `x = (00101100)₂ , x - 1 = (00101011)₂, ~(x - 1) = (11010100)₂, x & ~(x - 1) = (00000100)₂ `
- `x & (x - 1)` replaces the lowest bit that is 1 with 0 `x = (00101100)₂, x - 1 = (00101011)₂, x & (x - 1) = (00101000)₂`

## Question 1 - Count Bits

```java
class Solution{
    public int bitCount(int num){
        int count = 0;
        while(num != 0){
            count += 1;
            num >>>= 1;
        }
        return count;
    }
}
```

## Question 2 - Check Parity of a Number

```java:title=S1
class Solution{
    public int parityCheck(int num){
        int res = 0;
        while(num!=0){
            res ^= (num&1);
            num>>>=1;
        }
        return res;
    }
}
```

```java:title=S2
class Solution{
    public int parityCheck(int num){
        int res = 0;
        while(num!=0){
            res ^= 1;
            num &= (num-1);
        }
        return res;
    }
}
```

```java:title=S3
//The parity of 00101100 (which is 1) is same as 0010 ^ 1100 = 1110, is similar to 11 ^ 10 = 01, is similar to 0 ^ 1 = 1
class Solution{
    public int parityCheck(int num){
        num ^= num >>> 16;
        num ^= num >>> 8;
        num ^= num >>> 4;
        num ^= num >>> 2;
        num ^= num >>> 1;
        return num & 0x1;
    }
}
```

## Question 3 - Swap Bits

```java
class Solution{
    //swap bit i with j
    public int swapBits(int num, int i, int j){
        if(((num >>> i) & 1) != ((num >>> j) & 1)){
            long bitMask = 1L << i || 1L << j;
            num ^= bitMask;
        }
        return num;
    }
}
```

## Question 4 - Reverse Bits

```java
class Solution{
    public int reverseBits(int num){
        int res = 0;
        for(int i = 0;i < 32;i++){
            res <<= 1;
            int temp = x & 1;
            if(temp == 1) res++;
            x >>>= 1;
        }
        return res;
    }
}
```