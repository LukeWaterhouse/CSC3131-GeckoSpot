export function easyToTest(num1, num2) {
  return num1 + num2
}

export function formatPosts(response) {
  // console.log("Before:", response)
  var list = Object.entries(response.data)

  var listLength = list.length

  let postList = []

  for (let i = 0; i < listLength; i++) {
    var item = Object.entries(list[i])
    postList.push(item[1][1])
  }
  // console.log("After:", postList)

  return postList
}
