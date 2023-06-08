import {v4 as uuid} from 'uuid'
const recieptController = (app) => {
    app.get('/hello', (req,res) => {
        res.send('Life is good!');
    });
    app.get('/receipts/:id/points', (req, res) => {
        const id = req.params.id;
        // Use the 'id' parameter in your logic
        // ...
        var points_for_id = getPoints(id);
        res.send(`Points for receipt ID ${id} is ${points_for_id}`);
      });
    app.post('/receipts/process', (req,res) => {
        processData(req,res);
    });
}
var pointsArray = [];
const processData =async (req,res) => {
    var points = 0;
    var retailer = req.body.retailer.match(/[a-zA-Z0-9]/g).length;
    points += retailer;
    console.log(retailer + ' retailer name points');
    const total = parseFloat(req.body.total);
    // console.log(total);
    if(Number.isInteger(total) ){
        points += 50;
        console.log(points + ' 50 points for integer bill');
    }  
    if(total % 0.25 == 0){
        points += 25;
        console.log(points + ' 25 points for 0.25 bill');
    }
    
    if(req.body.items.length / 2 > 0) {
        
        var integerNumber = Math.floor(req.body.items.length / 2) * 5;
        points += integerNumber;
        console.log(integerNumber + ' pairs of items');

    }

    req.body.items.map((item) => {
        // console.log(item.price + ' ' + parseFloat(item.price));
        if(item.shortDescription.trim().length % 3 == 0) {
            console.log( Math.ceil(parseFloat(item.price) * 0.2 )+' for each len % 3');
            points += Math.ceil( parseFloat(item.price) * 0.2);
        }
    });
    var purchaseDate = req.body.purchaseDate;
    console.log(purchaseDate + ' purchase date');
    var day = parseInt(purchaseDate.split("-")[2]);
    console.log(day + ' day');
    if(day % 2 !== 0) {
        points += 6;
    }
    var purchaseTime = req.body.purchaseTime;
    var hours = parseInt(purchaseTime.split(":")[0]);
    var minutes = parseInt(purchaseTime.split(":")[1]);

    var isAfter2PM = hours > 14 || (hours === 14 && minutes >= 0);
    var isBefore4PM = hours < 16 || (hours === 16 && minutes === 0);

    if(isAfter2PM && isBefore4PM) {
        points += 10;
        console.log('10 points for time between 2 and 4 pm');
    }
    var pointsEarned = {
        id: uuid(),
        points: points
    };

    console.log(points+ ' final points');

    pointsArray.push(pointsEarned);
    console.log(pointsArray);
    res.send(pointsEarned.id);
}

const getPoints = (targetId) => {
    console.log(targetId);
    console.log("inside")
    var foundObject = pointsArray.find(obj => obj.id == targetId);
    if (foundObject) {
        console.log('Found object:', foundObject);
        return foundObject.points;
      } else {
        console.log('ID not found.');
        return 0;
      }
}

export default recieptController;