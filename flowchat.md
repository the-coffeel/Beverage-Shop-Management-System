### Beverage Shop Management System — System Flowchart

```text
                              ┌───────────────┐
                              │     START     │
                              └───────┬───────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │     AUTHENTICATION      │
                         ├────────────────────────┤
                         │ • Login                │
                         │ • Forgot Password      │
                         └───────────┬────────────┘
                                     │
                              Login Successful?
                                /          \
                              No            Yes
                              │              │
                              ▼              ▼
                        ┌──────────┐   ┌───────────────┐
                        │ Try Again│   │   DASHBOARD   │
                        └──────────┘   └───────┬───────┘
                                               │
                                               ▼
                         ┌─────────────────────────────────┐
                         │       MAIN SYSTEM MODULES       │
                         └───────────────┬─────────────────┘
                                         │
          ┌──────────────┬───────────────┼──────────────┬──────────────┐
          │              │               │              │              │
          ▼              ▼               ▼              ▼              ▼
     ┌─────────┐   ┌───────────┐   ┌──────────┐   ┌───────────┐  ┌──────────┐
     │Products │   │ Purchasing│   │  Sales   │   │ Inventory │  │  People  │
     └────┬────┘   └─────┬─────┘   └────┬─────┘   └─────┬─────┘  └────┬─────┘
          │              │              │                │             │
          ▼              ▼              ▼                ▼             ▼
     Product List    Purchase List     POS          Stock Overview  Customers
     Add Product     Create Purchase   Sales List   Stock Movement  Suppliers
     Edit Product    Purchase Details  Sale Details Stock Adjustment Employees
     Product Detail                                  Warehouse
          │              │              │                │
          └──────────────┴──────────────┼────────────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  FINANCE         │
                              ├──────────────────┤
                              │ • Payments       │
                              │ • Expenses       │
                              │ • Profit         │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │     REPORTS      │
                              ├──────────────────┤
                              │ • Sales          │
                              │ • Purchases      │
                              │ • Inventory      │
                              │ • Profit         │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │    SETTINGS      │
                              ├──────────────────┤
                              │ • Users          │
                              │ • Roles          │
                              │ • Company        │
                              │ • System Settings│
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │       END        │
                              └──────────────────┘
```

---

#### 1. Authentication → Dashboard

```text
                  ┌─────────────┐
                  │    START    │
                  └──────┬──────┘
                         │
                         ▼
                ┌─────────────────┐
                │      Login      │
                └────────┬────────┘
                         │
                         ▼
                 ◇ Valid Login? ◇
                  /           \
                No             Yes
                │               │
                ▼               ▼
        ┌──────────────┐  ┌──────────────┐
        │ Forgot       │  │  Dashboard   │
        │ Password     │  └──────┬───────┘
        └──────┬───────┘         │
               │                 │
               ▼                 ▼
        Reset Password     View Summary
                               │
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
                 Sales      Purchase   Inventory
                 Summary    Summary    Summary
                                          │
                                          ▼
                                    Low Stock Alert
```

---

#### 2. Product Flow

Your product module should connect directly to **Purchasing, Sales, and Inventory**.

```text
                         ┌──────────────┐
                         │   Products   │
                         └──────┬───────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
       Product List        Add Product       Product Details
             │                  │                  │
             │                  ▼                  │
             │            Product Created          │
             │                  │                  │
             ▼                  ▼                  ▼
         Edit Product ───────► Product Data
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
                Purchasing        Sales        Inventory
```

For example:

```text
Product
  │
  ├── Purchase → Stock increases
  │
  ├── Sale → Stock decreases
  │
  └── Adjustment → Stock changes
```

---

#### 3. Purchasing Flow

```text
                    ┌────────────────┐
                    │   Purchasing   │
                    └───────┬────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Purchase List │
                    └───────┬───────┘
                            │
                            ▼
                    ┌────────────────┐
                    │Create Purchase │
                    └───────┬────────┘
                            │
                            ▼
                    Select Supplier
                            │
                            ▼
                    Select Products
                            │
                            ▼
                    Enter Quantity
                            │
                            ▼
                    Calculate Total
                            │
                            ▼
                    Confirm Purchase
                            │
                            ▼
                    Receive Products
                            │
                            ▼
                    Update Inventory
                            │
                            ▼
                    Record Payment
                            │
                            ▼
                   Purchase Details
```

The important system relationship is:

```text
Purchase
   │
   ├── Supplier
   │
   ├── Products
   │
   ├── Payment
   │
   └── Inventory (+Stock)
```

---

#### 4. Sales / POS Flow

This should probably be the **most detailed flowchart** in your documentation.

```text
                       ┌──────────────┐
                       │     Sales    │
                       └──────┬───────┘
                              │
                              ▼
                         ┌─────────┐
                         │   POS   │
                         └────┬────┘
                              │
                              ▼
                       Select / Scan
                         Product
                              │
                              ▼
                        Enter Quantity
                              │
                              ▼
                       ┌──────────────┐
                       │ Check Stock  │
                       └──────┬───────┘
                              │
                        Stock Available?
                         /           \
                       No             Yes
                       │               │
                       ▼               ▼
                Show Error       Add to Cart
                                       │
                                       ▼
                                  Add More?
                                  /     \
                                Yes       No
                                 │         │
                                 └───┐     ▼
                                     │  Calculate
                                     │    Total
                                     │      │
                                     │      ▼
                                     │   Payment
                                     │      │
                                     │      ▼
                                     │ Confirm Payment
                                     │      │
                                     │      ▼
                                     │  Complete Sale
                                     │      │
                                     │      ▼
                                     │ Deduct Stock
                                     │      │
                                     │      ▼
                                     │ Generate Receipt
                                     │      │
                                     │      ▼
                                     └── Sale Details
```

Business relationship:

```text
Sale
 │
 ├── Customer
 │
 ├── Employee / Cashier
 │
 ├── Sale Items
 │      ├── Product
 │      ├── Quantity
 │      └── Unit Price
 │
 ├── Payment
 │
 └── Inventory (-Stock)
```

---

#### 5. Inventory Flow

Your inventory module is not isolated. It receives changes from **Purchases, Sales, and Adjustments**.

```text
                         ┌──────────────┐
                         │  INVENTORY   │
                         └──────┬───────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
   Stock Overview        Stock Movement       Stock Adjustment
          │                     │                     │
          │                     ▼                     │
          │              View Movement History        │
          │                                           │
          ▼                                           ▼
      Warehouse                                  Adjust Stock
          │                                           │
          └──────────────────┬────────────────────────┘
                             │
                             ▼
                       Current Stock
                             │
                             ▼
                      Check Stock Level
                             │
                       ┌─────┴─────┐
                       │           │
                    Normal       Low Stock
                       │           │
                       ▼           ▼
                     Done     Low Stock Alert
```

---

#### 6. People Flow

```text
                         ┌──────────────┐
                         │    PEOPLE    │
                         └──────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
         Customers          Suppliers         Employees
              │                 │                 │
              ▼                 ▼                 ▼
        Customer Data      Supplier Data      Employee Data
              │                 │                 │
              │                 ▼                 │
              │           Purchasing             │
              │                                   │
              └───────────────┬───────────────────┘
                              │
                              ▼
                         Sales / POS
```

---

#### 7. Finance Flow

Finance should receive financial transactions from **Sales, Purchases, and Expenses**.

```text
                    ┌──────────────┐
                    │   FINANCE    │
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
         Payments       Expenses       Profit
             │             │             │
             ▲             ▲             │
             │             │             │
        ┌────┴────┐        │             │
        │         │        │             │
        │         │        │             │
      Sales    Purchases   │             │
        │         │        │             │
        └────┬────┘        │             │
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                     Financial Data
```

For example:

```text
Sales Revenue
      +
Other Income
      -
Purchases
      -
Expenses
      =
Profit
```

---

#### 8. Reports Flow

Reports should **read data from other modules**, rather than being an independent transaction module.

```text
                         ┌──────────────┐
                         │   REPORTS    │
                         └──────┬───────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
       Sales                 Purchases            Inventory
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                                ▼
                              Profit
                                │
                                ▼
                       Generate / Export
```

---

#### 9. Dashboard Data Flow

Dashboard should aggregate information from the other modules.

```text
                         ┌──────────────┐
                         │  DASHBOARD   │
                         └──────┬───────┘
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
       ▼                        ▼                        ▼
  Sales Data              Purchase Data           Inventory Data
       │                        │                        │
       ▼                        ▼                        ▼
 Sales Summary            Purchase Summary       Inventory Summary
       │                        │                        │
       └────────────────────────┼────────────────────────┘
                                │
                                ▼
                         Low Stock Alert
```

---

#### 10. Final System Flow

So your **complete system-level diagram** can be simplified to:

```text
                         ┌──────────────┐
                         │ AUTHENTICATE │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │  DASHBOARD   │
                         └──────┬───────┘
                                │
        ┌───────────┬───────────┼───────────┬───────────┐
        │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼
    Products    Purchasing     Sales     Inventory    People
        │           │           │           │           │
        │           │           │           │           │
        │           ▼           ▼           │           │
        │       Supplier      Customer      │           │
        │           │           │           │           │
        │           ▼           ▼           ▼           │
        │       Purchase       Sale      Stock          │
        │           │           │       Movement        │
        │           │           │           │           │
        │           └──────┬────┴───────────┘           │
        │                  │                            │
        └──────────────────┼────────────────────────────┘
                           │
                           ▼
                      ┌──────────┐
                      │ FINANCE  │
                      └────┬─────┘
                           │
                           ▼
                      ┌──────────┐
                      │ REPORTS  │
                      └────┬─────┘
                           │
                           ▼
                      ┌──────────┐
                      │ SETTINGS │
                      └──────────┘
```

### Your core business cycle

```text
             ┌─────────────┐
             │  SUPPLIER   │
             └──────┬──────┘
                    │
                    ▼
              ┌───────────┐
              │ PURCHASE  │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │ INVENTORY │
              │  + STOCK  │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │   SALES   │
              │    POS    │
              └─────┬─────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     ┌──────────┐       ┌───────────┐
     │ PAYMENT  │       │ INVENTORY │
     │  + MONEY │       │  - STOCK  │
     └────┬─────┘       └─────┬─────┘
          │                   │
          └─────────┬─────────┘
                    ▼
               ┌─────────┐
               │ PROFIT  │
               └─────────┘
```

**This last diagram is the core of entire system.** Everything else—Dashboard, Reports, People, Settings, etc.—supports or manages this cycle.
