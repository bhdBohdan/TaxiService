-- CreateTable
SET TIMEZONE TO 'UTC';
CREATE TABLE "public"."addresses" (
    "address_id" SERIAL NOT NULL,
    "building" SMALLINT DEFAULT 1,
    "street" VARCHAR(20) DEFAULT 'Khreshchatyk',
    "city" VARCHAR(20) NOT NULL DEFAULT 'Kyiv',
    "latitude" DOUBLE PRECISION DEFAULT 50.450001,
    "longitude" DOUBLE PRECISION DEFAULT 30.523333,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "public"."cars" (
    "car_id" SERIAL NOT NULL,
    "make" VARCHAR(20),
    "model" VARCHAR(20),
    "sign_number" VARCHAR(20),
    "driver_id" INTEGER,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "public"."drivers" (
    "driver_id" SERIAL NOT NULL,
    "firstname" VARCHAR(63) NOT NULL,
    "lastname" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127),
    "phonenumber" VARCHAR(31),
    "license" VARCHAR(31) NOT NULL,
    "registrationdate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "public"."passengers" (
    "passenger_id" SERIAL NOT NULL,
    "firstname" VARCHAR(63) NOT NULL,
    "lastname" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127),
    "phonenumber" VARCHAR(31),
    "registrationdate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("passenger_id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "payment_id" SERIAL NOT NULL,
    "trip_id" INTEGER,
    "passenger_id" INTEGER,
    "money_ammount" DECIMAL(10,2),
    "payment_method" VARCHAR(20),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "review_id" SERIAL NOT NULL,
    "trip_id" INTEGER,
    "passenger_id" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "stars" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "public"."trips" (
    "trip_id" SERIAL NOT NULL,
    "driver_id" INTEGER,
    "startaddressid" INTEGER NOT NULL,
    "endaddressid" INTEGER NOT NULL,
    "startdatetime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enddatetime" TIMESTAMP(6),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."trips_passengers" (
    "trip_id" INTEGER NOT NULL,
    "passenger_id" INTEGER NOT NULL,

    CONSTRAINT "trips_passengers_pkey" PRIMARY KEY ("trip_id","passenger_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_building_street_city_key" ON "public"."addresses"("building", "street", "city");

-- CreateIndex
CREATE UNIQUE INDEX "cars_sign_number_key" ON "public"."cars"("sign_number");

-- CreateIndex
CREATE INDEX "idx_del_driver" ON "public"."drivers"("is_deleted");

-- CreateIndex
CREATE INDEX "idx_drivers_email" ON "public"."drivers"("email");

-- CreateIndex
CREATE INDEX "idx_drivers_license" ON "public"."drivers" USING HASH ("license");

-- CreateIndex
CREATE INDEX "idx_del_pass" ON "public"."passengers"("is_deleted");

-- CreateIndex
CREATE INDEX "idx_passengers_email" ON "public"."passengers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "no_repeat" ON "public"."payment"("trip_id", "passenger_id");

-- CreateIndex
CREATE UNIQUE INDEX "no_repeat_reviews" ON "public"."reviews"("trip_id", "passenger_id");

-- CreateIndex
CREATE INDEX "idx_del_trip" ON "public"."trips"("is_deleted");

-- AddForeignKey
ALTER TABLE "public"."cars" ADD CONSTRAINT "cars_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("driver_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."passengers" ADD CONSTRAINT passengers_email_unique UNIQUE ("email");
ALTER TABLE "public"."passengers" ADD CONSTRAINT passengers_phonenumber_unique UNIQUE ("phonenumber");
ALTER TABLE "public"."drivers" ADD CONSTRAINT drivers_email_unique UNIQUE ("email");
ALTER TABLE "public"."drivers" ADD CONSTRAINT drivers_phonenumber_unique UNIQUE ("phonenumber");
ALTER TABLE "public"."drivers" ADD CONSTRAINT drivers_license_unique UNIQUE ("license");



-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "fk_passenger" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("passenger_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "fk_trip" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk_driver" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("driver_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk_passenger" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("passenger_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk_trip" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("driver_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_endaddressid_fkey" FOREIGN KEY ("endaddressid") REFERENCES "public"."addresses"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_startaddressid_fkey" FOREIGN KEY ("startaddressid") REFERENCES "public"."addresses"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trips_passengers" ADD CONSTRAINT "fk_passenger" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("passenger_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."trips_passengers" ADD CONSTRAINT "fk_trip" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

SELECT setval('addresses_address_id_seq', GREATEST((SELECT MAX(address_id) FROM addresses) + 1, 100001), false);
SELECT setval('cars_car_id_seq', GREATEST((SELECT MAX(car_id) FROM cars) + 1, 100001), false);
SELECT setval('drivers_driver_id_seq', GREATEST((SELECT MAX(driver_id) FROM drivers) + 1, 100001), false);
SELECT setval('passengers_passenger_id_seq', GREATEST((SELECT MAX(passenger_id) FROM passengers) + 1, 100001), false);
SELECT setval('payment_payment_id_seq', GREATEST((SELECT MAX(payment_id) FROM payment) + 1, 100001), false);
SELECT setval('reviews_review_id_seq', GREATEST((SELECT MAX(review_id) FROM reviews) + 1, 100001), false);
SELECT setval('trips_trip_id_seq', GREATEST((SELECT MAX(trip_id) FROM trips) + 1, 100001), false);


--trigger 
CREATE OR REPLACE FUNCTION refresh_last_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER refresh_update
    BEFORE UPDATE ON passengers
    FOR EACH ROW
    EXECUTE FUNCTION refresh_last_update();

CREATE OR REPLACE TRIGGER refresh_update
    BEFORE UPDATE ON drivers
    FOR EACH ROW
    EXECUTE FUNCTION refresh_last_update();

CREATE OR REPLACE TRIGGER refresh_update
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION refresh_last_update();
/*
UPDATE passengers
SET firstname = 'Volodymyr'
WHERE passenger_id = 100001;
*/

CREATE OR REPLACE FUNCTION validate_payment_passenger()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM trips_passengers
        WHERE trip_id = NEW.trip_id
          AND passenger_id = NEW.passenger_id
    ) THEN
        RAISE EXCEPTION 'Passenger % is not registered for trip %', NEW.passenger_id, NEW.trip_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_payment_passenger
BEFORE INSERT ON payment
FOR EACH ROW
EXECUTE FUNCTION validate_payment_passenger();


--Procedures
CREATE OR REPLACE PROCEDURE insert_passenger(
    fname VARCHAR(63),
    lname VARCHAR(63),
    em VARCHAR(127),
    phn VARCHAR(31) 
)
LANGUAGE SQL
AS $$
    INSERT INTO passengers(firstname, lastname, email, phonenumber)
    VALUES(fname, lname, em, phn);
$$;

CREATE OR REPLACE PROCEDURE assign_car_to_driver(p_car_id INT, p_driver_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE cars
    SET driver_id = p_driver_id
    WHERE car_id = p_car_id;
END;
$$;

CREATE OR REPLACE PROCEDURE free_car_from_driver(p_car_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE cars
    SET driver_id = NULL
    WHERE car_id = p_car_id;
END;
$$;
/*
CALL free_car_from_driver(100003);
CALL assign_car_to_driver(100003, 100001);

SELECT * FROM cars c LEFT JOIN drivers d  ON d.driver_id=c.driver_id*/

CREATE OR REPLACE PROCEDURE add_passenger_to_trip(p_trip_id INT, p_passenger_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO trips_passengers (trip_id, passenger_id)
    VALUES (p_trip_id, p_passenger_id);
END;
$$;


--StoredFnc
CREATE OR REPLACE FUNCTION used_taxi_service()
RETURNS TABLE (
    firstname VARCHAR(63),
    trips_ammount BIGINT 
    
)
LANGUAGE SQL
AS $$
	SELECT p.firstname, COUNT(*) AS trips_ammount FROM trips_passengers AS tp
	INNER JOIN passengers AS p ON tp.passenger_id = p.passenger_id
	GROUP BY p.passenger_id 
$$;

CREATE OR REPLACE FUNCTION find_passengers_by_trip_id(param_id INT)
RETURNS TABLE (
	passenger_id INT,
    firstname VARCHAR(63),
	lastname VARCHAR(63),
	email VARCHAR(127),
	phinenumber VARCHAR(27)
)
LANGUAGE SQL
AS $$
	SELECT  
		p.passenger_id,  
        p.firstname, 
        p.lastname, 
        p.email, 
        p.phonenumber 
	FROM trips_passengers AS tp
	INNER JOIN passengers AS p ON tp.passenger_id = p.passenger_id
	WHERE trip_id = param_id
$$;


--Avg stars 
CREATE OR REPLACE FUNCTION get_driver_avg_rating(p_driver_id INT)
RETURNS NUMERIC(3,2)
LANGUAGE plpgsql
AS $$
DECLARE
    avg_rating NUMERIC(3,2);
BEGIN
    SELECT AVG(stars)::NUMERIC(3,2)
    INTO avg_rating
    FROM reviews
    WHERE driver_id = p_driver_id;

    RETURN COALESCE(avg_rating, 0);
END;
$$;

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






