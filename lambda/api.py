import sys
import logging
import config
from lib.pymysql import pymysql


logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
  conn = pymysql.connect(
    config.rds["host"],
    user=config.rds["user"],
    passwd=config.rds["pass"],
    db=config.rds["db"],
    connect_timeout=3)
except pymysql.MySQLError as e:
  logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
  logger.error(e)
  sys.exit()
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def handler(event, context):
  """Takes in shopping event, pushes to Aurora."""

  with conn.cursor() as cur:
    cur.execute('insert into Purchases (Store, Product, DateTime, Cost) values (%s, %s, %s, %s)', (
      event["store"],
      event["product"],
      event["datetime"],
      event["cost"]))

    # cur.execute("create table Employee ( EmpID  int NOT NULL, Name varchar(255) NOT NULL, PRIMARY KEY (EmpID))")
    # cur.execute('insert into Employee (EmpID, Name) values(1, "Joe")')
    # cur.execute('insert into Employee (EmpID, Name) values(2, "Bob")')
    # cur.execute('insert into Employee (EmpID, Name) values(3, "Mary")')
    conn.commit()
    cur.execute("select COUNT(*) from Purchases")
    item_count = cur.fetchone()[0]
  conn.commit()

  return { 
    'message' : "Total %d items from RDS MySQL table" %(item_count)
  }  
