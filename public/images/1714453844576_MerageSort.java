public class MerageSort {


    public void merge(int arr[], int l, int m, int r){

        int n1 = m-l
    }



    public void mergeSort(int arr[], int l, int r){
        if (l < r){

            int m = (l+r)/2;

            mergeSort(arr, 1, m);
            mergeSort(arr, m+1, r);

            merge(arr, l, m, r);
        }
    }

    public void display(int arr[]){

        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i] + " ");
        }
        System.out.println();

    }
    public static void main(String[] args) {

        int arr[] = {6, 5, 12, 10, 9, 1};

        MerageSort sorting_object = new MerageSort();

    }
    
}