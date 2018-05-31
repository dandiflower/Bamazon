

var mysql = require("mysql");
var inquirer = require("inquirer");
var {table} = require("table");

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
    // queryId();
});
// Display all of the items available for sale. Include the ids, names, and prices of products

function showProduct() {
    var header = ["ID#", "Name", "Department", "Price", "# In Stock"];
    var tableResult = [];
    var tablePart;
    var output;

    tableResult.push(header);

    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {

            tablePart = [
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
                
            ];

                tableResult.push(tablePart);
        }

            output = table(tableResult);

            console.log(output);
            queryId();

    });
}


    function queryId() {
        inquirer.prompt([
            {
            name: "idQuery",
            type: "input",
            message: "What is the ID number of the product you would like to buy?"
            }
        ]).then(function(answer) {
            
            connection.query("SELECT * FROM products", function(err, results) {
                
                if (err) throw err;
                var choiceId = parseInt(answer.idQuery);
                var productChosen = results[choiceId - 1].product_name;
                var inventory = results[choiceId -1].stock_quantity;

                console.log("You selected # " + choiceId + ", " + productChosen);
                
                selectedItem();
            
            function selectedItem() {
                inquirer.prompt([
                    {
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to purchase?"

                    }
                ]).then(function(response) {
                     
                    var chosenQuantity = parseInt(response.quantity);
                    // return chosenQuantity;
                    console.log("Let me check if we have " + chosenQuantity + "...");

                    inventoryCheck();

                    function inventoryCheck(params) {
                    
                        connection.query("SELECT * FROM products", function () {
                            if (err) throw err;
                            // console.log(chosenQuantity);
                            // console.log(productChosen);
                            
                            if (chosenQuantity <= inventory) {
                                console.log("We are fulfilling your order!");
                                updateInventory();
                            } else {
                                console.log("Sorry, we have an insufficient quantity!");
                                startover();
                            }

                        });
                    }
                function updateInventory() {
                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (inventory - chosenQuantity)
                        }, { item_id: choiceId}],
                        function (error) {
                            if (error) throw err;
                            console.log("success!");
                            startover();  
                        }
                    );

                }

                function startover() {
                    inquirer.prompt({
                        name: "startover",
                        type: "list",
                        message: "Please select what you would like to do next",
                        choices: ["See Items", "Quit"]
                    }).then(function(ans) {
                        if (ans.startover === "See Items") {
                            showProduct();
                        } else {
                            console.log("goodbye");
                            connection.end();

                    }
                    
                });
                }
            });
        }

        });
    });
        
}


// Once the customer has placed the order, your application should check
// if your store has enough of the product to meet the customer 's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However,
// if your store does have enough of the product, you should fulfill the customer 's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.