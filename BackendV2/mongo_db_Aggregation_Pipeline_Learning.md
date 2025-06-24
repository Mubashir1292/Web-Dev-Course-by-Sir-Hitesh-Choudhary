# I have 20 + Questions related to the mongo db aggregation pipeline for handling the data and practising out the learning the basics of no-sql databases..

## 1 Question : Fetch the active users
[
    {
        $match:{
            isActive:true
        }
    }
]

## 2 Question : Fetch the users average age by passing by grouping them on the base of gender

//? This function is handling over all the average age of the users
[
    {
        $group:{
            _id:null,
            "averageAge":{
                avg:"$age"
            }
        }
    }
]
//? This function/method is handling average of the users based on the gender
[
    {
        $group:{
            _id:"$gender",
            "averageAge":{
                avg:"$age"
            }
        }
    }
]