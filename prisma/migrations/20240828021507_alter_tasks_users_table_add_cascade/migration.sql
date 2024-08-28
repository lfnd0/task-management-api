-- DropForeignKey
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_task_id_fkey";

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
