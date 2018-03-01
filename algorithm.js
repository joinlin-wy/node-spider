//二分查找
function binarySearch(array, goal) {
    let low = 0,high=array.length-1
    while (low <= high) {
      mid = Math.floor((low + high) / 2)
      if (goal === array[mid]) {
        return mid + 1
      } else if (goal > array[mid]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return null
}
//选择排序 从原数组按一定规则(比如取最大值)取出数据放入新的数组,原数组只包含剩余数据,重复执行此操作
//快速排序
function quickSort(array) {
    if(array.length < 2) return array
    let less = [], great = [],base = array[0]//选择第一个为基准值
    for(let i = 1; i<array.length;i++){
        if(array[i] >=base){
            great.push(array[i])
        }else{
            less.push(array[i])
        }
    }
    return quickSort(less).concat(base).concat(quickSort(great))
}
const list = [2,3,1,4,5,7,6,9,12,10]
let sum = list.reduce((pre, cur) => pre + cur,0)
console.log(sum)
let sortedList = quickSort(list)
console.log(sortedList)
console.log(`middle:${binarySearch(sortedList,9)}`)