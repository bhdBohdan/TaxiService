import { ReviewDTO } from "../interfaces/reviews.interface";
import { prisma } from "./prisma";

export async function createReview(payload: ReviewDTO) {
  const result = await prisma.reviews.create({
    data: payload,
  });

  return 0;
}
