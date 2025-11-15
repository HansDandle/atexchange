-- AddUserSuspensionFields
-- Add suspension tracking fields to users table

ALTER TABLE public.users
ADD COLUMN suspended BOOLEAN DEFAULT false,
ADD COLUMN suspension_reason TEXT;

-- Add index for faster queries
CREATE INDEX idx_users_suspended ON public.users(suspended);
