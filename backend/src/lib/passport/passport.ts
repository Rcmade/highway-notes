import { db } from "@/db/db";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${
          process.env.BACKEND_URL || "http://localhost:3000"
        }/api/auth/google/callback`,
      },
      // verify callback
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error("No email returned from Google"), false);
          }

          const name = profile.displayName ?? undefined;
          const picture = profile.photos?.[0]?.value ?? undefined;

          const user = await db.user.upsert({
            where: { email },
            update: {
              name: name ?? undefined,
              provider: "google",
            },
            create: {
              email,
              name: name ?? undefined,
              provider: "google",
            },
          });

          return done(false, user);
        } catch (err) {
          return done(err as Error, false);
        }
      }
    )
  );
}
