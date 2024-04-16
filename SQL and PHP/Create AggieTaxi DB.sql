CREATE Database AggieTaxi; 
Use AggieTaxi; 

Create Table TaxiList(
    id int, 
    name varchar(255),
    seat int,
    description varchar(255), 
    amount DECIMAL(4,2)
);

Insert INTO TaxiList VALUES (1, 'TaxiX', 4, 'Affordable, Everyday rides', 1.1);

Insert INTO TaxiList VALUES (2,'Comfort', 4, 'Newer cars with extra legroom', 1.6);

Insert INTO TaxiList VALUES (3,'TaxiXL', 6, 'Affordable rides for groups up to 6', 1.9);