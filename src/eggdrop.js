/*
 * @Description: 鸡蛋掉落问题
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-02-28 14:12:23
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-02-28 14:54:04
 */

function superEggDrop2(K, N){
  if( N <= 2 || K === 1 ) return N ;
  // 很显然， m不可能超过N
  const aux = new Array(N) ;
  // m=1 : f(k,m) = 1
  aux[ 0 ] = new Array(K).fill(1)
  // aux[m][e] 表示有e+1个鸡蛋，能移动m+1是最多能测多少层楼
  for( let m = 1; m < N; m++ ){
    aux[ m ] = new Array(K)
    // k=1 : f(k,m) = m
    aux[ m ][ 0 ] = m + 1
    for( let e = 1; e < K; e++ ){
        // f(k,m) = f(k-1,m-1) + f(k, m-1) + 1
        let f = aux[ m - 1 ][ e - 1 ] + aux[ m - 1 ][ e ] + 1
        if( f >= N ){
            return m + 1
        }
        aux[ m ][ e ] = f
    }
  }
}