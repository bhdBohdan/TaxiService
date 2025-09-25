import { ReviewDTO } from "../interfaces/reviews.interface";
import { prisma } from "./prisma";

export async function createReview(payload: ReviewDTO) {
  const result = await prisma.reviews.create({
    data: payload,
  });
}

export async function createReviewRaw(payload: ReviewDTO) {
  await prisma.$executeRaw`
  INSERT INTO reviews (
    trip_id,
  driver_id,
  passenger_id,
  content,
  stars)
  VALUES (${payload.trip_id},
  ${payload.driver_id},
  ${payload.passenger_id},
  ${payload.content},
  ${payload.stars});
`;
}
