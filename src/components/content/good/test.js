import GoodsList from "components/content/good/GoodsList";
function array(){
var heightArray = [], //存储每列的高度。
        columns = 2; //假设为5列;
      for (let i = 0; i < 15; i++) {
        // 遍历所有div，对他们设置left和top值
        var currentDiv = document.getElementsByClassName("good-list")[i];
        if (i < columns) { //i<columns说明为第一排
          currentDiv.style.top = 0; //第一排top值为0
          currentDiv.style.left = i * 100 + "px"; // 第一张left:0,第二张left:100...
          heightArray[i] = currentDiv.offsetHeight; // 第1排直接设置
        } else {// 非第1排
          var minHeight = Math.min.apply(null, heightArray); //找到高度最小值
          var minIndex = heightArray.indexOf(minHeight); //找到最小值所在列
          currentDiv.style.top = minHeight + "px"; // 设置top值
          currentDiv.style.left = minIndex * 100 + "px"; //设置left值
          heightArray[minIndex] += currentDiv.offsetHeight; // 更新高度数组。
 
        }
      }
    }
    export{
        array
    }