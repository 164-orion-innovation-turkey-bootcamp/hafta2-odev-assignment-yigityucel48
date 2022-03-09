//npm i --save console-read-write
const input = require("console-read-write"); 
let materialStocks = {
  lettuce: 5,
  pickle: 5,
  packetSauce: 5,
  onion: 5,
  meatball: 5,
  chicken: 5,
  tomato: 5,
  bread: 5,
  potato: 5,
  coke: 5,
};

// check values
let byproducts = ["pickle","onion","lettuce","tomato"]; 
let cookDegree = ""; 
let ingredients = ""; 
let meat = ""; 
let stockCheck=true; //if materials are missing this variable inhibits the progress of the process.You need change and put less than 1 to materialstocks items if you need a test to order process

//check Stocks
function checkStocks(materialStocks) { 
  return Object.values(materialStocks).every(m => m > 0); 
  
}

async function orderProcess(time, work) { // main order function
  return new Promise((resolve, reject) => { 
    if (stockCheck) {
      setTimeout(() => {
        resolve(work());
      }, time);
    } else {
      reject('There are not enough products!');
    }
  });
}


//meat type meatball.
let cookMeatballBurger = async function () {
  if (cookDegree === "low") {
    orderProcess(1000, () => {
      console.log("Sipariş alındı.. Hazırlanıyor..");
    });
    return Promise.all([
      orderProcess(2000, () => {
        console.log("Low cooked burger is ready.");
      }),
      orderProcess(2000, () => {
        console.log(`${ingredients} added..`);
      }),
      orderProcess(5000, () => {
        console.log("Fried potatoes is ready!");
      }),
      orderProcess(2000, () => {
        console.log("Drink is ready...");
      }),
    ]);
  }

  if (cookDegree === "medium") {
    return Promise.all([
      orderProcess(3000, () => {
        console.log("Medium cooked burger is ready.");
      }),
      orderProcess(2000, () => {
        console.log(`${ingredients} added..`);
      }),
      orderProcess(5000, () => {
        console.log("Fried potatoes is ready!");
      }),
      orderProcess(2000, () => {
        console.log("Drink is ready...");
      }),
    ]);
  }

  if (cookDegree === "high") {
    return Promise.all([
      orderProcess(4000, () => {
        console.log("High cooked burger is ready.");
      }),
      orderProcess(2000, () => {
        console.log(`${ingredients} added...`);
      }),
      orderProcess(5000, () => {
        console.log("Fried potatoes is ready!");
      }),
      orderProcess(2000, () => {
        console.log("Drink is ready..");
      }),
    ]);
  }
};
//meat type chicken function
let cookChickenBurger = async function () { 
  orderProcess(1000, () => {
    console.log("Order Received. Preparing....");
  });
  return Promise.all([
    orderProcess(3000, () => {
      console.log("Chicken Burger is ready!");
    }),
    orderProcess(2000, () => {
      console.log(`${ingredients} added..`);
    }),
    orderProcess(5000, () => {
      console.log("Fried potatoes is ready!");
    }),
    orderProcess(2000, () => {
      console.log("Drink is ready...");
    }),
  ]);
};


orderProcess(1000, () => console.log("Welcome..."))
    .then(() => {
        return orderProcess(1000, () => {
            console.log(`\n Please choice the materials what you want...\n${byproducts}`);
        });
    })
    .then(async () => {
      ingredients = await input.read();
    })
    .then(() => {
        return orderProcess(1000, () => {
            console.log(`\n${ingredients} için stok kontrolü yapılıyor.`);
            
            if(checkStocks(materialStocks)){ 
                console.log("\nStok check is positive!")
            }
            else{
                stockCheck=false; 
            }
        })
    })
    .then(() => {
        return orderProcess(1000, () => {
            console.log("Which Burger do you prefer ? chicken Or meatball");    
        });                                             
    })
    .then(async () => {
        meat = await input.read(); //meat type choice 
        if (meat === "meatball") {                                      
            console.log("How do you prefer the degree of cooking? low / medium / high ") 
            cookDegree = await input.read();                              
            await cookMeatballBurger(cookDegree);
        }
        if(meat === "chicken"){
            await cookChickenBurger();
        }
    })
    .then(()=> {
        return orderProcess(1000, () => {
            console.log("Packed sauces and products added to the serving tray.");          
        });
    })
    .then(()=> {
        return orderProcess(1000, () => {
            console.log("Order is ready,Enjoy Your Meal!");
        });
    })

