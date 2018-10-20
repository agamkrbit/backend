let Test = require('./models/database').Test;
let fs = require('fs');
let parser = require('csv-parse');
let csvData = [];
setTimeout(() => {
    fs.createReadStream('/Users/agamkumar/Downloads/data_sheet.csv')
    .pipe(parser({delimiter : ','}))
    .on('data', function(row){
        if(row[0] !== 'id'){
            csvData.push({
                id : row[0],
                name : row[1],
                description : row[2],
                noUserAttempted : parseInt(row[3]),
                noUserLike: parseInt(row[4]),
                timeLimit : parseInt(row[5]),
                instructions : row[9],
                noOfQuestions : parseInt(row[6]),
                categories : row[7].split(',').map(val => val.trim()),
                subCategories : row[8].split(':').map((val) => {
                    val = val.split(';');
                    console.log({
                        value : val[0],
                        categories : val[1]
                    })
                    return {
                        value : val[0],
                        categories : val[1]
                    }
                })
            })
        }
    })
    .on('end', function(){
        Test.deleteMany({}, function(err, adv){
            if(!err){
                console.log(csvData);
                Test.insertMany(csvData, function(err, adv){
                    if(!err){
                        console.log('updated');
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log(err);
            }
        })
    })
}, 4000)

// let file = fs.readFile('/Users/agamkumar/Downloads/data_sheet.csv', 'utf8', function(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('-----reading data------');
//         console.log(data);
//         data = data.split('\n');
//         data.shift();
//         console.log(data);
//         data = data.map((value) => {
//             return{
//                 id : value[0],
//                 name : value[1],
//                 description : value[2],
//                 noUserAttempted : value[3],
//                 noUserLike: value[4],
//                 timeLimit : value[5],
//                 noOfQuestions : value[6],
//                 categories : value[7].split(',').map(val => val.trim()),
//                 subCategories : value[8].split(',').map((val) => {
//                     val = val.split(';');
//                     return {
//                         value : val[0],
//                         categories : val[1]
//                     }
//                 })
//             }
//         });
//         console.log(data);
//         Test.deleteMany({}, function(err, adv){
//             if(!err){
//                 Test.insertMany(data, function(err, adv){
//                     if(!err){
//                         console.log('updated');
//                     }
//                 })
//             }
//         })
//     }
// })