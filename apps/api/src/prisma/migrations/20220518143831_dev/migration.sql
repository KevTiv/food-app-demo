/*
  Warnings:

  - You are about to drop the column `quantity` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `weigths` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "quantity",
DROP COLUMN "weigths";
