import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import morgan from "morgan";

import bcrypt from "bcryptjs";
import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://hightway-notes.rcmade.me",
    ],
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Mock users (replace with DB later)
const users: any[] = [];

// --- JWT helper
function signJwt(user: any) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// --- Local Strategy (credentials login)
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const user = users.find((u) => u.email === email);
    if (!user) return done(null, false, { message: "User not found" });

    bcrypt.compare(password, user.passwordHash, (err, same) => {
      if (err) return done(err);
      if (!same) return done(null, false, { message: "Invalid password" });
      return done(null, user);
    });
  })
);

// --- Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:4001/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ profile, accessToken, refreshToken });
      let user = users.find((u) => u.googleId === profile.id);
      if (!user) {
        user = {
          id: users.length + 1,
          googleId: profile.id,
          email: profile?.emails?.[0]?.value,
          name: profile.displayName,
        };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

// --- Routes

// Credentials signup (for demo)
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, passwordHash: hash };
  users.push(user);
  res.json({ ok: true });
});

// Credentials login
app.post("/auth/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      console.log({ user });
      if (err) return next(err);
      if (!user) return res.status(400).json({ error: info.message });
      const token = signJwt(user);
      res.json({ token, user });
    }
  )(req, res, next);
});

// Google login start
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    console.log({ user }, "callback");
    if (err || !user)
      return res.redirect("http://localhost:5173/login?error=google_failed");
    const token = signJwt(user);
    res.redirect(`http://localhost:5173/auth/success#token=${token}`);
  })(req, res, next);
});

// Protected route
app.get("/api/notes", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing token" });
  try {
    const payload = jwt.verify(auth?.split(" ")?.[1] || "", JWT_SECRET) as any;
    res.json({ notes: [`Welcome ${payload?.email}, your notes are here.`] });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
