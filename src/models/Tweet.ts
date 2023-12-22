import z from "zod";
import { UserDataSchema } from "./User";

const TweetEntitiesSchema = z.object({
  hasthtags: z.array(
    z.object({
      value: z.string(),
    })
  ),
  media: z.array(
    z.object({
      value: z.string(),
      type: z.string(),
    })
  ),
  mentions: z.array(
    z.object({
      mentionedUsername: z.string(),
    })
  ),
  urls: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export const TweetSchema = z.object({
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: "createdAt must be in the format yyyy-mm-dd hh:mm:ss",
  }),
  id: z.string(),
  author: UserDataSchema,
  replyCount: z
    .number()
    .min(0, { message: "replyCount must be positive or zero" }),
  retweetCount: z
    .number()
    .min(0, { message: "retweetCount must be positive or zero" }),
  qouteCount: z
    .number()
    .min(0, { message: "quoteCount must be positive or zero" }),
  likesCount: z
    .number()
    .min(0, { message: "likesCount must be positive or zero" }),
  text: z.string(),
  source: z.string(),
  liked: z.boolean(),
  bookmarked: z.boolean(),
  coordinates: z.string().regex(/^\d{1,3}\.\d{1,6},\d{1,3}\.\d{1,6}$/, {
    message: "coordinates must be in the format lat,lng",
  }),
  replyToTweetId: z.string(),
  retweetedId: z.string(),
  qouteTweetedId: z.string(),
  sensitive: z.boolean(),
  entities: TweetEntitiesSchema,
  isRetweeted: z.boolean().default(false),
  isFollowing: z.boolean().default(false),
});

export type Tweet = z.infer<typeof TweetSchema>;

export type TweetWithRetweet = Tweet & {
  retweetedTweet: TweetWithRetweet | null;
};

export type TweetWithReply = Tweet & { replyToTweet: TweetWithReply | null };

export type TweetWithReplyAndRetweet = TweetWithReply & {
  retweetedTweet: TweetWithReplyAndRetweet | null;
};
