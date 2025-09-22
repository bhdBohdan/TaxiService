-- CreateTable
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