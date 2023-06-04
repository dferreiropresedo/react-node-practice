
const table_creation_status = `\
    CREATE TABLE IF NOT EXISTS status(id TINYINT PRIMARY KEY,\
        state VARCHAR(50)\
    ) ENGINE=InnoDB;\
`
const table_creation_user = `
    \
    CREATE TABLE IF NOT EXISTS user(\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        name VARCHAR(100) NOT NULL,\
        login VARCHAR(100) NOT NULL,\
        password VARCHAR(255) NOT NULL\
    ) ENGINE=InnoDB;\
`
const table_creation_task = `
    CREATE TABLE IF NOT EXISTS task(\
        id INT AUTO_INCREMENT PRIMARY KEY,\
        description VARCHAR(255) NOT NULL,\
        date DATETIME NOT NULL,\
        timestamp INT NOT NULL,\
        status_id TINYINT NOT NULL,\
        user_id INT NOT NULL,\
        FOREIGN KEY (status_id) REFERENCES status (id) ON UPDATE RESTRICT ON DELETE CASCADE,\
        FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE RESTRICT ON DELETE CASCADE\
    ) ENGINE=InnoDB;\
`

const populate_status_1 = `INSERT IGNORE INTO status(id, state) VALUES(1, "TO-DO");`
const populate_status_2 = `INSERT IGNORE INTO status(id, state) VALUES(2, "PENDING");`
const populate_status_3 = `INSERT IGNORE INTO status(id, state) VALUES(3, "DONE");`

const populate_user_1 = `INSERT IGNORE INTO user(id, name, login, password) VALUES(1, "Daniel", "daniel", "daniel");`
const populate_user_2 = `INSERT IGNORE INTO user(id, name, login, password) VALUES(2, "Pepe", "elpepe", "elpepe");`

export { table_creation_status, table_creation_user, table_creation_task, populate_status_1, populate_status_2, populate_status_3, populate_user_1, populate_user_2 }