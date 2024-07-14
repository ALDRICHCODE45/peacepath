import { Hero } from "@/components/hero/Hero";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function HomePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <Hero user={user} />
    </>
  );
}
