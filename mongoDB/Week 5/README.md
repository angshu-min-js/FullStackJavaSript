#Homework 5.1
###Finding the most frequent author of comments on your blog
In this assignment you will use the aggregation framework to find the most frequent author of comments on your blog. We will be using the same basic dataset as last week, with posts and comments shortened considerably, and with many fewer documents in the collection in order to streamline the operations of the Hands On web shell. 

Use the aggregation framework in the web shell to calculate the author with the greatest number of comments. 

To help you verify your work before submitting, the author with the fewest comments is Cody Strouth and he commented 68 times. 

Once you've found the correct answer with your query, please choose your answer below for the most prolific comment author. 

Note: this data set is relatively large. Due to some quirks of the shell, the entire result set gets pulled into the browser on find(), so if you want to see the document schema, we recommend either using db.posts.findOne(), db.posts.find().limit(1), or that you plan on waiting for a bit after you hit enter. We also recommend that the last phase of your aggregation pipeline is {$limit: 1} (or some single digit number) 
**Solution:**
```
> db.posts.aggregate([{$unwind:"$comments"},{$group:{_id:"$comments.author",num:{$sum:1}}},{$sort:{num:-1}},{$limit:1}])
> {"_id":"Gisela Levin","num":112}
```
#Homework 5.2
###Crunching the Zipcode dataset
Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000. 

For this problem, assume that a city name that appears in more than one state represents two separate cities. 

Please round the answer to a whole number. 
Hint: The answer for CT and NJ (using this data set) is 38177. 

Please note:
Different states might have the same city name.
A city might have multiple zip codes.


For purposes of keeping the Hands On shell quick, we have used a subset of the data you previously used in zips.json, not the full set. This is why there are only 200 documents (and 200 zip codes), and all of them are in New York, Connecticut, New Jersey, and California. 

If you prefer, you may download the handout and perform your analysis on your machine with
```
> mongoimport -d test -c zips --drop small_zips.json
```
**Solution:**
```
>db.zips.aggregate([{$match:{state:{$in:['CA','NY']}}},{$group:{_id:{state:'$state',city:'$city'},pop:{$sum:'$pop'}}},{$match:{pop:{$gt:25000}}},{$group:{_id:null,average:{$avg:'$pop'}}}])
>{_id:null,average:44805}
```
#Homework 5.3
###Who's the easiest grader on campus?
A set of grades are loaded into the grades collection. 

The documents look like this:
```
{
	"_id" : ObjectId("50b59cd75bed76f46522c392"),
	"student_id" : 10,
	"class_id" : 5,
	"scores" : [
		{
			"type" : "exam",
			"score" : 69.17634380939022
		},
		{
			"type" : "quiz",
			"score" : 61.20182926719762
		},
		{
			"type" : "homework",
			"score" : 73.3293624199466
		},
		{
			"type" : "homework",
			"score" : 15.206314042622903
		},
		{
			"type" : "homework",
			"score" : 36.75297723087603
		},
		{
			"type" : "homework",
			"score" : 64.42913107330241
		}
	]
}
```
There are documents for each student (student_id) across a variety of classes (class_id). Note that not all students in the same class have the same exact number of assessments. Some students have three homework assignments, etc. 

Your task is to calculate the class with the best average student performance. This involves calculating an average for each student in each class of all non-quiz assessments and then averaging those numbers to get a class average. To be clear, each student's average includes only exams and homework grades. Don't include their quiz scores in the calculation. 

What is the class_id which has the highest average student performance? 

Hint/Strategy: You need to group twice to solve this problem. You must figure out the GPA that each student has achieved in a class and then average those numbers to get a class average. After that, you just need to sort. The class with the lowest average is the class with class_id=2. Those students achieved a class average of 37.6 

If you prefer, you may download the handout and perform your analysis on your machine with
```
> mongoimport -d test -c grades --drop grades.json
```

Below, choose the class_id with the highest average student average.
**Solution:**
```
db.grades.aggregate([
    {
        $unwind: '$scores'
    },
    {
        $match: {
            'scores.type': { $in: ['exam', 'homework'] }
        }
    },
    {
        $group: {
            _id: {
                class_id: '$class_id',
                student_id: '$student_id'
            },
            scoresAvg: { $avg: '$scores.score' }
        }
    },
    {
        $project: {
            _id: 0,
            student_id: '$_id.student_id',
            class_id: '$_id.class_id',
            scoresAvg: 1
        }
    },
    {
        $group: {
            _id: {
                class_id: '$class_id'
            },
            avg: {
                $avg: '$scoresAvg'
            }
        }
    },
    {
        $sort: {
            'avg': -1
        }
    },
    {
        $limit: 1
    }
])
```
#Homework 5.4
###Removing Rural Residents
In this problem you will calculate the number of people who live in a zip code in the US where the city starts with a digit. We will take that to mean they don't really live in a city. Once again, you will be using the zip code collection, which you will find in the 'handouts' link in this page. Import it into your mongod using the following command from the command line:
```
> mongoimport -d test -c zips --drop zips.json
```
if you imported it correctly, you can go to the test database in the mongo shell and conform that
```
> db.zips.count()
```
yields 29,467 documents.
The project operator can extract the first digit from any field. For example, to extract the first digit from the city field, you could write this query:
```
db.zips.aggregate([
    {$project: 
     {
	first_char: {$substr : ["$city",0,1]},
     }	 
   }
])
```
Using the aggregation framework, calculate the sum total of people who are living in a zip code where the city starts with a digit. Choose the answer below.

You will need to probably change your projection to send more info through than just that first character. Also, you will need a filtering step to get rid of all documents where the city does not start with a digital (0-9).

Note: When you mongoimport the data, you will probably see a few duplicate key errors; this is to be expected, and will not prevent the mongoimport from working. There is also an issue with some versions of MongoDB 3.0 where it claims that 0 documents were mongoimported, when in fact there were 29,467 documents imported. You can verify this for yourself by going into the shell and counting the documents in the "test.zips" collection.
**Solution:**
```
>db.zips.aggregate([
    {
        $project: {
            _id: 0,
            first_char: {
                $substr : ['$city', 0, 1]
            },
            pop: 1
        }
    },
    {
        $match: {
            first_char: {
                $in: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
            }
        }
    },
    {
        $group: {
            _id: 0,
            sum: {
                $sum: '$pop'
            }
        }
    }
])
> { "_id" : 0, "sum" : 298015 }
```
