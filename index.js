//  1. BINARY GAPS
function solution (N) {

  /* Solving with JavaScript
   9 => 1001, binary gap = 2
   1041 => 10000010001, binary gap = 5

   Edge cases
   1. 1111
   2. 0000
    =>0
  
  Diagram:
  10000010001
  i
  j

  10000010001
  i
        j

  store gap = 5
  set i=j

  10000010001
        i
        j

   10000010001
         i
             j
  
  store gap = 3
  set i=j
  
  10000010001
            i
            j

  Steps.
  1. Have pointers i and j set to position 0 of the binary number
  2. increment j pointer untill it hits a 1 n the binary sequence
  3. store j-i-1 to get the gap 
  4. set i = j
  5. repeat untill you get through the array

  */
  
  let binaryN = (N >>> 0).toString(2); //convert N to binary form
  let maxGap = 0

  for (let i = 0; i < binaryN.length; i++) {
    for (let j = i + 1; j < binaryN.length; j++) {
      if (binaryN[i] == 1 && binaryN[j] == 1 && i != j) {
        if (maxGap<j-i-1){
          maxGap = j-i-1
        }
        i = j;
       
      }
    }
  }
  return maxGap;
  
};

console.log('Binary Gap of 9 = ' + solution(9));     // Output: 2
console.log('Binary Gap of 1041 = ' + solution(1041));  // Output: 5


//  2. CYCLIC ROTATION (Method 1)
function solution1 (A1, K1) {

 /*
   Solving with JavaScript
  
    Edge cases = []
    
    
    [1,2,3,4,5],  K = 3,
    [5,1,2,3,4]... 1st right rotation
    [4,5,1,2,3]... 2nd right rotation
    [3,4,5,1,2]... 3rd right rotation


    [1,2,3,4,5],  K = 2,
    [5,1,2,3,4]... 1st right rotation
    [4,5,1,2,3]... 2nd right rotation


  QUEUE => FIFO
    []
    push{}..(push)
    push 3 => [3]
    push 2 => [2,3]
    push 7 => [7,2,3]

  remove{}..(pop)
    [7,2,3]
    1st remove => [7,2]
    2nd remove => [7]
    3rd remove => []


  Steps:
    push, pop, reverse
    [1,2,3]
    1. pop{} the end of the arry
      [1,2] removes 3
    2. reverse{}
      [2,1]
    3. push{}
      [2,1,3]
    4. reverse{}
      [3,1,2]
    5. Repeat K times
  */

  if (A1.length == 0 || A1 == null || A1.length == undefined) {
    return A1
  }

  for(let i = 0; i < K1; i++){
    let arrayEnd = A1.pop()

    A1.reverse()

    A1.push(arrayEnd)

    A1.reverse()
  }

  return A1;

}

console.log('Method 1: Rotating [1,2,3,4,5] to the right 3 times = ' + solution1([1,2,3,4,5], 3));
  
    

//  3. CYCLIC ROTATION (Method 2)

function solution2 (A2, K2) {
  
  /*Solving with JavaScript
   Edge cases = []

   [1,2,3,4]... K2 = 3
   [4,1,2,3] => [3,4,1,2] => [2,3,4,1]

   Steps:
   1. create a new array
   2. shift it to the right K2 times
   3. shifted element willcome to the begening of the array

  */

  function shiftArrayRight(A2) {
    let A2Len = A2.length;
    let B = new Array(A2Len);

    // Shift elements to the right by one position
    for (let i = 0; i < A2Len; i++) {
        B[(i + 1) % A2Len] = A2[i];
    }

    return B;
  }

  if (A2.length == 0 || A2.length == null || A2.length == undefined ){
    return A2
  }

  for(let i = 0; i < K2; i++){
    A2 = shiftArrayRight(A2)
  }
  
  return A2;

}

console.log('Method 2: Rotating [4,6,2,4,5] to the right 3 times = ' + solution2([4,6,2,4,5], 3));


// 4. ODD OCCURENCES IN AN ARRAY

function solution3 (A3) {
  /*

  [1,2,1,2,3]  => A[0] : A[2], A[1] : A[3]
  unpaired => A[4]

  Edge cases:
  1. Empty array
  2. Duplicates

  Steps:
  1. itterate through array
  2. store the value and when a value has a match, eliminate it
  3. return the value without a match.

  */

  let hash = {};

  for (let i = 0; i < A3.length; i++){
    if(!hash.hasOwnProperty(A3[i]) || hash[A3[i]] == 0) { 
      hash[A3[i]] = 1;
    }else {
      
      hash[A3[i]] = 0 ;
    }
  }
    
    for(var key in hash) {
      if(hash.hasOwnProperty(parseInt(key))) {

        if(hash[parseInt(key)] === 1 ) {
          return parseInt(key)
        }
      }
    }

  

}

console.log("Odd occurences in array [9,3,9,3,9,7,9] = " + solution3([9,3,9,3,9,7,9]))


// 5. FROG JUMP

function solution4 (x, y, d) {

  /*
  x = starting position
  y = ending position
  d = distance 

  Steps:
  1. (y - x) / d = number of jumps
     (y -x) % d has reminder = jumps +1  else jumps = jumps 

     timestamp 0(N) = to show that the code will run a certain number if times

  */

// Math.floor ensures the number is rounded of to the nearest intrger backwards ie 3.9 will be 3
// Math.ceil ensures the number is rounded of to the nearest intrger forwards ie 3.9 will be 4
// We require the minimall jumps, so math.floor. if it were the max jumps, then use math.ceil instead

let jumps = Math.floor((y - x) / d);

 if ((y - x) % d !== 0 && (y - x) > d) {
  jumps++
 }

 return jumps;

}

// will output 3
console.log("The number of jumps will be : " + solution4(10, 85, 30));



// 6. PERM MISSING ELEMENT

function solution5(A5) {
  let n = A5.length;
  let sum = (n + 1) * (n + 2) / 2;
  let trueSum = 0;

  for (let i = 0; i < n; i++) {
    trueSum += A5[i];
  }

  return sum - trueSum;
}

console.log("The missing element in the array [3,1,2,4,5] is : " + solution5([3, 1, 2, 5]));


// 7. TAPE EQUILIBRIUM

function solution6(A6) {

  /*

  1. itterate thru the points where we can tear the tickets
  2. At each tear, calculate the value of the ticket at the left of the tear
     subtratcted from the ones at the right of the tape
  3. Store the difference if it is smaller than the other values that had been stored

  */

  let minDifference = Number.MAX_VALUE;
  let untornTapeValue = 0;
   
  //Calculate the value of the tape
  for (let i = 0; i < A6.length; i++) {
    untornTapeValue += A6[i];
  };

  let leftSum = 0;
  let rightSum = untornTapeValue;
  let currentDiff = Number.MAX_VALUE;

  // Maximum difference
  for (let i = 0; i < A6.length; i++) {
    leftSum += A6[i];
    rightSum -= A6[i];
    currentDiff = Math.abs(leftSum - rightSum);
    
    if(minDifference > currentDiff) {
      minDifference = currentDiff;
    }
  }

  return minDifference;

}

console.log("The tape Equilibrium is at :" + solution6([3,1,2,4,3]))
