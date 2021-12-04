const { formatPosts } = require('../../Utilities/utilFunctions')
const { easyToTest } = require('../../Utilities/utilFunctions')
const { getPosts } = require('../../Components/Forum')

import {
  unformattedPosts1,
  formattedPosts1,
  unformattedPosts2,
  formattedPosts2,
  unformattedEmptyPosts
} from '../TestingObjects/testingObjects'

test('should output added numbers', () => {
  const answer = easyToTest(2, 5)
  expect(answer).toBe(7)
})

test('should output inputted object into the formatted output object expected from the testing objects file', () => {
  //Checking for formatting
  const formattedCheck1 = formatPosts(unformattedPosts1)
  expect(formattedCheck1).toStrictEqual(formattedPosts1)

  //Checking for formatting 2
  const formattedCheck2 = formatPosts(unformattedPosts2)
  expect(formattedCheck2).toStrictEqual(formattedPosts2)

  //checking data in object gives empty array
  expect(formatPosts(unformattedEmptyPosts)).toStrictEqual([])
})
