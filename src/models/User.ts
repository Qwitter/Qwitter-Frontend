import z from "zod";

export type User = {
  name: string;
  email: string;
  birthDate: string;
  userName: string;
  createdAt: string;
  location: string;
  passwordChangedAt: string;
  id: string;
  google_id: string;
  profileImageUrl: string;
};

export const UserDataSchema = z.object({
  userName: z.string(),
  name: z.string(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'birthDate must be in the format yyyy-mm-dd hh:mm:ss' }),
  url: z.string().optional(),
  description: z.string(),
  protected: z.boolean().optional(),
  verified: z.boolean(),
  followersCount: z.number().min(0, { message: 'followersCount must be positive or zero' }),
  followingCount: z.number().min(0, { message: 'followingCount must be positive or zero' }),
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'createdAt must be in the format yyyy-mm-dd hh:mm:ss' }),
  profileBannerUrl: z.string().url(),
  profileImageUrl: z.string().url(),
  email: z.string().email(),
});

export type UserData = z.infer<typeof UserDataSchema>;
