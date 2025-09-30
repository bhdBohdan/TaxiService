--MV
CREATE MATERIALIZED VIEW m_view_cars AS SELECT * FROM cars;

CREATE VIEW track_activity AS SELECT d.firstname as their_driver ,p.firstname, p.lastname, sa.street as start_street, ea.street as end_street
FROM trips_passengers AS tp
INNER JOIN passengers AS p 
ON p.passenger_id = tp.passenger_id
INNER JOIN trips AS t
ON t.trip_id = tp.trip_id
INNER JOIN addresses AS sa
ON t.startaddressid = sa.address_id
INNER JOIN addresses AS ea
ON t.endaddressid = ea.address_id
INNER JOIN drivers AS d
ON d.driver_id = t.driver_id;

CREATE OR REPLACE VIEW driver_avg_ratings AS
SELECT 
    d.driver_id,
    d.firstname,
	d.lastname,
    get_driver_avg_rating(d.driver_id) AS avg_stars
FROM 
    drivers d;

CREATE OR REPLACE VIEW drivers_avg_rating AS
SELECT d.driver_id, d.firstname, d.lastname,
       (SELECT AVG(r.stars) 
        FROM public.reviews r 
        WHERE r.driver_id = d.driver_id) AS avg_rating
FROM public.drivers d;

CREATE OR REPLACE VIEW top_passengers AS
SELECT p.passenger_id, p.firstname, p.lastname, COUNT(tp.trip_id) AS total_trips
FROM public.passengers p
JOIN public.trips_passengers tp ON tp.passenger_id = p.passenger_id
GROUP BY p.passenger_id
HAVING COUNT(tp.trip_id) = (
    SELECT MAX(cnt) 
    FROM (
        SELECT COUNT(*) AS cnt 
        FROM public.trips_passengers 
        GROUP BY passenger_id
    ) sub
);

CREATE OR REPLACE VIEW passenger_total_spent AS
SELECT p.passenger_id, p.firstname, p.lastname,
       (SELECT SUM(pay.money_ammount) 
        FROM public.payment pay 
        WHERE pay.passenger_id = p.passenger_id) AS total_spent
FROM public.passengers p;


CREATE MATERIALIZED VIEW mv_used_taxi_service AS
SELECT p.firstname, COUNT(*) AS trips_ammount
FROM trips_passengers AS tp
INNER JOIN passengers AS p ON tp.passenger_id = p.passenger_id
GROUP BY p.passenger_id;
