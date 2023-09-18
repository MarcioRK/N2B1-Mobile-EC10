import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const connection = SQLite.openDatabase('tbPizzas.db');
    return connection;
}

export async function createTable() {
    createOrdersTable();

    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbPizzas
        (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        )`;

        const dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [], 
                () => {
                    // Depois de criar a tabela, verifique se está vazia
                    tx.executeSql('SELECT COUNT(*) as count FROM tbPizzas', [], (tx, result) => {
                        const count = result.rows.item(0).count;

                        if (count === 0) {
                            // Se a tabela estiver vazia, insira registros padrão
                            insertDefaultRecords(tx)
                                .then(() => resolve(true))
                                .catch(error => reject(error));
                        } else {
                            resolve(true);
                        }
                    });
                },
                (_, error) => reject(error)
            );
        });
    });
}

function insertDefaultRecords(tx) {
    return new Promise((resolve, reject) => {
        // Lista de pizzas padrão
        const defaultPizzas = [
            { id: '9999999991', name: 'Test Record 1', description: 'fixed description 1' },
            { id: '9999999992', name: 'Test Record 2 Teste', description: 'fixed description 2Teste' },
            { id: '9999999993', name: 'Test Record 3', description: 'fixed description 3' },
            { id: '9999999994', name: 'Test Record 4', description: 'fixed description 4' },
            { id: '9999999995', name: 'Test Record 5', description: 'fixed description 5' }
            // Adicione mais registros padrão conforme necessário
        ];

        const queries = defaultPizzas.map(pizza => {
            return new Promise((innerResolve, innerReject) => {
                tx.executeSql(
                    'INSERT INTO tbPizzas (id, name, description) VALUES (?, ?, ?)', 
                    [pizza.id, pizza.name, pizza.description], 
                    () => innerResolve(),
                    (_, error) => innerReject(error)
                );
            });
        });

        Promise.all(queries)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}

export function getAllPizzas() {

    return new Promise((resolve, reject) => {

        let dbConnection = getDbConnection();
        dbConnection.transaction(tx => {
            let query = 'select * from tbPizzas';
            tx.executeSql(query, [],
                (tx, records) => {

                    var result = []

                    for (let i = 0; i < records.rows.length; i++) {
                        let obj = {
                            id: records.rows.item(i).id,
                            name: records.rows.item(i).name,
                            description: records.rows.item(i).description
                        }
                        result.push(obj);
                    }
                    resolve(result);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    });
}

export function updateContact(pizza) {
    console.log('starting the updateContact method');
    return new Promise((resolve, reject) => {
        let query = 'update tbPizzas set name=?, description=? where id=?';
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [pizza.name, pizza.description, pizza.id],
                (tx, result) => {
                    resolve(result.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    });
}

export function deleteContact(id) {
    console.log('Deleting pizza ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbPizzas where id=?';
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, result) => {
                    resolve(result.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    });
}

export function deleteAllContacts() {
    console.log("Deleting all contacts...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbPizzas';
        let dbConnection = getDbConnection();
        dbConnection.transaction(tx => {
            tx.executeSql(query, [],
                (tx, result) => resolve(result.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
}

export function addContact(pizza) {
    return new Promise((resolve, reject) => {
        let query = 'insert into tbPizzas (id, name ,description) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [pizza.id, pizza.name, pizza.description],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export async function createOrdersTable() {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbOrders
        (
            orderId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            orderDate TEXT NOT NULL
        )`;

        const dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [], 
                (_, result) => {
                    resolve(true);
                },
                (_, error) => reject(error)
            );
        });
    });
}

export async function createOrderItemsTable() {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbOrderItems
        (
            orderItemId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            orderId INTEGER,
            pizzaId INTEGER,
            quantity INTEGER,
            FOREIGN KEY(orderId) REFERENCES tbOrders(orderId),
            FOREIGN KEY(pizzaId) REFERENCES tbPizzas(id)
        )`;

        const dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [], 
                (_, result) => {
                    resolve(true);
                },
                (_, error) => reject(error)
            );
        });
    });
}

export async function saveOrder(orderDate, cartItems) {
    return new Promise(async (resolve, reject) => {
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            // Insert order
            tx.executeSql('INSERT INTO tbOrders (orderDate) VALUES (?)', [orderDate], 
                (_, result) => {
                    const orderId = result.insertId;
                    console.log("[saveOrder] Order inserted with ID: ", orderId);

                    // Insert each item from the cart
                    cartItems.forEach(item => {
                        tx.executeSql('INSERT INTO tbOrderItems (orderId, pizzaId, quantity) VALUES (?, ?, ?)', 
                            [orderId, item.id, item.quantity],
                            (_, itemResult) => {
                                console.log("[saveOrder] Order item inserted with ID: ", itemResult.insertId);
                            },
                            (_, error) => {
                                console.log("[saveOrder] Error inserting order item: ", error);
                            }
                        );
                    });

                    resolve(true);
                },
                (_, error) => {
                    console.log("[saveOrder] Error inserting order: ", error);
                    reject(error);
                }
            );
        });
    });
}



export function getOrders() {
    return new Promise((resolve, reject) => {
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            let query = 'SELECT * FROM tbOrders';
            tx.executeSql(query, [],
                (_, records) => {
                    let orders = [];
                    for (let i = 0; i < records.rows.length; i++) {
                        orders.push(records.rows.item(i));
                    }
                    resolve(orders);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}

export function getOrderById(orderId) {
    return new Promise((resolve, reject) => {
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            let query = 'SELECT * FROM tbOrders WHERE orderId = ?';
            tx.executeSql(query, [orderId],
                (_, records) => {
                    if (records.rows.length > 0) {
                        resolve(records.rows.item(0));
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}



export function deleteOrder(orderId) {
    // return new Promise((resolve, reject) => {
    //     let query = 'DELETE FROM tbOrders WHERE id = ?';
    //     let dbConnection = getDbConnection();
    //     dbConnection.transaction(tx => {
    //         tx.executeSql(query, [orderId],
    //             (_, result) => {
    //                 resolve(result.rowsAffected > 0);
    //             },
    //             (_, error) => {
    //                 reject(error);
    //             }
    //         );
    //     });
    // });




    console.log('Deleting orderId ' + orderId);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbOrders where orderId=?';
        let dbConnection = getDbConnection();

        dbConnection.transaction(tx => {
            tx.executeSql(query, [orderId],
                (tx, result) => {
                    resolve(result.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    });
}

export function deleteAllOrders() {
    console.log("Deleting all Orders...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbOrders';
        let dbConnection = getDbConnection();
        dbConnection.transaction(tx => {
            tx.executeSql(query, [],
                (tx, result) => resolve(result.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
}


