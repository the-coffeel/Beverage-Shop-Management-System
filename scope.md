# Beverage Shop Management System

#### 1. Project Overview

The **Beverage Shop Management System** is a web-based business management system designed for small beverage shops that sell drinks, beer, and other related products.

The shop sells products such as:

* Coca-Cola
* Boost Strong
* Prime
* Angkor Beer
* Other soft drinks
* Energy drinks
* Beer
* Bottled water
* Other beverage products

The purpose of this system is to replace manual product, inventory, purchasing, sales, and financial tracking with a centralized digital system.

The system will allow the shop owner and authorized staff to manage products, suppliers, customers, stock, purchases, sales, payments, expenses, and business reports from one application.

The project will be developed as a **small and practical ERP system**, inspired by the core concepts used in systems such as SAP Business One, but simplified for the needs of a small beverage shop.

---

#### 2. Background

Small beverage shops often manage their business using notebooks, spreadsheets, calculators, or simple cash registers.

As the number of products increases, manual management can create several problems:

* Difficulty knowing the current stock
* Difficulty tracking product purchases
* Difficulty knowing daily sales
* Difficulty identifying low-stock products
* Difficulty calculating profit
* Difficulty tracking supplier payments
* Difficulty tracking expenses
* Difficulty finding historical transactions
* Difficulty knowing which products sell the most
* Risk of incorrect inventory records

For example, a shop may sell hundreds of bottles and cans every day.

If a shop starts the day with:

```text
Coca-Cola 330ml     100 cans
Angkor Beer         150 cans
Boost Strong         80 cans
Prime                50 bottles
```

and sells products throughout the day, manually calculating the remaining stock can become difficult.

The proposed system will automatically update inventory when products are purchased, sold, returned, or adjusted.

---

#### 3. Problem Statement

The current manual business management process does not provide a centralized way to manage sales, inventory, purchases, suppliers, and expenses.

The shop owner needs to know important information such as:

* How many products are currently in stock?
* Which products are running low?
* How much did the shop sell today?
* How much money was spent purchasing products?
* How much money was received from customers?
* How much does the shop owe suppliers?
* How much profit was generated?
* Which products sell the most?
* What were the sales during a specific date range?

Without an integrated system, obtaining this information can require manual calculations and checking multiple records.

Therefore, this project proposes a centralized **Beverage Shop Management System** that integrates these business processes.

---

#### 4. Project Objectives

##### 4.1 Main Objective

To develop a web-based management system that helps a small beverage shop manage its daily business operations, including products, inventory, purchasing, sales, suppliers, customers, expenses, payments, and reports.

##### 4.2 Specific Objectives

The system aims to:

1. Manage beverage products and product categories.
2. Manage product brands.
3. Manage suppliers.
4. Manage customers.
5. Manage warehouses or shop storage locations.
6. Track product inventory.
7. Record stock movements.
8. Record product purchases.
9. Record product sales.
10. Automatically update inventory after transactions.
11. Track supplier payments.
12. Track customer payments.
13. Record shop expenses.
14. Generate sales reports.
15. Generate purchase reports.
16. Generate inventory reports.
17. Calculate basic revenue and profit information.
18. Identify low-stock products.
19. Provide a dashboard showing important business information.
20. Provide user roles and permissions for shop owners and staff.

---

#### 5. Project Scope

The initial version of the system will focus on the core operations of a small beverage shop.

##### 5.1 Product Management

The shop owner can manage all products.

Example:

| SKU      | Product            | Brand     | Category     |  Cost | Selling Price |
| -------- | ------------------ | --------- | ------------ | ----: | ------------: |
| DRK-001  | Coca-Cola 330ml    | Coca-Cola | Soft Drink   | $0.45 |         $0.60 |
| DRK-002  | Boost Strong 330ml | Boost     | Energy Drink | $0.55 |         $0.75 |
| DRK-003  | Prime 500ml        | Prime     | Sports Drink | $1.20 |         $1.50 |
| BEER-001 | Angkor Beer 330ml  | Angkor    | Beer         | $0.55 |         $0.75 |

Product information can include:

```text
SKU
Barcode
Product Name
Brand
Category
Unit
Purchase Price
Selling Price
Current Stock
Minimum Stock
Status
```

---

#### 6. Product Categories

The system will allow the shop owner to organize products into categories.

Example:

```text
Products
│
├── Soft Drinks
│   ├── Coca-Cola
│   ├── Pepsi
│   ├── Sprite
│   └── Fanta
│
├── Energy Drinks
│   ├── Boost Strong
│   └── Other Energy Drinks
│
├── Sports Drinks
│   └── Prime
│
├── Beer
│   ├── Angkor Beer
│   ├── Cambodia Beer
│   └── Other Beer
│
└── Water
    ├── 500ml
    └── 1.5L
```

The categories can be customized by the shop owner.

---

#### 7. Supplier Management

The system will maintain information about suppliers.

Example:

```text
Supplier:
ABC Beverage Distribution

Contact Person:
Mr. Dara

Phone:
012 XXX XXX

Address:
Phnom Penh

Payment Terms:
Cash / Credit
```

Supplier information:

```text
Supplier Code
Company Name
Contact Person
Phone
Email
Address
Payment Terms
Status
```

The system can also show:

```text
Total Purchases
Outstanding Balance
Last Purchase
Purchase History
```

---

#### 8. Purchasing Management

The system will allow the shop owner to record products purchased from suppliers.

The purchasing workflow will be:

```text
Purchase Request
       ↓
Purchase Order
       ↓
Goods Received
       ↓
Inventory Updated
       ↓
Supplier Invoice
       ↓
Supplier Payment
```

For a small shop, the first version can simplify this process to:

```text
Purchase
   ↓
Receive Products
   ↓
Inventory +
   ↓
Payment
```

### Example

The shop purchases:

```text
Angkor Beer 330ml
Quantity: 100
Cost: $0.55
```

Total:

```text
100 × $0.55 = $55
```

When the purchase is received:

```text
Angkor Beer

Previous Stock: 50
Received:       +100
---------------------
Current Stock: 150
```

---

#### 9. Sales Management

The sales module will be one of the most important parts of the system.

The shop staff can create a sales transaction.

Example:

```text
SALE-000125

Coca-Cola 330ml     × 2    $1.20
Angkor Beer 330ml   × 3    $2.25
Boost Strong        × 1    $0.75
--------------------------------
Total                       $4.20
```

After the transaction is completed:

```text
Coca-Cola      Stock -2
Angkor Beer    Stock -3
Boost Strong   Stock -1
```

The system should automatically update the inventory.

---

#### 10. Point of Sale — POS

A future version of the system can provide a simple POS interface.

Example:

```text
┌────────────────────────────────────────────────┐
│ Beverage Shop POS                              │
├────────────────────────────────────────────────┤
│ Search product...                 [Barcode]    │
│                                                │
│ Coca-Cola       $0.60       [+]                │
│ Angkor Beer     $0.75       [+]                │
│ Boost Strong    $0.75       [+]                │
│ Prime           $1.50       [+]                │
├────────────────────────────────────────────────┤
│ Cart                                           │
│                                                │
│ Coca-Cola × 2                     $1.20        │
│ Angkor Beer × 3                   $2.25        │
│                                                │
│ Total                              $3.45        │
│                                                │
│ [Cash] [QR] [Other]                           │
│                                                │
│              [ COMPLETE SALE ]                 │
└────────────────────────────────────────────────┘
```

This can later become one of the most important screens in the system.

---

#### 11. Inventory Management

The inventory module will track the quantity of every product.

Example:

| Product      | Opening | Purchased | Sold | Adjustment | Current |
| ------------ | ------: | --------: | ---: | ---------: | ------: |
| Coca-Cola    |     100 |        50 |   30 |          0 |     120 |
| Angkor Beer  |     150 |       100 |   80 |         -2 |     168 |
| Boost Strong |      80 |        50 |   40 |          0 |      90 |
| Prime        |      50 |        20 |   15 |          0 |      55 |

The system can calculate:

```text
Current Stock =
Opening Stock
+ Purchases
- Sales
+/- Adjustments
```

---

#### 12. Low Stock Management

The shop owner can define a minimum stock level.

Example:

```text
Product: Coca-Cola 330ml

Current Stock: 8
Minimum Stock: 20

Status:
LOW STOCK
```

The dashboard can display:

```text
Low Stock
────────────────────
Coca-Cola       8
Angkor Beer     12
Prime           5
```

This allows the owner to know which products need to be purchased.

---

#### 13. Stock Adjustment

Sometimes actual physical stock does not match system stock.

Example:

System:

```text
Angkor Beer = 100
```

Physical count:

```text
Angkor Beer = 98
```

The owner can record:

```text
Stock Adjustment

Product: Angkor Beer
System Stock: 100
Actual Stock: 98
Difference: -2

Reason:
Damaged products
```

The system records the adjustment for future auditing.

---

#### 14. Customer Management

For a small beverage shop, customer management can remain simple.

The system can support:

```text
Walk-in Customer
Regular Customer
Business Customer
```

Example:

```text
Customer:
ABC Restaurant

Phone:
012 XXX XXX

Address:
Phnom Penh

Payment Type:
Credit
```

This becomes useful if the shop sells beverages to restaurants, cafés, hotels, or other businesses.

---

#### 15. Expense Management

The system should also record operating expenses.

Examples:

```text
Shop Rent
Electricity
Water
Internet
Transportation
Delivery
Employee Salary
Equipment
Maintenance
Other Expenses
```

Example:

```text
Expense

Date:
02 October 2026

Category:
Electricity

Amount:
$80

Description:
September electricity bill
```

---

#### 16. Payment Management

The system should support basic payment tracking.

### Customer payment

```text
Invoice: INV-0012
Amount: $500
Paid: $300
Remaining: $200
```

### Supplier payment

```text
Supplier Invoice: SUP-0021
Amount: $1,000
Paid: $600
Remaining: $400
```

This gives the shop owner visibility into:

```text
Accounts Receivable
Accounts Payable
```

without initially building a full accounting system.

---

#### 17. Dashboard

The main dashboard should provide a quick overview of the business.

Example:

```text
┌──────────────────────────────────────────────────┐
│ Beverage Shop Dashboard                          │
├────────────┬────────────┬────────────┬───────────┤
│ Today's    │ Today's    │ Products   │ Low Stock │
│ Sales      │ Profit     │ Sold       │           │
│ $245       │ $82        │ 156        │ 8         │
└────────────┴────────────┴────────────┴───────────┘
```

Then:

```text
Sales Today
────────────────────────
08:00   $25
10:00   $42
12:00   $68
14:00   $35
16:00   $75
```

Top-selling products:

```text
Top Products
──────────────────────
1. Angkor Beer
2. Coca-Cola
3. Boost Strong
4. Prime
```

Low stock:

```text
Low Stock
──────────────────────
Prime 500ml       5
Coca-Cola 330ml   8
Angkor Beer      12
```

---

# 18. Reports

The system will provide business reports.

## Sales Report

```text
Date Range:
01 Oct - 02 Oct 2026

Total Sales:       $1,250
Transactions:      182
Average Sale:      $6.87
```

## Purchase Report

```text
Total Purchases:   $850
Suppliers:         4
Products Received: 650
```

## Inventory Report

```text
Total Products:       125
Total Stock Units:   8,420
Low Stock Products:      8
```

## Profit Report

A basic calculation can be:

```text
Gross Profit =
Sales Revenue - Cost of Goods Sold
```

Example:

```text
Sales Revenue          $2,000
Cost of Goods Sold     $1,300
--------------------------------
Gross Profit              $700
```

Then:

```text
Net Profit =
Gross Profit - Operating Expenses
```

Example:

```text
Gross Profit             $700
Expenses                 $200
--------------------------------
Net Profit               $500
```

For the initial system, this should be treated as **basic management reporting**, not a replacement for full accounting software.

---

#### 19. User Roles

The system will support different users.

### Owner / Admin

```text
Products
Purchases
Sales
Inventory
Suppliers
Customers
Expenses
Reports
Users
Settings
```

### Cashier

```text
POS
Sales
Customers
View Products
```

### Warehouse Staff

```text
Products
Inventory
Goods Receiving
Stock Adjustment
Stock Transfer
```

This prevents every employee from having access to sensitive business information.

---

#### 20. System Architecture

The proposed system will use a modern web architecture.

```text
                     USERS
                       │
                       ↓
              ┌─────────────────┐
              │ React Frontend   │
              │ TypeScript       │
              │ Tailwind / UI    │
              └────────┬────────┘
                       │
                    REST API
                       │
                       ↓
              ┌─────────────────┐
              │ Spring Boot     │
              │ Java Backend    │
              └────────┬────────┘
                       │
                       ↓
              ┌─────────────────┐
              │ PostgreSQL      │
              │ Database        │
              └─────────────────┘
```

The backend will use a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

---

#### 21. Main Database Entities

The initial database can contain:

```text
users
roles
permissions

products
categories
brands

customers
suppliers

warehouses

stock_movements
stock_adjustments

purchase_orders
purchase_order_items

sales
sale_items

payments
expenses

projects
tasks
```

The most important relationships will be:

```text
Supplier
    │
    ↓
Purchase Order
    │
    ↓
Purchase Items
    │
    ↓
Stock Movement
    │
    ↓
Inventory
```

And:

```text
Customer
    │
    ↓
Sale
    │
    ↓
Sale Items
    │
    ↓
Stock Movement
```

---

#### 22. Main Business Flow

The overall business process will be:

```text
                    SUPPLIER
                       │
                       ↓
                  PURCHASE
                       │
                       ↓
                 GOODS RECEIVED
                       │
                       ↓
                  INVENTORY
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
           SALES              ADJUSTMENT
             │
             ↓
          CUSTOMER
             │
             ↓
          PAYMENT
```

For the shop owner, the important cycle is:

```text
BUY
 ↓
STORE
 ↓
SELL
 ↓
COLLECT MONEY
 ↓
CHECK PROFIT
 ↓
REORDER
```

The system should support this complete cycle.

---
#### 23. Technology Stack

##### Frontend

```text
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
React Router
```

##### Backend

```text
Laravel
Filament
JWT
Rest API
```

##### Database

```text
MySQL
```

#### 25. Non-Functional Requirements

The system should be:

#### Secure

* Authentication
* Authorization
* Password hashing
* Role-based permissions
* HTTPS
* Input validation

#### Reliable

The system should prevent invalid inventory operations such as selling more products than are available, unless the business explicitly allows negative stock.

#### Usable

The POS screen should require as few steps as possible because cashiers may need to process many transactions quickly.

#### Responsive

The system should work on:

```text
Desktop
Laptop
Tablet
Mobile
```

#### Maintainable

The backend should use a modular architecture so additional modules can be added later.

---
#### 24. Future Development

After the core system is stable, additional functionality can be introduced:

```text
Barcode Scanner
Receipt Printing
QR Payment
Telegram Notifications
Low Stock Notifications
Multi-Warehouse
Multi-Branch
Multi-Currency
Customer Credit
Supplier Credit
Advanced Accounting
Tax Management
Purchase Approval
Sales Approval
```

The system could eventually support multiple shops:

```text
                    BSMS ERP
                        │
           ┌────────────┼────────────┐
           ↓            ↓            ↓
       Shop Phnom    Shop Kandal   Shop Siem
          Penh
           │
      ┌────┴────┐
      ↓         ↓
 Inventory     Sales
```

---

#### 25. Expected Result

At the end of the project, the Beverage Shop Management System should allow a shop owner to manage the majority of daily business operations from a single application.

The owner should be able to answer questions such as:

> **How much did I sell today?**

> **How much stock do I have?**

> **Which products are almost finished?**

> **How much did I spend purchasing products?**

> **How much money do suppliers owe me / do I owe suppliers?**

> **Which products sell the most?**

> **How much revenue did I generate this month?**

> **What is my estimated gross profit?**

> **What are my expenses?**

> **How much stock did I receive and sell?**

Instead of checking multiple notebooks, spreadsheets, or manually calculating inventory, the owner can obtain this information from the system.

---

#### 26. Final Project Concept

The final system can be described as:

> **Beverage Shop Management System — a lightweight ERP solution designed for small beverage retailers to manage products, suppliers, customers, purchasing, inventory, sales, payments, expenses, and business reports in one centralized platform.**

The system will take inspiration from the **business-process integration principles of ERP platforms such as SAP Business One**, while keeping the functionality focused on the actual requirements of a small beverage shop.
