/*
 * @Description: 判断点在圆内/多边形内
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-08-31 14:42:06
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-08-31 14:52:07
 */


//多边形内部
const insidePolygon = (points , testPoint) => {
  let x = testPoint[0] , y = testPoint[1] ;
  let inside = false ;
  for(let i = 0, j = points.length ; i < points.length ; j= i++) {
    let xj = points[i][0] , yj = points[j][0] ;
    let intersect = ((yi - y) != (yi > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi); 
    if (intersect) inside = !inside;
  }
  return inside; 
}


//圆内部
const pointInsideCircle = (point , circle, r) => {
  if (r == 0) return false ;
  let dx = circle[0] - point[0] ;
  let dy = circle[1] - point[1] ;

  return dx*dx+dy*dy <= r*r ;
}
