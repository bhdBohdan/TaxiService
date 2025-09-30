-- enforce non-negative payment
ALTER TABLE payment
  ADD CONSTRAINT chk_payment_amount_positive CHECK (money_ammount >= 0);

-- ensure stars are between 1 and 5
ALTER TABLE reviews
  ADD CONSTRAINT chk_review_stars CHECK (stars BETWEEN 1 AND 5);

-- ensure license format (example: at least 5 chars)
ALTER TABLE drivers
  ADD CONSTRAINT chk_license_length CHECK (char_length(license) >= 5);

-- ensure trip times make sense
-- ALTER TABLE trips
--   ADD CONSTRAINT chk_trip_time CHECK (enddatetime > startdatetime);


ALTER SEQUENCE addresses_address_id_seq RESTART WITH 100001;
ALTER SEQUENCE cars_car_id_seq RESTART WITH 100001;
ALTER SEQUENCE drivers_driver_id_seq RESTART WITH 100001;
ALTER SEQUENCE passengers_passenger_id_seq RESTART WITH 100001;
ALTER SEQUENCE payment_payment_id_seq RESTART WITH 100001;
ALTER SEQUENCE reviews_review_id_seq RESTART WITH 100001;
ALTER SEQUENCE trips_trip_id_seq RESTART WITH 100001;

