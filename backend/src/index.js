import { resetTmpFolder } from './utils.js'
import splitAndSort from './split-and-sort.js'
import merge from './merge.js'

//main
resetTmpFolder()
splitAndSort()
merge()
resetTmpFolder()
