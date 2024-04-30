public class Recursion{
    
    public int factorial(int number){
        if(number == 1){
            return 1;
        }
        return number * factorial(number - 1);
    }



    public boolean checkPalindrome(String word){

        if (word.length() <= 1) {
            return true;
        }

        if (word.charAt(0) != word.charAt(word.length() - 1)) {
            return false;
        }

        return checkPalindrome(word.substring(1, word.length() - 1));
    }

    public int getDigitSum(int num){
        if(num < 10){
            return num;
        }

        int sum = num % 10 + getDigitSum(num/10);
        return sum;
    }

    public int getFibonacciNumber(int number){
        if(number <= 1){
            return 0;
        }
        if(number == 2){
            return 1;
        }
        

        int fibNumber = getFibonacciNumber(number-1) + getFibonacciNumber(number-2);
        return fibNumber;
    }




    public static void main(String[] args){

        Recursion obj1 = new Recursion();

        System.err.println("Factorial 6 is " + obj1.factorial(6));
        System.err.println("Entered word is Palindrome state is " + obj1.checkPalindrome("Thimira"));
        System.err.println("123456 sum of digit is " + obj1.getDigitSum(123456));
        System.err.println("6 th fibonacci number is " + obj1.getFibonacciNumber(29));



    }

}
