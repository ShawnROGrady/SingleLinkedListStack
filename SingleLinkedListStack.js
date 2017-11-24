//Code By Shawn O'Grady

/*
+In trying to learn JS I am trying to implement some common data structures

+This is my attempt at a singly linked list stack
+End goal is to have user enter prompts (in main function) in order to perform the following functions:
  1. push a value
  2. pop a value
  3. print the entire stack
  4. close the program

+I currently believe I can push values, pop values, and print the stack
  -pop function feels like it could be improved
  -need to add main function to take user input
*/

//using strict node for safety
"use strict";

//Node for a singly linked list:

function Node(){

  //using previous node pointer since easier for stack
  var value, prevNode;

  //a constructor:
  function createNode(input){
    this.value=input;
  }

  //function to set the next node value:
  function doSetPrevNode(newNode){
    this.prevNode=newNode;
  }

  var NodeAPI={
    makeNode:createNode,
    setPrevNode:doSetPrevNode,
  };
  return NodeAPI;
}

//sll stack:
function sllStack(){
  var top=Node(); //node that will be popped first
  var bottom=Node();  //node that will be popped last

  //push function:
  function doPush(input){
    //create new node w/ specified value
    var tmp=Node();
    tmp.makeNode(input);

    if(top.value!=null){
      //there are things in the stack;
      tmp.setPrevNode(top);
      top=tmp;
    }else{
      //list is empty
      top=tmp;
      bottom=tmp;
    }
    console.log(tmp.value + " was pushed");
  }

  //pop function:
  function doPop(){
    if (top.value!=null){
      //there are things on the stack
      var tmp=top;

      if(top!=bottom){
        //we're not at the bottom of the stack
        top=top.prevNode;
      }

      else{
        //we're popping the last element in the stack
        top=Node();
        bottom=Node();
      }


      console.log(tmp.value+" was popped");

    }else{
      //stack is empty
      console.log("stack is empty, cannot pop an item");
    }

  }

  //print stack function:
  function doPrint(){
    if(top.value!=null){
      //there are things on the stack
      var stackString="Stack contains(in order): \r";  //will hold entirety of stack as single string for simple printing

      var tmp=top;
      stackString=stackString+tmp.value+"\r";  //add value to the string

      //traverse queue, top to bottom, adding values to string
      while(tmp!=bottom){
        tmp=tmp.prevNode;
        stackString=stackString+tmp.value+"\r";  //add value to the string
      }
      console.log(stackString); //print the entirety of the stack as single string
    }else{
      //stack is empty
      console.log("stack is empty");
    }
  }

  var publicAPI={
    push:doPush,
    pop:doPop,
    print:doPrint
  };
  return publicAPI;

}

//testing basic functions:

var stack=sllStack();
stack.print();  //"stack is empty"

//testing if properly pushes
stack.push("one");
stack.push("two");
stack.push("three");

stack.print(); //"three two one"

//testing if properly pops to empty:
stack.pop();  //"three"
stack.pop();  //"two"
stack.pop();  //"one"

stack.pop();  //"stack is empty, cannot pop an item"
stack.print();  //"stack is empty"


//testing if properly pushes after being popped to empty:
stack.push("four");
stack.push("five");
stack.push("six");
stack.print();  //"six five four"


//testing if properly pops after being emptied+refilled:
stack.pop();  //"six"
stack.print(); //"five four"
stack.pop();  //"five"
stack.pop();  //"four"

stack.pop();  //"stack is empty, cannot pop an item"
stack.print();  //"stack is empty"