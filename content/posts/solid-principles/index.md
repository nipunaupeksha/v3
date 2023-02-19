---
title: SOLID Principles
description: SOLID for solid?
date: '2022-08-08'
draft: false
slug: '/pensieve/solid-principles'
tags:
  - SOLID
  - Java
---

## Introduction

When building performant, versatile software, it is important to follow a thorough design principle. One of the most famous one to use in software world for that is **SOLID**. The **SOLID** principles design is an **OOD(Object Oriented Design)** design principle introduced by **Robert C. Martin** aka **Uncle Bob**. The word **SOLID** is actually an acronym made of the five principles introduced by uncle Bob.

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

In this article, we will try to understand what those principles are and how we can use them to implement performant code.

### Single Responsibility Principle

The single responsibility principle states that, each class should have only sole purpose and not be filled with excessive functionality. Let's assume that we have a Java class named `AreaCalculator` with one method to find the area of a shape. And if we are going to add several methods like printing the area of the shape as a JSON object or as a CSV to that class, then that class is not doing the single purpose that it is intended to do, thus violating the single responsibility principle.

So, how can we fix this? We can create another class named `PrintArea` to add various printing methods.

### Open/Closed Principle

The open/closed principle states that classes should be open for extension and closed for modification. In other words, it means that, you should not have to rewrite an existing class for implementing new features. Let's again take our `AreaCalculator` as the example. Assume that you have two objects `Square` and `Circle`. And whenever you run the `findArea(Object obj)` function in the `AreaCalcultor` class, you have to use the `instanceof` keyword to check whether we are calculating the area for a square or circle, because the formulae for finding the area for those objects are not the same. Now assume that you have a new shape named `Triangle` and you want to find the area of it. But since your class is not extensible you have to edit the `findArea(Object obj)` function to support for the triangle shape also which results in violating the open/closed principle.

So, how can we fix this? To fix this we can create an interface named `Shape` and include a single method called `area()` with return type of `double`. Then we can implement this on the `Square`, `Circle` and `Triangle` methods. And when we can find the area using `return shape.area();` in `findArea(Shape shape)` method.

### Liskov Substitution Principle

The Liskov substitution principle states that every subclass of derived class should be substituable for their base or parent class. To get an idea of this think of the `Circle` class that we already discussed above. So we discussed that it should have the `Shape` interface implementation. So now we can create a new instance of class by using `Circle circle = new Circle();` or `Shape circle = new Circle();` because the `Circle` class is substituable for the `Shape` class. This is basically what Liskov substitution principle states.

### Interface Segregation Principle

The interface segregation principle states that interfaces should not force classes to implement what they can't do and large interfaces should be divided into small ones. For example assume that we are creating a new shape called `Cube` and, to calculate its volume we are adding a new method to the `Shape` interface. This is actually wrong since the shapes that we created earlier do not have a volume. So to fix that what we should do is create a new interface for the `volume()` method. The application of the single responsibility principle to interfaces is the concept known as the interface segregation principle.

### Dependency Inversion Principle

The dependency inversion states that components should depend on abstractions, and not on concretions. For example, assume that we are creating an instance variable of `AreaCalculator` inside a class like `private AreaCalculator areaCalculator = new AreaCalculator();`, then that variable will be using the concrete `AreaCalculator` and the dependency injection is done as a property injection. But this leads to temporal coupling code smell and single responsibility principle violation. To avoid that we can create a constructor dependency injection based on an interface. To do that, we can implement the `AreaCalculator` class with an interface, `IAreaCalculator` and use `private final IAreaCalculator areaCalculator;` with constructor initialization.

### Conclusion

So, in this article we have discussed the **SOLID** principles and how they should be used to create performant code. To get additional info on **SOLID** principles you can try reading the following books.

- Solid Principles Succinctly by Gaurav Arora
- Clean Code by Robert C. Martin
- Clean Code in Python, Develop Maintainable and Efficient Code by Mariano Anaya
