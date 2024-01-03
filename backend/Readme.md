# Here is how the algorithm works.

## First Solution
At first glance, a simple solution may come to mind. The CSV file can be read. For each line, the department name and sales can be extracted. Then, we would prepare a hashmap whose keys are department names, and values are total sales. After reading every line and adding up the sales for each department, we would simply use this hashmap to generate our output file.
 But this approach doesn’t work when the CSV file is bigger than our Ram. If every department name is unique, then the memory used by the hashmap may grow to be greater than the Ram. The computer would crash.

## Alternative
If we could somehow sort the CSV file, then identical department names would lie next to each other. This can help use read the file line by line. As we do so, we can just sum up the sales of the current department, and save it to our output CSV when a new department is read. This allows us to use constant memory. But how can we sort the file in the first place.

## Best Solution
I have modified the merge sort algorithm to solve this problem.
* First, the giant CSV file is divided into chunks of csv files. Since these files are small, they can be sorted by department name. The sales of simmilar departments will be summed up along the way.

* Secondly, we iteratively merge these. We pick two files at a time. We merge these files into a bigger file by reading them line by line, which is memory efficient. When department in the line of file1 is the same as file2, we sum them up, and append the new line in the ‘merged’ file. If not we append the lexigraphically lesser line to the ‘merged’ file. This way, we repeat the process until all the small files are merged into a big giant file.

* Finally, the giant merged file will have unique departments with their summed up sales.

## Time and Space Complexity
Since all files are read line by line in this process, the space complexity is constant, **` O(1) `**.

The merge sort algorithm takes at most **` O(log(n)) `** rounds of merging small files to reach a single gaint file. But at each round of merging, we are reading n amount of lines in total. Therefore, the time complexity is O(nlog(n)) where n is the number of lines of the csv file.

## To run
* **` npm run generate `** to generate a CSV file.
* To adjust the size of the CSV file, please modify **` /src/generate.js `** by uncommenting predefined sizes.
* **` npm start `** to process the generated CSV file. You can also copy and paste your own CSV file contents in **` /data.csv `**.