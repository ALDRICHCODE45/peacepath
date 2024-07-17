"use client";
import Link from "next/link";
import { AuroraBackground } from "../aurora-bg/AuroraBackground";
import { motion } from "framer-motion";
import { CanvasRevealEffectDemo } from "../reveal-effect/Usage";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const Hero = ({ user }: { user: any }) => {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold text-white text-center">
            You Are Not Alone
          </div>
          <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
            Struggling today? Lets work through it together.
          </div>
          <button className="bg-white rounded-full w-fit text-black px-4 py-2">
            {user !== null ? (
              <Link href="/dashboard">Lets do it</Link>
            ) : (
              <LoginLink>Lets do it</LoginLink>
            )}
          </button>
        </motion.div>
      </AuroraBackground>
      <CanvasRevealEffectDemo />
    </>
  );
};
