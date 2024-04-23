const connection = require('./db'); // Importing the database connection
const path = require('path');
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const TokenManager = require("./token_manager");

router.use(express.json());
router.use(express.urlencoded({extend:true}));
app.use(router)

router.get('/', (req, res) => {
    res.send('hey');
});

router.post("/check_authen",(req,res)=>{
    let jwtStatus = TokenManager.checkAuthentication(req);
    if(jwtStatus!=false){
        res.send(jwtStatus);
    }else{
        res.send(false);
    }
}); 

//get all product in home page
router.get("/getproduct", (req, res) => {
    console.log("Fetching users...");
    let sql = `SELECT * FROM Product`; 
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).send("Error fetching users");
        }
        console.log(`${results.length} rows returned`);
        console.log(results)
        res.send(results);
    });
});

//Home recommend
router.get("/recommendproduct", (req, res) => {
    console.log("Fetching users...");
    let sql = `SELECT * FROM Product ORDER BY quantity DESC LIMIT 3`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).send("Error fetching users");
        }
        console.log(`${results.length} rows returned`);
        console.log(results)
        res.send(results);
    });
});

router.get("/login", (req, res) => {
    console.log(req.query);
    const { username, password } = req.query;
    console.log("Fetching users...");

    let sql = `SELECT * FROM admin WHERE Username="${username}" and Password="${password}"`;
    connection.query(sql, [username, password], (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ status: "0", message: "Error fetching users" });
        }
        console.log(`${results.length} rows returned`);
        console.log(results);
        if (results.length == 0) {
            return res.status(401).json({ status: "0", message: "Invalid username or password" });
        }

        // Generate access token using username
        let accessToken = TokenManager.getGenerateAccessToken({username});
        console.log(accessToken);

        let query_login_history = `SELECT * FROM LogInHistory`;
        connection.query(query_login_history, (error, result_login_history) => {
            if (error) {
                console.error("Error fetching login history:", error);
                return res.status(500).json({ status: "0", message: "Error fetching login history" });
            }
            console.log(result_login_history)
            let logID = result_login_history.length === 0 ? 'LOG001' : `LOG${('000' + (Number(result_login_history[result_login_history.length - 1].LogID.slice(-3)) + 1)).slice(-3)}`;

            const insert_login_history = `INSERT INTO LogInHistory (AID, LogID, LogDate, Username) VALUES (?, ?, ?, ?)`;
            connection.query(insert_login_history, [results[0].AID, logID, new Date(), results[0].Username], (error, result_login_history_final) => {
                if (error) {
                    console.error("Error inserting login history:", error);
                    return res.status(500).json({ status: "0", message: "Error inserting login history" });
                }
                 console.log(results)
                return res.json({ status: "1", results, access_token: accessToken });
            });
        });
    });
});

//detail of product
router.get("/productdetail/:id", (req, res) => {
    const ProductID = req.params.id;
    // console.log(ProductID);
    if (!ProductID) {
        return res.status(400).send({ error: true, message: 'Please provide a valid product id.' });
    }
    connection.query('SELECT * FROM Product WHERE PID = ?', ProductID, function (error, results) {
        if (error) {
            throw error;
        }
        return res.send({ error: false, data: results[0], message: '' });
    });
});

//list of product
router.get("/adminlist", (req, res) => {
    console.log("Fetching users...");
    let sql = `SELECT * FROM admin`; 
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).send("Error fetching users");
        }
        console.log(`${results.length} rows returned`);
        res.send(results);
    });
});
router.get("/ProductManage", (req, res) => {
    console.log("Fetching products...");
    let sql = `SELECT * FROM Product`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error fetching products:", error);
            return res.status(500).send("Error fetching products");
        }
        console.log(`${results.length} rows returned`);
        res.send(results);
    }); 
});

//Insert in Modify table 
router.post("/insertmodifyadmin", async (req, res) => {
    console.log("start insert")
    const AID = req.body.AIDManage;
    const username = req.body.Modifyuser;
    const quote = req.body.quote;
    console.log(req.body)
    let sql = 'insert into Modifyadmin (AID,Username,T_admin, Action) VALUES ( ?, ?, ?, ?) '
    
    connection.query(sql, [AID, username, new Date(),quote ], (err, result) => {
        if (err) {
            console.error('Error inserting data in Modifytable', err);
            return res.status(500).send('Error inserting data in Modifytable');
        }
        res.status(200).send('Inserting data in Modifytable successfully');
        console.log('Inserting data in Modifytable successfully');
    });
});
router.post("/insertmodifyproduct", async (req, res) => {
    console.log("start insert")
    const AID = req.body.AIDManage;
    const username = req.body.Modifyuser;
    const action = req.body.quote;
    let PID='';

    if(action === "Add Product"){
        const sqlPID = 'SELECT PID FROM product ORDER BY PID DESC LIMIT 1';
        
        connection.query(sqlPID, (err, result) =>{
            if(err){
                console.error('Error querying PID from database:', err);
                return res.status(500).send('Error querying PID from database');
            }
            PID = result[0].PID;
            console.log(PID);
            
            let sql2 = `INSERT INTO ModifyProduct (PID, AID, Username, T_product, Action) VALUES (?, ?, ?, ?, ?)`;
            
            connection.query(sql2, [PID, AID, username, new Date(), action], (err, result) =>{
                if(err){
                    console.error('Error inserting record data in database:', err);
                    return res.status(500).send('Error adding data record to database');
                }
                console.log('Finished inserting record data in database');
                res.status(200).send('Finished inserting record data in database');
            });
        });
    } else {
        PID = req.body.productid;
        console.log(PID);
        
        let sql2 = `INSERT INTO ModifyProduct (PID, AID, Username, T_product, Action) VALUES (?, ?, ?, ?, ?)`;
        
        connection.query(sql2, [PID, AID, username, new Date(), action], (err, result) =>{
            if(err){
                console.error('Error inserting record data in database:', err);
                return res.status(500).send('Error adding data record to database');
            }
            console.log('Finished inserting record data in database');
            res.status(200).send('Finished inserting record data in database');
        });
    }
});

//delete
router.delete("/deleteProduct/:productID", async (req, res) => {
    console.log("Deleting Product...");
    const productID = req.params.productID;

    const AID = req.query.adminID;
    const username = req.query.username;
    let action = `Delete product `;

    let sql = `DELETE FROM Product WHERE PID = ?`;
    
    try {
        await Promise.all([
            connection.query(sql, productID)
        ]);

        console.log("Product deleted successfully from all tables");
        res.status(200).send("Product deleted successfully from all tables");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});

router.delete("/deleteadmin/:userID", async (req, res) => {
    const userID = req.params.userID; 
    let sql = `DELETE FROM admin WHERE AID = ?`; 
        connection.query(sql, [userID ], (err, result) => {
            if (err) {
                return res.status(500).send('Error inserting data in Modifytable');
            }
            res.status(200).send('Inserting data in Modifytable successfully');
        });
});

//to modify
router.put("/modifyuser/:userId", async (req, res) => {
    console.log("start back");
    const userid = req.params.userId; 
    const Password = req.body.Password;
    const username = req.body.Username;
    const firstname = req.body.Afname;
    const lastname = req.body.Alname;
    const phone = req.body.PhoneNo;
    const email = req.body.Aemail;
    const oldusername = req.body.Modifyadd;
    const currentmanage = req.body.AIDManage;
    let sql = '';
    let params = '';
    console.log(req.body);
    let line='';
    if (username) {
        sql = 'UPDATE  Admin SET Username = ? WHERE AID = ?';
        params=username;
        line += "username";
    } 
        if (firstname) {
            sql = 'UPDATE  Admin SET AFname = ? WHERE AID = ?';
            params = firstname;
            line += "first name";
        }  if (lastname) {
            sql = 'UPDATE  Admin SET ALname = ? WHERE AID = ?';
            params = lastname;
            line += "last name";
        }  if (phone) {
            sql = 'UPDATE  Admin SET PhoneNo = ? WHERE AID = ?';
            params = phone;
            line += "Phone No.";
        } if (email) {
            sql = 'UPDATE  Admin SET Aemail = ? WHERE AID = ?';
            params = email;
            line += "Email";
        } if (Password) {
            sql = 'UPDATE  Admin SET Password = ? WHERE AID = ?';
            params = Password;
            line += "Password";
        }
        connection.query(sql, [params, userid], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Error updating data');
                return;
            }
            console.log('Data updated successfully');
            res.status(200).send('Data updated successfully');
        });
    
});
router.put("/ModifyProduct/:productID", (req, res) => {
    console.log("Updating product...");
    console.log(req.query);

    const productID = req.params.productID;
    const productName = req.body.P_name;
    const Des = req.body.Description;
    const quantity = req.body.quantity;
    const price = req.body.Price;
    const pic = req.body.pic;
    const size = req.body.Size;
    const Redate = req.body.ReDate;
    const Category = req.body.Category;
    const color = req.body.color;
    const AID = req.query.adminID;
    const username = req.query.username;
    let action = ' ';

    let sql, params;

    if (productName) {
        sql = 'UPDATE product set P_name = ? WHERE PID = ?';
        params = productName;
        action = 'Change name of product'; 
    }else if(Des){
        sql = 'UPDATE Product set Description = ? WHERE PID = ?';
        params = Des;
        action = 'Change description of product'; 
    }else if(quantity){
        sql = 'UPDATE Product set quantity = ? WHERE PID = ?';
        params = quantity;
        action = 'Change quantity of product in stock'; 
    }else if(price){
        sql = 'UPDATE Product set Price = ? WHERE PID = ?';
        params = price;
        action = 'Change price of product'; 
    }else if(pic){
        sql = 'UPDATE Product set pic = ? WHERE PID = ?';
        params = pic;
        action = 'Change picture of product'; 
    }else if(size){
        sql = 'UPDATE Product set Size = ? WHERE PID = ?';
        params = size;
        action = 'Change size of product'; 
    }else if(Redate){
        sql = 'UPDATE Product set ReDate = ? WHERE PID = ?';
        params = Redate;
        action = 'Change release date of product'; 
    }else if(Category){
        sql = 'UPDATE Product set Category = ? WHERE PID = ?';
        params = Category;
        action = 'Change Category of product'; 
    }else if(color){
        sql = 'UPDATE Product set color = ? WHERE PID = ?';
        params = color;
        action = 'Change color of product'; 
    }
    connection.query(sql, [params, productID], (err, result) => {
        if (err) {
            console.error('Error updating data in database:', err);
            return res.status(500).send('Error updating data to database');
        }
        res.status(200).send('Product updated successfully');
        console.log('Product updated successfully');
    });
});

//ADD
router.post("/adduser", (req, res) => {
    console.log("add")
    const sql = `INSERT INTO Admin (Username, Aemail, Password, AFname, ALname, PhoneNo) VALUES (?, ?, ?, ?, ?, ?)`;
    let id = `SELECT AID FROM admin`;
    console.log(req.body)
    connection.query(sql, [req.body.username, req.body.email, req.body.pass, req.body.firstname, req.body.lastname, 
        req.body.phone], (err, result) => {
        if (err) {
            console.error("Error adding user:", err);
            return res.status(500).send("error add modify");
        }

    });
});
router.post("/AddProduct", (req, res) => {
    console.log("Adding new product...");
    const productName = req.body.P_name;
    const Des = req.body.Description;
    const quantity = req.body.quantity;
    const price = req.body.Price;
    const pic = req.body.pic;
    const size = req.body.Size;
    const Redate = req.body.ReDate;
    const Category = req.body.Category;
    const color = req.body.color;

    const AID = req.query.adminID;
    const username = req.query.username;
    let action = 'Add product';

    const sql = `INSERT INTO Product (P_name, Description, quantity, Price, Pic, Size, ReDate, Category, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(sql, [productName, Des, quantity, price, pic, size, Redate, Category, color], (err, result) => {
        if (err) {
            console.error('Error adding data to database:', err);
            return res.status(500).send('Error adding data to database');
        }
        
        console.log('New product added successfully');
        console.log(result);
        const productID = result.insertId;

        
        const sql2 = 'INSERT INTO ModifyProduct (PID, AID, Username, T_product, Action) VALUES (?, ?, ?, NOW(), ?)';
        connection.query(sql2, [productID, AID, username, action], (err, result) => {
            if (err) {
                console.error('Error inserting data into ModifyProduct table:', err);
                return res.status(500).send('Error inserting data into ModifyProduct table');
            }
            console.log('Product data inserted successfully');
            console.log(result);
            res.status(200).send('New product added successfully');
        });
    
    });

});

//SearchHome
router.post("/searchHome", (req, res) => {
    const searchName = req.body.searchName;
    const category = req.body.category;
    const searchcolor = req.body.searchcolor
    const size = req.body.size;
    const searchAvailable = req.body.isAvailable;
    let sql ='SELECT * FROM Product WHERE 1=1'

    if (searchName!=='') {
        sql += ` AND P_name LIKE "%${searchName}%"`;
      }
 
    if (searchcolor!=='') {
    sql += ` AND color LIKE "${searchcolor}"`;
    }

        if (searchAvailable === true ) {
            sql += ' AND quantity > 0';
        } 
        else if (searchAvailable === false) {
            sql += ' AND quantity = 0';
        }

    if (size!=='All') {
        sql += ` AND size LIKE "${size}"`;
    }

    if (category!=='All') {
        sql += ` AND category LIKE "${category}"`;
    }
    console.log(sql);
    connection.query( sql, function (error, results) {
        if (error) throw error;
        console.log(`${results.length} rows returned`);
        return res.send(results);
        
    });
});

//Search admin manage
router.post("/ProductSearchAdmin", (req, res) => {
    const searchName = req.body.searchName;
    const category = req.body.category;
    const size = req.body.size;
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;
    const startDate = req.body.startDateValue;
    const endDate = req.body.endDateValue;
    const searchID = req.body.searchID;

    let sql = 'SELECT * FROM Product WHERE 1=1';

    if (searchName != null) {
        sql += ` AND P_name LIKE "%${searchName}%"`;
    }

    if (searchID != null) {
        sql += ` AND PID LIKE "%${searchID}%"`;
    }

    if (minPrice != null && maxPrice != null) {
        sql += ` AND Price >= ${minPrice} AND Price <= ${maxPrice}`;
    }

    if (startDate != null && endDate != null) {
        sql += ` AND ReDate >= "${startDate}" AND ReDate <= "${endDate}"`;
    }

    if (size !== 'All') {
        sql += ` AND Size = "${size}"`;
    }

    if (category !== 'All') {
        sql += ` AND Category = "${category}"`;
    }
    console.log(sql);
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(`${results.length} rows returned`);
        return res.send(results);
    });
});

router.get("/searchadmin", (req, res) => {
    const query = req.query.query;
  const sql = `SELECT * from admin WHERE CONCAT(Afname,Alname) LIKE "%${query}%"`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error searching in MySQL:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
  });
});

router.get("/searchproduct", (req, res) => {
    const query = req.query.query;
  const sql = `SELECT * from Product WHERE P_name LIKE "%${query}%"`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error searching in MySQL:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
  });
});

router.post("/advancedsearchadmin", (req, res) => {
    const { userID, username, firstname, lastname, phone, email } = req.body;
    let sql = ' Select * FROM admin WHERE 1=1 ';
    if (userID) {
        sql += ` AND AID = ${userID}`;
    } if (username) {
        sql += ` AND Username LIKE "%${username}%"`;
       
    } if(firstname){
        sql += ` AND  AFname  LIKE "%${firstname}%"`;
       
    } if(lastname){
        sql +=  ` AND  ALname LIKE "%${lastname}%"`;
       
    } if(phone){
        sql += ` AND  PhoneNo = "${phone}"`;
      
    } if(email){
        sql += ` AND  Aemail = "${email}"`;
       
    }
    console.log(sql)
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error adding data to database:', err);
                res.status(500).send('Error adding data to database');
                return;
            }
            res.send(result);
        });
});


const PORT = 8107;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    // Ensure the database connection is established when the server starts
    connection.connect(function(err) {
        if (err) {
            console.error("Error connecting to database:", err);
            process.exit(1); // Exit the process if database connection fails
        }
        console.log('Connected to database');
    });
});