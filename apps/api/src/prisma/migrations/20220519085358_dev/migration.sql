-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('C1001', 'E3210', 'M4321', 'A5432');

-- CreateEnum
CREATE TYPE "UNITS" AS ENUM ('KG', 'LITRES', 'PIECES');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('InProgress', 'Canceled', 'Completed', 'Returned');

-- CreateEnum
CREATE TYPE "PAYEMENT_TYPE" AS ENUM ('InPerson', 'Online');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "ROLE" DEFAULT E'C1001',
    "birthdate" TIMESTAMP(3),
    "isActive" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_metadata" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "city" TEXT DEFAULT E'kigali',
    "postal_code" TEXT DEFAULT E'99999',
    "country" TEXT DEFAULT E'rwanda',
    "telephone" TEXT,
    "mobile" TEXT,
    "alt_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "User_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store_branch" (
    "id" TEXT NOT NULL,
    "store_name" TEXT,
    "description" TEXT,
    "city" TEXT DEFAULT E'kigali',
    "store_geo_location" JSONB,
    "is_public" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Store_branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_inventory" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Product_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_inventory_at_branch" (
    "id" SERIAL NOT NULL,
    "store_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Product_inventory_at_branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "units" "UNITS" NOT NULL DEFAULT E'KG',
    "currency" TEXT NOT NULL DEFAULT E'rwf',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "ORDER_STATUS" NOT NULL DEFAULT E'InProgress',
    "products" JSONB[],
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "provider" TEXT NOT NULL,
    "payement_type" "PAYEMENT_TYPE" NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_metadata_id_key" ON "User_metadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_metadata_user_id_key" ON "User_metadata"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_branch_id_key" ON "Store_branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_id_key" ON "Product_category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_inventory_id_key" ON "Product_inventory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_inventory_at_branch_id_key" ON "Product_inventory_at_branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- AddForeignKey
ALTER TABLE "User_metadata" ADD CONSTRAINT "User_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_inventory" ADD CONSTRAINT "Product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_inventory_at_branch" ADD CONSTRAINT "Product_inventory_at_branch_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store_branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_inventory_at_branch" ADD CONSTRAINT "Product_inventory_at_branch_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
