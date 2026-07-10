import mysql.connector

# Database connection just for Labrandor
def database_connection():
    conn = mysql.connector.connect(
    host="127.0.0.1",        
    user="labrandor",
    password="PTFk47YxJF9H8DsmFYSfT?gkx56jt6qd#gGER@k",
    database="labrandor",
    autocommit=True,
    charset="utf8",
    use_pure=True,
    )     
    return conn
	
# Database connection for creating challenge databases
def master_db():
    master_conn = mysql.connector.connect(
    host="127.0.0.1",        
    user="lab-master",
    password="MeMPNaTzSa9gM79MtNKFzot9sqKqzREdX4nQb8tG",
    autocommit=True,
    charset="utf8",
    use_pure=True,
    )     
    return master_conn