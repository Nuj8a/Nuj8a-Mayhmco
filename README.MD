# -------------------------------

# 1. **Prisma Setup**

# -------------------------------

# a. **Initialize Prisma and Create Migration Folder**

# Initialize Prisma and create the necessary Prisma files (schema, migration folders)

npx prisma init

# b. **Create Database Schema and Apply Initial Migration**

# Create the database schema and apply the initial migration

npx prisma migrate dev --name init
npx prisma migrate dev --name add_admin_table
npm run prisma:seed

# c. **Generate Prisma Client**

# Generate the Prisma Client

npx prisma generate

# d. **Apply Future Migrations**

# Apply future migrations to the database

npx prisma migrate dev

# -------------------------------

# 2. **Next.js Setup**

# -------------------------------

# a. **Install Next.js Locally**

# Create a new Next.js app

npx create-next-app@latest my-next-project

# b. **Navigate to the Project Folder**

# Navigate to your project folder

cd my-next-project

# c. **Install Dependencies**

# Install the necessary project dependencies

npm install

# d. **Run the Development Server**

# Run the Next.js development server

npm run dev

# Your Next.js app will now be running at http://localhost:3000

# -------------------------------

# 3. **Deployment Setup**

# -------------------------------

# a. **Deploying Prisma in Production**

# Apply migrations in the production environment

npx prisma migrate deploy

# b. **Generate Prisma Client for Production**

# Generate Prisma Client for the production environment

npx prisma generate

# -------------------------------

# 4. **Next.js Deployment**

# -------------------------------

# a. **Install Vercel CLI**

# Install Vercel CLI globally

npm install -g vercel

# b. **Log in to Your Vercel Account**

# Log in to your Vercel account

vercel login

# c. **Deploy Your App**

# Deploy your Next.js app to Vercel

vercel

# -------------------------------

# 5. **Additional Commands and Notes**

# -------------------------------

# a. **Seeding Database (Optional)**

# Seed the database with initial data

npx prisma db seed

# b. **Viewing Migration History**

# View migration history

npx prisma migrate status
npm run prisma:seed
