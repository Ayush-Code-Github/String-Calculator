function add(numbers) {
    if (!numbers) {
        return 0;
    }

    let delimiter = ',';
    if (numbers.startsWith("//")) {
        const parts = numbers.split("\n", 2);
        delimiter = parts[0].substring(2);
        numbers = parts[1];
    }

    numbers = numbers.replace(/\n/g, delimiter);
    const numList = numbers.split(delimiter);

    const negatives = numList.filter(num => parseInt(num) < 0);
    if (negatives.length) {
        throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numList.reduce((sum, num) => sum + parseInt(num), 0);
}

// Example Test:
console.log(add(""));          // Output: 0
console.log(add("1"));         // Output: 1
console.log(add("1,2"));       // Output: 3
console.log(add("1,2,3,4"));   // Output: 10
console.log(add("1\n2,3"));    // Output: 6
console.log(add("//;\n1;2"));  // Output: 3

try {
    console.log(add("1,-2"));  // Throws an error
} catch (e) {
    console.error(e.message);  // Output: negative numbers not allowed: -2
}

try {
    console.log(add("1,-2,-3"));  // Throws an error
} catch (e) {
    console.error(e.message);     // Output: negative numbers not allowed: -2, -3
}
