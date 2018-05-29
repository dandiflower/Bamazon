

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    showProduct();
});
// Display all of the items available for sale. Include the ids, names, and prices of products

function showProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            if (parseInt(res[i].stock_quantity) > 0) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            }
        console.log("--------------------------------------------");
        }
    });
    queryId();
}

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.

function queryId() {
    inquirer.prompt([
        {
        name: "idQuery",
        type: "input",
        message: "What is the product ID of the item you would like to buy?"
        }
    ]).then(function(answer) {
        var chosenID;
        chosenID = parseInt(answer.idQuery);
            
        });
    }

// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check
// if your store has enough of the product to meet the customer 's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However,
// if your store does have enough of the product, you should fulfill the customer 's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.