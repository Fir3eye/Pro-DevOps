import mysql.connector

try:
    conn = mysql.connector.connect(
        host='mydb.croaiuaygpys.ap-south-1.rds.amazonaws.com',  # Replace with your EC2 public IP address or RDS endpoint
        user='admin',       # Replace with your MySQL username
        password='mydb123ddd',   # Replace with your MySQL password
        database='mydb'    # Replace with your database name
    )

    if conn.is_connected():
        print("Successfully connected to the database")
        cursor = conn.cursor()

        while True:
            query = input("mysql> ").strip()
            if query.lower() in ["exit", "quit"]:
                break
            if query:
                try:
                    cursor.execute(query)
                    results = cursor.fetchall()
                    for row in results:
                        print(row)
                except mysql.connector.Error as err:
                    print(f"Error: {err}")

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
        print("MySQL connection is closed")
