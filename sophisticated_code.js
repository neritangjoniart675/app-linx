/*
 * Filename: sophisticated_code.js
 * 
 * Description: This code demonstrates a complex and sophisticated implementation of a restaurant management system.
 * 
 * The code includes classes for managing restaurant staff, orders, menus, tables, and customers.
 * It also includes various functions for handling different operations within the system, such as creating new orders, assigning tables to customers, calculating bills, etc.
 * 
 * Code Output: The code includes various function calls and console logs to demonstrate the functionality of the system.
 * 
 * Note: This code is purely fictional and does not perform any real-world interactions or operations.
 */

class Staff {
  constructor(name, age, role) {
    this.name = name;
    this.age = age;
    this.role = role;
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}. I am ${this.age} years old and I work as a ${this.role}.`);
  }
}

class Order {
  constructor(orderId, items) {
    this.orderId = orderId;
    this.items = items;
    this.status = "pending";
  }

  addItem(item) {
    this.items.push(item);
    console.log(`${item.name} added to order ${this.orderId}`);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`${item.name} removed from order ${this.orderId}`);
    }
  }

  calculateTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.price;
    }
    return total;
  }
}

class Menu {
  constructor(name, categories) {
    this.name = name;
    this.categories = categories;
  }

  addItem(name, price, category) {
    const item = { name, price, category };
    this.categories[category].push(item);
    console.log(`${name} added to the menu (${category}).`);
  }

  removeItem(name, category) {
    const items = this.categories[category];
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === name) {
        items.splice(i, 1);
        console.log(`${name} removed from the menu (${category}).`);
        return;
      }
    }
  }
}

class Table {
  constructor(tableNumber, capacity) {
    this.tableNumber = tableNumber;
    this.capacity = capacity;
    this.customer = null;
    this.order = null;
  }

  assignCustomer(customer) {
    if (this.customer === null) {
      this.customer = customer;
      console.log(`${customer.name} assigned to Table ${this.tableNumber}`);
    } else {
      console.log(`Table ${this.tableNumber} is already occupied. Cannot assign ${customer.name}.`);
    }
  }

  createOrder(menu) {
    this.order = new Order(`T${this.tableNumber}-O1`, []);
    console.log(`Order ${this.order.orderId} created for Table ${this.tableNumber}`);
    console.log("Menu:");
    for (const category of Object.keys(menu.categories)) {
      console.log(`  ${category}:`);
      for (const item of menu.categories[category]) {
        console.log(`    - ${item.name} ($${item.price})`);
      }
    }
  }

  addItemToOrder(item, menu) {
    if (this.order !== null) {
      const categoryItems = menu.categories[item.category];
      if (categoryItems) {
        const menuItem = categoryItems.find((menuItem) => menuItem.name === item.name);
        if (menuItem) {
          this.order.addItem(menuItem);
        } else {
          console.log(`${item.name} not found in the menu.`);
        }
      } else {
        console.log(`${item.category} is not a valid menu category.`);
      }
    } else {
      console.log(`Table ${this.tableNumber} does not have an active order.`);
    }
  }

  removeItemFromOrder(item) {
    if (this.order !== null) {
      this.order.removeItem(item);
    } else {
      console.log(`Table ${this.tableNumber} does not have an active order.`);
    }
  }

  calculateBill() {
    if (this.order !== null) {
      const total = this.order.calculateTotal();
      console.log(`Table ${this.tableNumber} bill: $${total}`);
    } else {
      console.log(`Table ${this.tableNumber} does not have an active order.`);
    }
  }
}

class Customer {
  constructor(name) {
    this.name = name;
  }
}

// Main code execution

const john = new Staff("John Doe", 25, "Waiter");
john.introduce();

const jane = new Staff("Jane Smith", 30, "Chef");
jane.introduce();

const menu = new Menu("Main Menu", {
  "Appetizers": [],
  "Main Course": [],
  "Desserts": []
});
console.log("Menu created:", menu);

menu.addItem("Caesar Salad", 8.99, "Appetizers");
menu.addItem("Margherita Pizza", 14.99, "Main Course");
menu.addItem("Tiramisu", 6.99, "Desserts");

menu.removeItem("Caesar Salad", "Appetizers");

const table1 = new Table(1, 4);
table1.assignCustomer(new Customer("Alice"));
table1.createOrder(menu);

table1.addItemToOrder({ name: "Margherita Pizza", category: "Main Course" }, menu);
table1.addItemToOrder({ name: "Garlic Bread", category: "Appetizers" }, menu);

table1.calculateBill();

const table2 = new Table(2, 2);
table2.assignCustomer(new Customer("Bob"));
table2.createOrder(menu);

table2.addItemToOrder({ name: "Pizza Funghi", category: "Main Course" }, menu);
table2.calculateBill();

const table3 = new Table(3, 6);
table3.assignCustomer(new Customer("Eve"));
table3.createOrder(menu);

table3.addItemToOrder({ name: "Spaghetti Carbonara", category: "Main Course" }, menu);
table3.addItemToOrder({ name: "Tiramisu", category: "Desserts" }, menu);

table3.removeItemFromOrder({ name: "Spaghetti Carbonara", category: "Main Course" });

table3.calculateBill();