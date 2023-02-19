---
title: ProjectEuler Solutions
description: My ProjectEuler Solutions Bundle
date: '2022-09-07'
draft: false
slug: '/pensieve/projecteuler'
tags:
  - DSA
  - Java
---

## Question 1 - Multiples of 3 or 5

```java
class Solution{

    public String getAnswer(){
        int sum = 0;
        for(int i = 0; i < 1000; i++){
            if(i % 3 == 0 || i % 5 == 0){
                sum += i;
            }
        }
        return Integer.toString(sum);
    }

    public static void main(String args[]){
        System.out.println(new Solution().getAnswer());
    }
}
```

Answer → 233168

## Question 2 - Even Fibonacci Numbers

```java
class Solution{
    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){
        int x = 1, y = 2, sum = 0;
        while(x <= 4000000){
            if(x % 2 == 0){
                sum += x;
            }
            int z = x + y;
            x = y;
            y = z;
        }
        return Integer.toString(sum);
    }
}
```

Answer → 4613732

## Question 3 - Largest Prime Factor

```java
class Solution{

    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){
        long n = 600851475143l;
        while(true){
            long p = smallestFactor(n);
            if(p < n){
                n /= p;
            }else{
                return Long.toString(n);
            }
        }
    }

    private static long smallestFactor(long n){
        if(n<=1){
            throw new IllegalArgumentException();
        }
        for(long i = 2, end = (int)Math.sqrt(n); i <= end; i++){
            if(n % i == 0){
                return i;
            }
        }
        return n;
    }
}
```

Answer → 6857

## Question 4 - Largest Palindrome Product

```java
class Solution{

    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){
        int maxPalindrome = -1;
        for(int i = 100; i < 1000; i++){
            for(int j = 100; j < 1000; j++){
                int prod = i * j;
                if(isPalindrome(prod) && prod >  maxPalindrome){
                    maxPalindrome = prod;
                }
            }
        }
        return Integer.toString(maxPalindrome);
    }

    private static boolean isPalindrome(int n){
        String s = Integer.toString(n);
        return s.equals(reverse(s));
    }

    private static String reverse(String s){
        return new StringBuilder(s).reverse().toString();
    }
}
```

Answer → 906609

## Question 5 - Smallest Multiple

```java
import java.math.BigInteger;

class Solution{

    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    /*
     * The smallest number n that is evenly divisible by every number is a set {k1, k2, k3, ..., k_m}
     * is also known as the lowest common multiple (LCM) of the set of numbers.
     * LCM(x,y) = x*y/GCD(x,y)
     * When LCM is applied to a collection of numbers, it is communtative, associative, and idempotent.
     * Hence, LCM(k1,k2,k3,...,k_m) = LCM(...(LCM(LCM(k1,k2),k3)...), k_m)
     */

    public String getSolution(){
        BigInteger allLcm = BigInteger.ONE;
        for(int i=1;i<20;i++){
            allLcm = lcm(BigInteger.valueOf(i), allLcm);
        }
        return allLcm.toString();
    }

    private static BigInteger lcm(BigInteger x, BigInteger y){
       return x.divide(x.gcd(y)).multiply(y);
    }
}
```

Answer → 232792560

## Question 6 - Sum Square Difference

```java
class Solution{

    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    private static final int N = 100;

    public String getSolution(){
        int sum = 0;
        int sum2 = 0;
        for(int i = 1;i <= N; i++){
            sum += i;
            sum2 += i * i;
        }
        return Integer.toString(sum * sum - sum2);
    }
}
```

Answer → 25164150

## Question 7 - 10001st Prime

```java
class Solution{

    public static void main(String args[]){
        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){
        for(int i = 2, count = 0; ;i++){
            if(isPrime(i)){
                count ++;
            }
            if(count == 10001) return Integer.toString(i);
        }
    }

    public static boolean isPrime(int n){
        if(n < 0) throw new IllegalArgumentException("Negative number");
        if(n == 0 || n == 1) return false;
        else if (n == 2) return true;
        else {
            if(n % 2 == 0) return false;
            for(int i = 3, end = (int)Math.sqrt(n); i < end; i+=2){
                if(n % i == 0) return false;
            }
            return true;
        }
    }
}
```

Answer → 103813

## Question 8 - Largest product in a series

```java
class Solution{

    private final int ADJACENT = 13;

    private final String NUMBER = "73167176531330624919225119674426574742355349194934969835203127745326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

    public static void main(String args[]){

        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){

        long maxProd = -1;
        int n = NUMBER.length();
        for(int i = 0; i + ADJACENT <= n; i++){
            long prod = 1;
            for(int j = 0; j< ADJACENT; j++){
                prod *= NUMBER.charAt(i+j) - '0';
            }
            maxProd = Math.max(maxProd, prod);
        }
        return Long.toString(maxProd);
    }
}
```

Answer → 23514624000

## Question 9 - Special Pythagorean Triplet

```java
class Solution{

    private final int LIMIT = 1000;

    public static void main(String args[]){

        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){

        for(int a = 1; a < LIMIT; a++){
            for(int b = a + 1; b < LIMIT; b++){
                int c = LIMIT - a - b;
                if( a * a + b * b == c * c){
                    return Integer.toString(a * b * c);
                }
            }
        }
        throw new AssertionError("Not Found");
    }
}
```

Answer → 31875000

## Question 10 - Summation of Primes

```java
class Solution{

    private final int LIMIT = 2 * (int)Math.pow(10, 6);

    public static void main(String args[]){

        System.out.println(new Solution().getSolution());
    }

    public String getSolution(){

        long sum = 2;
        for(int i = 3;i < LIMIT;i+=2){
            if(isPrime(i)){
                sum += i;
            }
        }
        return Long.toString(sum);
    }

    public boolean isPrime(int n){

        if(n < 0) throw new IllegalArgumentException("Negative number");
        if(n == 0 || n == 1) return false;
        else if(n == 2) return true;
        else {
            if(n % 2 == 0) return false;
            for(int i = 3, end = (int)Math.sqrt(n); i < end; i+=2){
                if (n % i == 0) return false;
            }
        }
        return true;
    }
}
```

Answer → 143064094790

## Question 11 - Largest Product in a Grid

```java
public class Solution {

    public static void main(String[] args) {
		System.out.println(new Solution().getSolution());
	}


	/*
	 * We visit each grid cell and compute the product in the 4 directions starting from that cell.
	 * Note that the maximum product is 99^4 = 96059601, which fits in a Java int type.
	 */
	private static final int CONSECUTIVE = 4;

	public String getSolution() {

		int max = -1;
		for (int y = 0; y < SQUARE.length; y++) {
			for (int x = 0; x < SQUARE[y].length; x++) {
				max = Math.max(product(x, y, 1,  0, CONSECUTIVE), max);
				max = Math.max(product(x, y, 0,  1, CONSECUTIVE), max);
				max = Math.max(product(x, y, 1,  1, CONSECUTIVE), max);
				max = Math.max(product(x, y, 1, -1, CONSECUTIVE), max);
			}
		}
		return Integer.toString(max);
	}


	private static int product(int x, int y, int dx, int dy, int n) {

		// First endpoint is assumed to be in bounds. Check if second endpoint is in bounds.
		if (!isInBounds(x + (n - 1) * dx, y + (n - 1) * dy))
			return -1;

		int prod = 1;
		for (int i = 0; i < n; i++, x += dx, y += dy)
			prod *= SQUARE[y][x];
		return prod;
	}


	private static boolean isInBounds(int x, int y) {

		return 0 <= y && y < SQUARE.length && 0 <= x && x < SQUARE[y].length;
	}


	private static int[][] SQUARE = {
		{ 8, 2,22,97,38,15, 0,40, 0,75, 4, 5, 7,78,52,12,50,77,91, 8},
		{49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48, 4,56,62, 0},
		{81,49,31,73,55,79,14,29,93,71,40,67,53,88,30, 3,49,13,36,65},
		{52,70,95,23, 4,60,11,42,69,24,68,56, 1,32,56,71,37, 2,36,91},
		{22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80},
		{24,47,32,60,99, 3,45, 2,44,75,33,53,78,36,84,20,35,17,12,50},
		{32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70},
		{67,26,20,68, 2,62,12,20,95,63,94,39,63, 8,40,91,66,49,94,21},
		{24,55,58, 5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72},
		{21,36,23, 9,75, 0,76,44,20,45,35,14, 0,61,33,97,34,31,33,95},
		{78,17,53,28,22,75,31,67,15,94, 3,80, 4,62,16,14, 9,53,56,92},
		{16,39, 5,42,96,35,31,47,55,58,88,24, 0,17,54,24,36,29,85,57},
		{86,56, 0,48,35,71,89, 7, 5,44,44,37,44,60,21,58,51,54,17,58},
		{19,80,81,68, 5,94,47,69,28,73,92,13,86,52,17,77, 4,89,55,40},
		{ 4,52, 8,83,97,35,99,16, 7,97,57,32,16,26,26,79,33,27,98,66},
		{88,36,68,87,57,62,20,72, 3,46,33,67,46,55,12,32,63,93,53,69},
		{ 4,42,16,73,38,25,39,11,24,94,72,18, 8,46,29,32,40,62,76,36},
		{20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74, 4,36,16},
		{20,73,35,29,78,31,90, 1,74,31,49,71,48,86,81,16,23,57, 5,54},
		{ 1,70,54,71,83,51,54,69,16,92,33,48,61,43,52, 1,89,19,67,48},
	};
}
```

Answer → 70600674
